/**
 * Desenho do pino 3D, rodando num "worker": um processo à parte do navegador.
 * Assim, preparar e desenhar o 3D nunca trava a página (rolagem, toques e textos seguem leves).
 * O formato do pino é calculado no próprio desenho (técnica "ray marching"): não há modelo 3D para baixar.
 */

const VERTICES = `
attribute vec2 posicao;
void main() { gl_Position = vec4(posicao, 0.0, 1.0); }
`

const DESENHO = `
precision highp float;
uniform vec2 tela;
uniform float tempo;
uniform vec2 giro;

// Gota: cone arredondado com ponta embaixo (r1) e cabeça em cima (r2).
float gota(vec3 p, float r1, float r2, float h) {
  float b = (r1 - r2) / h;
  float a = sqrt(1.0 - b * b);
  vec2 q = vec2(length(p.xz), p.y);
  float k = dot(q, vec2(-b, a));
  if (k < 0.0) return length(q) - r1;
  if (k > a * h) return length(q - vec2(0.0, h)) - r2;
  return dot(q, vec2(a, b)) - r1;
}

const float ALTURA = 1.25;
const float CABECA = 0.62;

mat3 rotacao(vec2 g) {
  float cy = cos(g.y), sy = sin(g.y), cx = cos(g.x), sx = sin(g.x);
  mat3 ry = mat3(cy, 0.0, -sy, 0.0, 1.0, 0.0, sy, 0.0, cy);
  mat3 rx = mat3(1.0, 0.0, 0.0, 0.0, cx, sx, 0.0, -sx, cx);
  return rx * ry;
}

// Distância até o pino. id = 1: corpo azul; id = 2: bolinha que brilha no furo.
vec2 cena(vec3 p) {
  p.y += 0.95 + sin(tempo * 1.4) * 0.05;
  p = rotacao(giro) * p;
  float corpo = gota(p, 0.03, CABECA, ALTURA);
  vec3 c = p - vec3(0.0, ALTURA, 0.0);
  float furo = length(c.xy) - 0.27;
  corpo = max(corpo, -furo);
  float bolinha = length(c) - 0.15;
  return bolinha < corpo ? vec2(bolinha, 2.0) : vec2(corpo, 1.0);
}

vec3 normal(vec3 p) {
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(
    cena(p + e.xyy).x - cena(p - e.xyy).x,
    cena(p + e.yxy).x - cena(p - e.yxy).x,
    cena(p + e.yyx).x - cena(p - e.yyx).x));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * tela) / tela.y;
  vec3 origem = vec3(0.0, 0.0, 3.4);
  vec3 raio = normalize(vec3(uv, -1.3));

  // Só calcula os pontos que passam perto do pino (economiza a placa de vídeo do celular).
  float b = dot(origem, raio);
  float c = dot(origem, origem) - 1.45 * 1.45;
  float h = b * b - c;
  if (h < 0.0) { gl_FragColor = vec4(0.0); return; }

  float t = max(-b - sqrt(h), 0.0);
  float fim = -b + sqrt(h);
  float menor = 1e3;
  vec2 r = vec2(1e3, 0.0);
  for (int i = 0; i < 72; i++) {
    r = cena(origem + raio * t);
    menor = min(menor, r.x);
    if (r.x < 0.0015 || t > fim) break;
    t += r.x * 0.9;
  }
  // Borda suave (sem serrilhado).
  float pixel = 2.2 / tela.y;
  float cobertura = r.x < 0.0015 ? 1.0 : 1.0 - smoothstep(0.0, pixel * t, menor);
  if (cobertura <= 0.0) { gl_FragColor = vec4(0.0); return; }

  vec3 p = origem + raio * t;
  vec3 n = normal(p);
  vec3 luz = normalize(vec3(-0.6, 0.8, 0.7));
  float difusa = max(dot(n, luz), 0.0);
  float brilho = pow(max(dot(reflect(-luz, n), -raio), 0.0), 40.0);
  float borda = pow(1.0 - max(dot(n, -raio), 0.0), 3.0);

  vec3 cor;
  if (r.y > 1.5) {
    cor = vec3(0.44, 0.77, 0.97) * (1.15 + 0.25 * sin(tempo * 3.0)) + brilho;
  } else {
    // Azul claro em cima, azul escuro na ponta, como o pino desenhado.
    float altura = clamp((p.y + 1.0) / 2.0, 0.0, 1.0);
    vec3 base = mix(vec3(0.063, 0.227, 0.416), vec3(0.231, 0.62, 0.91), smoothstep(0.0, 0.85, altura));
    cor = base * (0.35 + 0.85 * difusa)
        + vec3(0.44, 0.77, 0.97) * borda * 0.9
        + vec3(1.0) * brilho * 0.8;
  }
  gl_FragColor = vec4(cor * cobertura, cobertura);
}
`


// O resultado da compilação não é conferido aqui: conferir obrigaria a esperar a placa de vídeo.
function compilar(gl: WebGLRenderingContext, tipo: number, codigo: string) {
  const s = gl.createShader(tipo)!
  gl.shaderSource(s, codigo)
  gl.compileShader(s)
  return s
}

/** Espera a placa de vídeo terminar de preparar o desenho (quando o navegador permite). */
async function esperarPreparo(gl: WebGLRenderingContext, programa: WebGLProgram) {
  const ext = gl.getExtension('KHR_parallel_shader_compile')
  if (!ext) return
  while (!gl.getProgramParameter(programa, ext.COMPLETION_STATUS_KHR)) {
    await new Promise((r) => setTimeout(r, 50))
  }
}

/** Placa de vídeo "de mentira" (desenho feito pelo processador): o 3D ficaria lento, então nem tenta. */
function placaLenta(gl: WebGLRenderingContext) {
  const info = gl.getExtension('WEBGL_debug_renderer_info')
  const nome = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
  return /swiftshader|llvmpipe|software|basic render/i.test(nome)
}

type Mensagem =
  | { tipo: 'iniciar'; tela: OffscreenCanvas; largura: number; altura: number; densidade: number }
  | { tipo: 'tamanho'; largura: number; altura: number }
  | { tipo: 'olhar'; x: number; y: number }
  | { tipo: 'arrastar'; dx: number }
  | { tipo: 'visivel'; visivel: boolean }

const proximoQuadro: (f: (t: number) => void) => unknown =
  typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (f) => setTimeout(() => f(performance.now()), 16)

let gl: WebGLRenderingContext | null = null
let tela: OffscreenCanvas
let uTela: WebGLUniformLocation | null
let uTempo: WebGLUniformLocation | null
let uGiro: WebGLUniformLocation | null
let largura = 0
let altura = 0
// Resolução: no máximo 1,5x a da tela; baixa sozinha se o aparelho sofrer.
let escala = 1
let visivel = true
let pedido = false
let anterior = 0
let quadros = 0
let lentos = 0
const inicio = performance.now()

// Giro: anda sozinho devagar; mouse, dedo arrastando e inclinação do celular mexem junto.
let anguloY = 0.6
let velocidade = 0.5
let alvoX = 0
let alvoY = 0
let inclX = 0
let inclY = 0

function ajustarTamanho() {
  if (!gl) return
  tela.width = Math.max(1, Math.round(largura * escala))
  tela.height = Math.max(1, Math.round(altura * escala))
  gl.viewport(0, 0, tela.width, tela.height)
}

function pedirQuadro() {
  if (pedido || !gl) return
  pedido = true
  proximoQuadro(desenhar)
}

function desenhar(agora: number) {
  pedido = false
  if (!visivel || !gl) return
  const dt = anterior ? Math.min((agora - anterior) / 1000, 0.1) : 0.016
  anterior = agora

  // Aparelho sofrendo (menos de ~25 quadros por segundo): baixa a resolução; se continuar, desiste e o pino desenhado volta.
  quadros++
  if (dt > 0.04) lentos++
  if (quadros % 60 === 0) {
    if (lentos > 30) {
      if (escala > 0.75) {
        escala *= 0.65
        ajustarTamanho()
      } else {
        gl = null
        postMessage('desistir')
        return
      }
    }
    lentos = 0
  }

  velocidade += (0.5 - velocidade) * Math.min(dt * 2, 1)
  anguloY += velocidade * dt
  inclX += (alvoX - inclX) * Math.min(dt * 4, 1)
  inclY += (alvoY - inclY) * Math.min(dt * 4, 1)

  gl.uniform2f(uTela, tela.width, tela.height)
  gl.uniform1f(uTempo, (agora - inicio) / 1000)
  gl.uniform2f(uGiro, inclX, anguloY + inclY)
  gl.drawArrays(gl.TRIANGLES, 0, 3)

  if (quadros === 2) postMessage('pronto')
  pedirQuadro()
}

async function iniciar(m: Extract<Mensagem, { tipo: 'iniciar' }>) {
  tela = m.tela
  largura = m.largura
  altura = m.altura
  escala = Math.min(m.densidade || 1, 1.5)
  const contexto = tela.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'low-power' }) as WebGLRenderingContext | null
  if (!contexto || placaLenta(contexto)) return postMessage('desistir')

  const programa = contexto.createProgram()!
  contexto.attachShader(programa, compilar(contexto, contexto.VERTEX_SHADER, VERTICES))
  contexto.attachShader(programa, compilar(contexto, contexto.FRAGMENT_SHADER, DESENHO))
  contexto.linkProgram(programa)
  await esperarPreparo(contexto, programa)
  if (!contexto.getProgramParameter(programa, contexto.LINK_STATUS)) return postMessage('desistir')

  contexto.useProgram(programa)
  contexto.bindBuffer(contexto.ARRAY_BUFFER, contexto.createBuffer())
  contexto.bufferData(contexto.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), contexto.STATIC_DRAW)
  const pos = contexto.getAttribLocation(programa, 'posicao')
  contexto.enableVertexAttribArray(pos)
  contexto.vertexAttribPointer(pos, 2, contexto.FLOAT, false, 0, 0)
  uTela = contexto.getUniformLocation(programa, 'tela')
  uTempo = contexto.getUniformLocation(programa, 'tempo')
  uGiro = contexto.getUniformLocation(programa, 'giro')
  gl = contexto
  ajustarTamanho()
  pedirQuadro()
}

onmessage = (e: MessageEvent<Mensagem>) => {
  const m = e.data
  if (m.tipo === 'iniciar') iniciar(m)
  else if (m.tipo === 'tamanho') {
    largura = m.largura
    altura = m.altura
    ajustarTamanho()
  } else if (m.tipo === 'olhar') {
    alvoX = m.x
    alvoY = m.y
  } else if (m.tipo === 'arrastar') velocidade = m.dx * 0.25
  else if (m.tipo === 'visivel') {
    visivel = m.visivel
    anterior = 0
    if (visivel) pedirQuadro()
  }
}

// Gera as imagens fixas do site:
// - src/assets/rosto.webp: recorte quadrado do rosto, tirado de perfil.webp (foto do topo e da prévia).
// - public/og.jpg (1200 × 630, abaixo de 300 KB para o WhatsApp mostrar): a prévia quando o link é colado no WhatsApp, Instagram etc.
// - favicon.svg, favicon-32.png, icon-192.png e apple-touch-icon.png: o ícone da aba e da tela inicial
//   ("V" com o pontinho azul do logo; diferente da bolinha da página de links).
// Rodar de novo depois de trocar a foto ou os textos: npm run imagens
import sharp from 'sharp'
import opentype from 'opentype.js'
import { readFileSync, writeFileSync } from 'node:fs'

const perfil = {
  nome: 'Victor Eduardo',
  frase: ['Pare de perseguir clientes e comece', 'a ser a primeira escolha.'],
  selo: 'MARKETING PARA SERVIÇOS & FACILITIES',
  endereco: 'victoreduardo.vercel.app',
}

// Rosto: quadrado em volta do rosto na foto do "Sobre" (1536 × 1968).
await sharp('src/assets/perfil.webp')
  .extract({ left: 318, top: 330, width: 900, height: 900 })
  .resize(480, 480)
  .webp({ quality: 82 })
  .toFile('src/assets/rosto.webp')

// Ícone: quadrado azul-escuro, "V" branco e o pontinho azul do logo.
const icone = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0d1b2e"/>
  <path d="M9 16h11.5l8.5 25 8.5-25H49L35 52h-12z" fill="#fff"/>
  <circle cx="52" cy="16" r="6" fill="#3b9ee8"/>
</svg>`
writeFileSync('public/favicon.svg', icone)
const svgIcone = (tamanho) => sharp(Buffer.from(icone), { density: (72 * tamanho) / 64 }).resize(tamanho, tamanho)
await svgIcone(32).png().toFile('public/favicon-32.png')
await svgIcone(192).png().toFile('public/icon-192.png')
// No iPhone o ícone não pode ter cantos transparentes: o próprio iOS arredonda.
await sharp({ create: { width: 180, height: 180, channels: 3, background: '#0d1b2e' } })
  .composite([{ input: await svgIcone(180).png().toBuffer() }])
  .png()
  .toFile('public/apple-touch-icon.png')

// Fraunces (a fonte dos títulos) vira desenho: assim a imagem sai igual em qualquer computador.
const arquivo = readFileSync('node_modules/@fontsource/fraunces/files/fraunces-latin-700-normal.woff')
const fraunces = opentype.parse(arquivo.buffer.slice(arquivo.byteOffset, arquivo.byteOffset + arquivo.byteLength))
// O toPathData() do opentype.js às vezes escreve "NaN" e corta a palavra; aqui a curva sem ponto de controle vira reta.
const n = (v) => Math.round(v * 100) / 100
const texto = (t, x, y, tamanho) =>
  fraunces
    .getPath(t, x, y, tamanho)
    .commands.map((c) => {
      if (c.type === 'Z') return 'Z'
      if (c.type === 'C' && Number.isFinite(c.x1) && Number.isFinite(c.x2)) return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`
      if (c.type === 'Q' && Number.isFinite(c.x1) && Number.isFinite(c.y1)) return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`
      return `${c.type === 'M' ? 'M' : 'L'}${n(c.x)} ${n(c.y)}`
    })
    .join('')
const sans = "'Segoe UI', system-ui, Arial, sans-serif"

const W = 1200
const H = 630

// Fundo: quase preto, grade azul sutil e luzes azuis (como o topo do site).
const grade = Array.from({ length: 18 }, (_, i) => `<path d="M${i * 72} 0V${H}"/>`).join('') +
  Array.from({ length: 9 }, (_, i) => `<path d="M0 ${i * 72}H${W}"/>`).join('')

const FOTO = 330
const fx = 110
const fy = (H - FOTO) / 2
const cx = fx + FOTO / 2
const cy = fy + FOTO / 2

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="luz1" cx="${cx}" cy="${cy}" r="320" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3b9ee8" stop-opacity="0.4"/><stop offset="1" stop-color="#3b9ee8" stop-opacity="0"/></radialGradient>
    <radialGradient id="luz2" cx="1080" cy="-60" r="600" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1a5fa8" stop-opacity="0.55"/><stop offset="1" stop-color="#1a5fa8" stop-opacity="0"/></radialGradient>
    <linearGradient id="anel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#70c5f8"/><stop offset="0.5" stop-color="#3b9ee8"/><stop offset="1" stop-color="#1a5fa8"/></linearGradient>
    <linearGradient id="frase" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3b9ee8"/><stop offset="1" stop-color="#70c5f8"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#080c14"/>
  <g stroke="#3b9ee8" stroke-opacity="0.07" stroke-width="1">${grade}</g>
  <rect width="${W}" height="${H}" fill="url(#luz2)"/>
  <rect width="${W}" height="${H}" fill="url(#luz1)"/>
  <circle cx="${cx}" cy="${cy}" r="${FOTO / 2 + 8}" fill="url(#anel)"/>
  <circle cx="${cx}" cy="${cy}" r="${FOTO / 2 + 2}" fill="#080c14"/>

  <g transform="translate(520 150)">
    <rect width="434" height="40" rx="20" fill="#3b9ee8" fill-opacity="0.1" stroke="#3b9ee8" stroke-opacity="0.35"/>
    <circle cx="22" cy="20" r="5" fill="#3b9ee8"/>
    <text x="38" y="26" font-family="${sans}" font-size="16" font-weight="700" letter-spacing="1.5" fill="#3b9ee8">${perfil.selo.replace('&', '&amp;')}</text>
  </g>
  <path d="${texto(perfil.nome, 520, 284, 72)}" fill="#fff"/>
  <path d="${texto(perfil.frase[0], 520, 352, 34)}" fill="#d4dce8"/>
  <path d="${texto(perfil.frase[1], 520, 396, 34)}" fill="url(#frase)"/>
  <text x="520" y="470" font-family="${sans}" font-size="22" font-weight="600" fill="#70c5f8">${perfil.endereco}</text>
</svg>`

// Foto redonda, colada por cima do fundo.
const mascara = Buffer.from(`<svg width="${FOTO}" height="${FOTO}"><circle cx="${FOTO / 2}" cy="${FOTO / 2}" r="${FOTO / 2}"/></svg>`)
const foto = await sharp('src/assets/rosto.webp')
  .resize(FOTO, FOTO)
  .composite([{ input: mascara, blend: 'dest-in' }])
  .png()
  .toBuffer()

await sharp(Buffer.from(svg))
  .composite([{ input: foto, left: fx, top: Math.round(fy) }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og.jpg')

console.log('Pronto: src/assets/rosto.webp, public/og.jpg e os ícones')

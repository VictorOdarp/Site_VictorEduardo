/**
 * Interações do site. Tudo funciona sem bibliotecas e respeita o "reduzir movimento" do aparelho.
 * Sem JavaScript o site continua completo: os blocos aparecem, os cases ficam um embaixo do outro.
 */

const parado = matchMedia('(prefers-reduced-motion: reduce)').matches
const mouse = matchMedia('(hover: hover) and (pointer: fine)').matches
const temObservador = 'IntersectionObserver' in window

/** Chama `acao` uma vez, quando o elemento aparece na tela. */
function quandoAparecer(elementos: Iterable<Element>, acao: (el: Element) => void, opcoes: IntersectionObserverInit = {}) {
  const lista = [...elementos]
  if (!temObservador) return lista.forEach(acao)
  const observador = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue
      acao(e.target)
      observador.unobserve(e.target)
    }
  }, opcoes)
  lista.forEach((el) => observador.observe(el))
}

/** Cabeçalho: fica com fundo ao rolar; menu do celular abre e fecha; marca a seção atual. */
function cabecalho() {
  const cabecalho = document.getElementById('cabecalho')!
  const botao = cabecalho.querySelector<HTMLButtonElement>('.menu-btn')!
  const atualizar = () => cabecalho.classList.toggle('rolou', scrollY > 20)
  atualizar()
  addEventListener('scroll', atualizar, { passive: true })

  const alternar = (abrir: boolean) => {
    cabecalho.classList.toggle('aberto', abrir)
    botao.setAttribute('aria-expanded', String(abrir))
    botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu')
  }
  botao.addEventListener('click', () => alternar(!cabecalho.classList.contains('aberto')))
  cabecalho.querySelectorAll('.menu-links a').forEach((link) => link.addEventListener('click', () => alternar(false)))
  addEventListener('keydown', (e) => e.key === 'Escape' && alternar(false))

  if (!temObservador) return
  const links = [...cabecalho.querySelectorAll<HTMLAnchorElement>('.menu-links a:not(.botao)')]
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue
        links.forEach((l) => l.classList.toggle('atual', l.hash === `#${e.target.id}`))
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  document.querySelectorAll('main > section[id]').forEach((s) => observador.observe(s))
}

/** Blocos que sobem e aparecem ao rolar. */
function revelar() {
  const blocos = document.querySelectorAll('.revelar')
  if (parado) return blocos.forEach((b) => b.classList.add('visivel'))
  quandoAparecer(blocos, (b) => b.classList.add('visivel'), { rootMargin: '0px 0px -8% 0px' })
}

/**
 * Contadores: sobem do zero até o número escrito, mantendo as mesmas casas decimais
 * (10.34k+ termina em 10.34k+, e não em 10.3k+). "R$6,06", "Top 1" e "Ativo" ficam como estão.
 */
function contar(el: HTMLElement) {
  const final = el.dataset.final ?? el.textContent!.trim()
  el.dataset.final = final
  const partes = final.match(/^(\d+)(?:\.(\d+))?(\D*)$/)
  if (!partes || parado) return
  const casas = partes[2]?.length ?? 0
  const alvo = Number(`${partes[1]}.${partes[2] ?? 0}`)
  const duracao = 1600
  let inicio = 0
  const passo = (agora: number) => {
    inicio ||= agora
    const p = Math.min((agora - inicio) / duracao, 1)
    const suave = 1 - Math.pow(1 - p, 3)
    el.textContent = p < 1 ? (alvo * suave).toFixed(casas) + partes[3] : final
    if (p < 1) requestAnimationFrame(passo)
  }
  requestAnimationFrame(passo)
}
const contarDentro = (bloco: Element) => bloco.querySelectorAll<HTMLElement>('.numero-n, .metrica-n').forEach(contar)

function contadores() {
  quandoAparecer(document.querySelectorAll('[data-contadores]:not([hidden])'), contarDentro, { threshold: 0.3 })
}

/** Cartões de serviço: inclinam e brilham onde o mouse está (só no computador). */
function mouseNoComputador() {
  if (!mouse || parado) return
  document.querySelectorAll<HTMLElement>('.inclinar').forEach((cartao) => {
    cartao.addEventListener('pointermove', (e) => {
      const r = cartao.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      cartao.style.setProperty('--ry', `${(x - 0.5) * 6}deg`)
      cartao.style.setProperty('--rx', `${(0.5 - y) * 6}deg`)
      cartao.style.setProperty('--px', `${x * 100}%`)
      cartao.style.setProperty('--py', `${y * 100}%`)
    })
    cartao.addEventListener('pointerleave', () => {
      cartao.style.setProperty('--rx', '0deg')
      cartao.style.setProperty('--ry', '0deg')
    })
  })
}

/** Serviços: no computador a lista "O que está incluído" fica aberta; no celular abre com um toque. */
function servicos() {
  const largo = matchMedia('(min-width: 768px)')
  const ajustar = () => document.querySelectorAll<HTMLDetailsElement>('.inclui').forEach((d) => (d.open = largo.matches))
  ajustar()
  largo.addEventListener('change', ajustar)
}

/** Processo: a linha se desenha e os passos acendem um a um. */
function processo() {
  const el = document.getElementById('processo')!
  if (parado) return el.classList.add('ativo')
  quandoAparecer([el], () => el.classList.add('ativo'), { threshold: 0.35 })
}

/** Cases: abas para trocar de cliente (também pelas setas do teclado). */
function abasDosCases() {
  const lista = document.querySelector<HTMLElement>('[data-abas]')
  if (!lista) return
  const abas = [...lista.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
  const paineis = abas.map((a) => document.getElementById(a.getAttribute('aria-controls')!)!)
  lista.hidden = false
  paineis.forEach((p, i) => {
    p.hidden = i !== 0
    p.classList.remove('revelar')
  })

  const escolher = (indice: number, focar = false) => {
    abas.forEach((a, i) => {
      const ativa = i === indice
      a.setAttribute('aria-selected', String(ativa))
      a.tabIndex = ativa ? 0 : -1
      paineis[i].hidden = !ativa
    })
    const painel = paineis[indice]
    painel.classList.remove('mostrar')
    void painel.offsetWidth
    painel.classList.add('mostrar')
    contarDentro(painel)
    if (focar) abas[indice].focus()
    abas[indice].scrollIntoView({ block: 'nearest', inline: 'center', behavior: parado ? 'auto' : 'smooth' })
  }
  abas.forEach((a, i) => a.addEventListener('click', () => escolher(i)))
  lista.addEventListener('keydown', (e) => {
    const atual = abas.findIndex((a) => a.getAttribute('aria-selected') === 'true')
    const mapa: Record<string, number> = { ArrowRight: atual + 1, ArrowLeft: atual - 1, Home: 0, End: abas.length - 1 }
    if (!(e.key in mapa)) return
    e.preventDefault()
    escolher((mapa[e.key] + abas.length) % abas.length, true)
  })
}

/** Depoimentos: setas para passar os prints no celular e janela para ampliar. */
function depoimentos() {
  const trilho = document.getElementById('prints')!
  document.querySelectorAll<HTMLButtonElement>('[data-rolar]').forEach((b) =>
    b.addEventListener('click', () => {
      const largura = trilho.querySelector('.print')!.getBoundingClientRect().width
      trilho.scrollBy({ left: Number(b.dataset.rolar) * largura, behavior: parado ? 'auto' : 'smooth' })
    }),
  )

  const lupa = document.getElementById('lupa') as HTMLDialogElement
  if (typeof lupa.showModal !== 'function') return
  const imagens = [...lupa.querySelectorAll<HTMLImageElement>('[data-lupa]')]
  document.querySelectorAll<HTMLButtonElement>('[data-ampliar]').forEach((b) =>
    b.addEventListener('click', () => {
      imagens.forEach((img) => (img.hidden = img.dataset.lupa !== b.dataset.ampliar))
      lupa.showModal()
    }),
  )
  lupa.querySelector('.lupa-fechar')!.addEventListener('click', () => lupa.close())
  // Toque fora da imagem também fecha.
  lupa.addEventListener('click', (e) => e.target === lupa && lupa.close())
}

/** Botão flutuante de WhatsApp: aparece depois do topo e some quando o rodapé (que já tem o botão) aparece. */
function whatsappFlutuante() {
  const zap = document.getElementById('zap')!
  if (!temObservador) return
  const visiveis = new Set<string>()
  const observador = new IntersectionObserver((entradas) => {
    for (const e of entradas) e.isIntersecting ? visiveis.add(e.target.id) : visiveis.delete(e.target.id)
    zap.classList.toggle('visivel', visiveis.size === 0)
  })
  ;['topo', 'contato'].forEach((id) => observador.observe(document.getElementById(id)!))
}

/** Divide o trabalho em pedaços pequenos, um por vez, para a página nunca travar ao abrir (bom para celulares simples). */
const proximaVez = () => new Promise((r) => setTimeout(r, 0))

export async function iniciar() {
  cabecalho()
  revelar()
  for (const etapa of [contadores, servicos, abasDosCases, processo, depoimentos, whatsappFlutuante, mouseNoComputador]) {
    await proximaVez()
    etapa()
  }
}

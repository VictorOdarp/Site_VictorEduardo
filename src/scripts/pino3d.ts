/**
 * Pino 3D do topo. O desenho em si roda em pino3d-worker.ts, fora da página, para nunca travá-la;
 * aqui ficam só a tela (canvas) e os movimentos de mouse, dedo e inclinação do celular.
 *
 * Só é carregado depois que a página já apareceu (ver carregarPino3D em interacoes.ts).
 * Se o navegador não suportar, ou se o desenho ficar lento, o pino desenhado (SVG) continua no lugar.
 */

export function iniciarPino3D(cenaEl: HTMLElement) {
  const tela = document.createElement('canvas')
  if (!('transferControlToOffscreen' in tela)) return
  tela.className = 'pino-3d'
  tela.setAttribute('aria-hidden', 'true')
  // Fica logo depois do "chão", para a ponta do pino aparecer por cima dele e os balões por cima de tudo.
  cenaEl.querySelector('.pino-chao')!.after(tela)

  const worker = new Worker(new URL('./pino3d-worker.ts', import.meta.url), { type: 'module' })
  const desistir = () => {
    cenaEl.classList.remove('com-3d')
    tela.remove()
    worker.terminate()
  }
  worker.onerror = desistir
  worker.onmessage = (e) => {
    if (e.data === 'pronto') cenaEl.classList.add('com-3d')
    if (e.data === 'desistir') desistir()
  }

  const r = cenaEl.getBoundingClientRect()
  const offscreen = tela.transferControlToOffscreen()
  worker.postMessage({ tipo: 'iniciar', tela: offscreen, largura: r.width, altura: r.height, densidade: devicePixelRatio }, [offscreen])

  new ResizeObserver(([e]) => worker.postMessage({ tipo: 'tamanho', largura: e.contentRect.width, altura: e.contentRect.height })).observe(cenaEl)

  // Só desenha quando o topo está na tela e a aba está aberta.
  let naTela = true
  const avisarVisivel = () => worker.postMessage({ tipo: 'visivel', visivel: naTela && !document.hidden })
  new IntersectionObserver(([e]) => {
    naTela = e.isIntersecting
    avisarVisivel()
  }).observe(cenaEl)
  document.addEventListener('visibilitychange', avisarVisivel)

  // Mouse: o pino "olha" levemente para onde o mouse está.
  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse' || !naTela) return
      worker.postMessage({ tipo: 'olhar', x: (e.clientY / innerHeight - 0.5) * 0.5, y: (e.clientX / innerWidth - 0.5) * 0.9 })
    },
    { passive: true },
  )

  // Dedo ou mouse arrastando para o lado: gira o pino (a rolagem da página para cima e para baixo continua normal).
  let arrastando: number | null = null
  cenaEl.addEventListener('pointerdown', (e) => {
    arrastando = e.clientX
    cenaEl.setPointerCapture(e.pointerId)
  })
  cenaEl.addEventListener('pointermove', (e) => {
    if (arrastando === null) return
    worker.postMessage({ tipo: 'arrastar', dx: e.clientX - arrastando })
    arrastando = e.clientX
  })
  const soltar = () => (arrastando = null)
  cenaEl.addEventListener('pointerup', soltar)
  cenaEl.addEventListener('pointercancel', soltar)

  // Celular inclinado: o pino acompanha (nos aparelhos que informam a inclinação sem pedir permissão).
  addEventListener(
    'deviceorientation',
    (e) => {
      if (e.gamma == null || e.beta == null || !naTela) return
      worker.postMessage({
        tipo: 'olhar',
        x: Math.max(-1, Math.min(1, (e.beta - 45) / 30)) * 0.3,
        y: Math.max(-1, Math.min(1, e.gamma / 30)) * 0.5,
      })
    },
    { passive: true },
  )
}

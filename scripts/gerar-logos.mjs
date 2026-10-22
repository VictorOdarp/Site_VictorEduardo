// Prepara os logotipos dos clientes (originais em referencias/clientes) para a faixa escura do site:
// tira o fundo liso (cinza da NékeLimpa, branco da Inove), corta as sobras e salva em src/assets/clientes.
// Rodar de novo depois de trocar um logotipo: npm run logos
import sharp from 'sharp'

/**
 * Deixa transparente o que tem a cor do fundo, com borda suave (sem "serrilhado" nem contorno claro).
 */
async function tirarFundo(entrada, saida, fundo, { tolerancia = 14, suavidade = 50 } = {}) {
  const { data, info } = await sharp(entrada).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
    const d = Math.hypot(r - fundo[0], g - fundo[1], b - fundo[2])
    const a = Math.min(1, Math.max(0, (d - tolerancia) / suavidade))
    if (a < 1) {
      // Tira a "mistura" com o fundo da cor da borda.
      for (let c = 0; c < 3; c++) data[i + c] = a > 0 ? Math.min(255, Math.max(0, (data[i + c] - fundo[c] * (1 - a)) / a)) : 0
    }
    data[i + 3] = Math.round(data[i + 3] * a)
  }
  await sharp(data, { raw: info }).trim({ threshold: 1 }).resize({ height: 160, withoutEnlargement: true }).png().toFile(saida)
}

await tirarFundo('referencias/clientes/nekelimpa.png', 'src/assets/clientes/nekelimpa.png', [227, 227, 227])

await tirarFundo('referencias/clientes/inove.png', 'src/assets/clientes/inove.png', [255, 255, 255])

// LimperSofá já vem sem fundo: só corta as sobras.
await sharp('referencias/clientes/limpersofa.png').trim({ threshold: 1 }).png().toFile('src/assets/clientes/limpersofa.png')

console.log('Pronto: logotipos em src/assets/clientes')

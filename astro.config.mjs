// Configuração do site do Victor (victoreduardo.vercel.app).
// O Astro gera um HTML pronto na pasta dist/, que a Vercel entrega direto.
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://victoreduardo.vercel.app',
  build: {
    // O CSS vai dentro do próprio HTML: a página aparece sem esperar outro arquivo (melhor no 4G).
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
})

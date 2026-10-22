// Copia só os ícones usados no site (Lucide) para src/icons.json: o site não baixa nenhuma biblioteca de ícones.
// Para usar um ícone novo: acrescente o nome na lista e rode: npm run icones
import { readFileSync, writeFileSync } from 'node:fs'

const nomes = [
  'search', 'globe', 'trending-down', 'smartphone', 'star', 'users',
  'monitor-smartphone', 'map-pin', 'megaphone', 'pen-tool',
  'graduation-cap', 'brain-circuit', 'briefcase-business', 'award', 'arrow-right', 'arrow-up-right', 'mail', 'check', 'x',
  'chevron-down', 'chevron-left', 'chevron-right', 'quote', 'clipboard-check',
  'compass', 'rocket', 'chart-column', 'trending-up', 'zoom-in', 'calendar-check', 'target',
]

const icones = {}
for (const nome of nomes) {
  const svg = readFileSync(`node_modules/lucide-static/icons/${nome}.svg`, 'utf8')
  icones[nome] = svg
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/\s*\n\s*/g, '')
}
writeFileSync('src/icons.json', JSON.stringify(icones, null, 1) + '\n')
console.log(`Pronto: ${nomes.length} ícones em src/icons.json`)

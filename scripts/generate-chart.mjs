#!/usr/bin/env node
// Generates a horizontal bar-chart SVG for use inside article MDX bodies.
// Colors/fonts reference the site's CSS custom properties (--color-*, --font-jetbrains-mono)
// rather than literal values, so the chart is inlined into the page (not <img src>'d) and
// inherits the page's live theme instead of being frozen at generation time.
//
// Usage: node scripts/generate-chart.mjs <data.json> <output.svg>
// data.json shape: { "unit": "×", "items": [{ "label": "...", "value": 32 }, ...] }

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function generateBarChart({ items, unit = '', maxValue }) {
  const rowHeight = 44
  const barHeight = 20
  const labelWidth = 260
  const valueGutter = 50
  const chartWidth = 680
  const paddingY = 12
  const barAreaWidth = chartWidth - labelWidth - valueGutter
  const height = items.length * rowHeight + paddingY * 2
  const max = maxValue ?? Math.max(...items.map((item) => item.value))
  const scale = barAreaWidth / max

  const rows = items
    .map((item, i) => {
      const rowY = paddingY + i * rowHeight
      const centerY = rowY + rowHeight / 2
      const barY = centerY - barHeight / 2
      const barWidth = Math.max(item.value * scale, 2)
      return `
    <text x="0" y="${centerY}" dy="0.35em" font-family="var(--font-jetbrains-mono, monospace)" font-size="13" fill="var(--color-ink)">${escapeXml(item.label)}</text>
    <rect x="${labelWidth}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="2" fill="var(--color-primary)" />
    <text x="${labelWidth + barWidth + 10}" y="${centerY}" dy="0.35em" font-family="var(--font-jetbrains-mono, monospace)" font-size="13" fill="var(--color-muted)">${escapeXml(item.value)}${escapeXml(unit)}</text>`
    })
    .join('')

  return `<svg viewBox="0 0 ${chartWidth} ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
  <line x1="${labelWidth}" y1="0" x2="${labelWidth}" y2="${height}" stroke="var(--color-surface)" stroke-width="1" />${rows}
</svg>`
}

function main() {
  const [, , dataPath, outPath] = process.argv
  if (!dataPath || !outPath) {
    console.error('Usage: node scripts/generate-chart.mjs <data.json> <output.svg>')
    process.exit(1)
  }
  const data = JSON.parse(readFileSync(dataPath, 'utf-8'))
  const svg = generateBarChart(data)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, svg)
  console.log(`Wrote ${outPath}`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

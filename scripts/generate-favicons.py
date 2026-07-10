#!/usr/bin/env python3
"""Rasterizes the chip/pins/asterisk logomark (src/components/LogoMark.tsx) into the static
favicon/app-icon files Next's metadata file convention expects. The on-page mark is
token-driven (var(--color-fg)/var(--color-accent)) so it can flip with the theme toggle;
static icons render in browser/OS chrome with no access to page CSS, so this bakes in one
fixed light-mode-accent palette instead (mirrors the old fixed-navy favicon approach).

One-off manual script (no npm equivalent) — run with the system python3, which has
PyGObject + librsvg + cairo bindings preinstalled: `python3 scripts/generate-favicons.py`
"""

import os
import gi

gi.require_version("Rsvg", "2.0")
from gi.repository import Rsvg
import cairo

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FG = "#1b1d21"
ACCENT = "#2f9e57"


def mark_svg(bg=None):
    bg_rect = f'  <rect x="0" y="0" width="24" height="24" fill="{bg}"/>\n' if bg else ""
    return f"""<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
{bg_rect}  <rect x="5" y="5" width="14" height="14" rx="3" fill="none" stroke="{FG}" stroke-width="1.6"/>
  <g stroke="{FG}" stroke-width="1.6" stroke-linecap="round">
    <line x1="9" y1="5" x2="9" y2="2.2"/><line x1="15" y1="5" x2="15" y2="2.2"/>
    <line x1="9" y1="19" x2="9" y2="21.8"/><line x1="15" y1="19" x2="15" y2="21.8"/>
    <line x1="5" y1="9" x2="2.2" y2="9"/><line x1="5" y1="15" x2="2.2" y2="15"/>
    <line x1="19" y1="9" x2="21.8" y2="9"/><line x1="19" y1="15" x2="21.8" y2="15"/>
  </g>
  <g stroke="{ACCENT}" stroke-width="1.7" stroke-linecap="round">
    <line x1="12" y1="9.2" x2="12" y2="14.8"/><line x1="9.2" y1="12" x2="14.8" y2="12"/>
    <line x1="10" y1="10" x2="14" y2="14"/><line x1="14" y1="10" x2="10" y2="14"/>
  </g>
</svg>"""


def render(svg_text, size, out_path):
    handle = Rsvg.Handle.new_from_data(svg_text.encode("utf-8"))
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, size, size)
    cr = cairo.Context(surface)
    viewport = Rsvg.Rectangle()
    viewport.x, viewport.y, viewport.width, viewport.height = 0, 0, size, size
    handle.render_document(cr, viewport)
    surface.write_to_png(out_path)
    print("wrote", out_path)


transparent = mark_svg()
on_white = mark_svg(bg="#ffffff")

render(transparent, 32, os.path.join(ROOT, "src/app/icon0.png"))
render(on_white, 180, os.path.join(ROOT, "src/app/apple-icon.png"))
render(on_white, 192, os.path.join(ROOT, "public/icon-192.png"))
render(on_white, 512, os.path.join(ROOT, "public/icon-512.png"))

svg_path = os.path.join(ROOT, "src/app/icon1.svg")
with open(svg_path, "w") as f:
    f.write(transparent + "\n")
print("wrote", svg_path)

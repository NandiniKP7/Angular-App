# Day 02 Cheatsheet

## Project files
| Path | Role |
|---|---|
| `package.json` | name, scripts, dependencies |
| `angular.json` | CLI settings (start file, global styles) |
| `src/index.html` | the one page; contains `<app-root></app-root>` |
| `src/main.ts` | starts `App` (`bootstrapApplication(App, appConfig)`) |
| `src/app/app.ts` | `selector: 'app-root'` links the tag to class `App` |
| `src/app/app.html` / `app.css` | what `App` shows / how it looks |
| `src/styles.css` | global CSS |
| `public/`, `node_modules/` | static files / downloaded packages (never edit `node_modules`) |

## Commands
| Command | What it does |
|---|---|
| `ng serve` | run and reload on save |
| `F12` in the browser | DevTools: Elements and Computed tabs show boxes and sizes |

## HTML
| Element | Use |
|---|---|
| `aside` / `nav` / `header` / `main` | sidebar / link group / top part / main content (block) |
| `a` | link (placeholder without `href`), inline |
| `span` | piece of text in a line, inline |
| `class="x"` | name for CSS |

```html
<a class="active">My Learning</a>
```

## CSS
| Code | Meaning |
|---|---|
| `.a b` / `.a b.c` | `b` inside `.a` / `b` with class `c` inside `.a` |
| `padding: 22px 14px` | top-bottom 22, left-right 14 (3 values: top, sides, bottom; 4: top right bottom left) |
| `margin-bottom: 6px` | space outside, below |
| `border-bottom: 1px solid #dfe6ea` | line: thickness style color |
| `box-sizing: border-box` | `width` includes padding and border |
| `display: block` | own line, full width |
| `display: flex` | children in a row |
| `flex-direction: column` | children in a column |
| `justify-content: space-between` | first and last at the ends (along the row) |
| `align-items: center` | centered across the row |
| `gap: 12px` | space between flex items |
| `flex: 1` / `flex: none` | grow to fill / keep own size |
| `width: 230px`, `min-height: 100vh` | fixed width / at least window height |
| `border-radius: 10px` | rounded corners |

## Memory rule
1. Box from inside out: content, padding, border, margin.
2. `display: flex` goes on the parent; `flex: 1` and `flex: none` go on the children.
3. A space in a selector means "inside" (`.sidebar a`); no space means "same element" (`a.active`).

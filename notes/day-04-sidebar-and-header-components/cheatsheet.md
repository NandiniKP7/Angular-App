# Day 04 Cheatsheet: Sidebar and Header Components

## Angular
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
}
```
| Setting | Meaning |
|---|---|
| `selector` | Tag name used in HTML: `<app-sidebar />` |
| `imports` | Components (and tools) this template uses |
| `templateUrl` | Path to the HTML file |
| `styleUrl` | Path to the CSS file (scoped to this component) |

Use a component in `app.ts`/`app.html`:
```ts
import { Sidebar } from './sidebar/sidebar';
// in @Component: imports: [Sidebar, Header],
```
```html
<app-sidebar />
```
Older Angular names: `sidebar.component.ts`, class `SidebarComponent`.

## CLI / commands
| Command | Use |
|---|---|
| `ng generate component sidebar --skip-tests` | Create `src/app/sidebar/` with `.ts`, `.html`, `.css` |
| `ng g c header --skip-tests` | Short form |
| `ng serve` | Keep running in the first terminal |

## HTML
| Element | Use |
|---|---|
| `<nav>` | Group of navigation links |
| `<nav aria-label="Main navigation">` | Name for screen readers |
| `<a>` without `href` | Placeholder, not a real link yet |

## CSS
| Code | Meaning |
|---|---|
| `.sidebar a:hover { ... }` | Styles while the mouse is over the link |
| `transition: background 0.15s;` | Gradual change of `background` over 0.15 seconds (write it on the normal rule) |
| `.sidebar a.active` | An `<a>` that has class `active` |
| `min-height: 100vh;` | At least the full window height |
| Component `.css` | Applies only to that component's template |
| `src/styles.css` | Global: applies everywhere |

## Memory rule
1. A component = a class, a template and a CSS file; generate it with `ng g c name --skip-tests`.
2. Using it takes three things: import line, `imports: [...]` entry, tag in the template.
3. Data and CSS must live in the component that uses them; only `styles.css` is global.

# Day 01 Cheatsheet

## Commands
| Command | What it does |
|---|---|
| `node -v` / `npm -v` / `ng version` | Check the tools |
| `npm install -g @angular/cli` | Install the `ng` command |
| `ng new learnbuddy --skip-tests` | Create the project (CSS, SSR No, zoneless No, AI tools None) |
| `cd learnbuddy` | Go into the project folder |
| `ng serve` | Run at `http://localhost:4200/`; reloads on save |
| `Ctrl+C` | Stop `ng serve` |

## Angular files
| File | Role |
|---|---|
| `src/app/app.ts` | Class `App` + `@Component` settings (`selector: 'app-root'`) |
| `src/app/app.html` | What `App` shows |
| `src/app/app.css` | CSS for `App` only |
| `src/styles.css` | Global CSS |

```ts
@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
```

## HTML
```html
<div class="landing">        <!-- opening tag, attribute class="landing" -->
  <h1>Title</h1>             <!-- main heading -->
  <p>Paragraph</p>           <!-- paragraph -->
</div>                       <!-- closing tag -->
```

## CSS
```css
.landing { property: value; }    /* class selector */
.landing p { color: #bcd6da; }   /* p inside .landing */
```
| Property | Meaning |
|---|---|
| `color` | text color |
| `background` | color behind content |
| `text-align: center` | center text |
| `padding-top: 120px` | space inside, above content |
| `min-height: 100vh` | at least the window height |
| `box-sizing: border-box` | padding counts inside the size |
| `margin: 0` | no space outside |

## Memory rule
1. HTML says what is on the screen; CSS says how it looks.
2. `ng serve` runs the app: save the file and the browser reloads.
3. A CSS rule is `selector { property: value; }`: check the dot, the colon and the semicolon.

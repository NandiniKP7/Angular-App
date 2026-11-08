# Day 01: Create the App

**Project today:** the LearnBuddy landing screen (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
**Angular**
- What Angular and the Angular CLI are, and how to create (`ng new`) and run (`ng serve`) a project
- What `app.ts`, `app.html` and `app.css` do

**HTML**
- Elements, tags, attributes and nesting; the elements `h1`, `p` and `div`

**CSS**
- Rule, selector, property and value; where CSS files go (global or per component)
- `color`, `background`, `text-align`, `padding`, `min-height`

Open a terminal (a window where you type commands) before you start. You will use it in concepts 2 to 4.

---

**1. Angular: what it is**

A **browser** (Chrome, Edge) shows web pages. A browser understands three languages: **HTML** (what is on the page), **CSS** (how it looks) and **JavaScript** (what it does). **Angular** is a **framework**: a set of ready-made code and rules that you build your app on. You write TypeScript (JavaScript with added type information), HTML and CSS. Angular's tools turn your TypeScript into JavaScript for the browser.

An Angular app is built from **components**. A component is one part of the screen. It has three files: a `.ts` file (TypeScript), a `.html` file (what it shows) and a `.css` file (how it looks). Today the whole app is one component named `App`.

---

**2. Angular: the tools (Node.js, npm, CLI)**

- **Node.js** runs JavaScript on your computer (outside the browser). Angular's tools need it.
- **npm** is the program that downloads packages (code written by others). It comes with Node.js.
- A **CLI** (command line interface) is a program you control by typing commands. The Angular CLI is called `ng`.

Check them in the terminal:

```
node -v
# v22.12.0   (your number can differ; it must be 20.19 or higher)

npm -v
# 10.9.0     (your number can differ)

ng version
# prints a box with "Angular CLI: 20.x.x" (the number can differ)
```

If `ng version` says the command is not found, install the CLI once:

```
npm install -g @angular/cli
```

`-g` means global: it installs `ng` for the whole computer, not for one project.

---

**3. Angular: create a project with `ng new`**

```
ng new learnbuddy --skip-tests
```

Read it piece by piece:
- `ng new` creates a new project in a new folder.
- `learnbuddy` is the project name and the folder name.
- `--skip-tests` is an **option** (an extra setting that starts with `--`). It stops the CLI from creating test files, which this course does not use.

The CLI asks questions. Answer like this (if a question does not appear in your version, skip it):

```
Which stylesheet system would you like to use?   CSS
Do you want to enable Server-Side Rendering?     No
Do you want to enable zoneless?                  No
Which AI tools do you want to configure?         None
```

For every other question, press Enter to accept the default. The CLI then downloads packages. This takes a few minutes. When it ends, go into the project folder:

```
cd learnbuddy
```

You will touch these files today (the other files are explained on Day 02):

```
learnbuddy/
  src/
    styles.css        <- global CSS
    app/
      app.ts          <- the App component: TypeScript
      app.html        <- the App component: HTML
      app.css         <- the App component: CSS
```

Note: older Angular versions name these `app.component.ts`, `app.component.html`, `app.component.css`. This course uses the new names.

---

**4. Angular: run it with `ng serve`**

```
ng serve
```

`ng serve` builds your app and starts a **development server**: a program on your computer that sends the app to your browser. When it is ready, the terminal prints a line like `Local: http://localhost:4200/`. Open that address in the browser.

Read it piece by piece:
- `localhost` means "this computer".
- `4200` is the **port**: the number that identifies the server on your computer.

Each time you **save** a file, Angular rebuilds the app and the browser **reloads** the page by itself. Keep `ng serve` running while you work. Stop it with `Ctrl+C`. Open a second terminal if you need to type other commands.

---

**5. Angular: the three files of a component**

`app.html` holds the HTML shown on screen. `app.css` holds the CSS for that HTML. `app.ts` connects them:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
```

Read it piece by piece:
- `import { Component } ...` brings in `Component` from the Angular package so you can use it.
- `@Component({ ... })` is a **decorator**: it attaches settings to the class below it.
- `selector: 'app-root'` is the tag name of this component. The file `src/index.html` already contains `<app-root></app-root>`, and Angular puts the component there.
- `imports: []` lists other components this template uses. Today it is empty.
- `templateUrl` and `styleUrl` point to the HTML and CSS files.
- `export class App { }` is the TypeScript **class**: a named block of code that will hold the component's data and actions. It is empty today. Data goes here from Day 03.

**The cleanup.** The file the CLI creates also has `import { RouterOutlet } from '@angular/router';`, `imports: [RouterOutlet]` and a line `protected readonly title = signal('learnbuddy');` (plus `signal` in the first import). Today's HTML does not use any of them, and Angular prints a warning for an unused import. So you delete those parts, and you get the file above.

---

**6. HTML: elements, tags and attributes**

HTML is text written in **elements**. An element has an opening tag, content and a closing tag:

```html
<p class="intro">Hello</p>
```

Read it piece by piece:
- `<p class="intro">` is the **opening tag**. `p` is the element name.
- `class="intro"` is an **attribute**: extra information inside the opening tag, written `name="value"`.
- `Hello` is the content.
- `</p>` is the **closing tag** (the same name with a `/`).

Elements can sit inside other elements. This is **nesting**. The outer element is the **parent**, the inner one is the **child**. Indent children by 2 spaces so you can see the nesting:

```html
<div>
  <p>Hello</p>
</div>
```

Every opening tag needs its closing tag, and the inner element must close before the outer one.

---

**7. HTML: `h1`, `p` and `div`**

- `<h1>` is the main heading of a page. Browsers show it large and bold. (`h2`, `h3` are smaller headings.)
- `<p>` is one paragraph of text.
- `<div>` is a plain container. It shows nothing by itself. You use it to group elements, and to give them a `class` that CSS can use.

```html
<div class="card">
  <h1>Title</h1>
  <p>Some text</p>
</div>
```

These three elements are **block** elements: each one starts on a new line and takes the full width available. The browser shows `Title` on one line and `Some text` below it.

---

**8. CSS: rule, selector, property, value**

CSS is a list of **rules**. A rule says: for these elements, set these styles.

```css
p {
  color: red;
}
```

Read it piece by piece:
- `p` is the **selector**: it chooses which elements the rule applies to (every `<p>`).
- `{ ... }` holds the **declarations**.
- `color: red;` is one declaration. `color` is the **property** (what to change), `red` is the **value**. Each declaration ends with `;`.

Two more selectors you need today:

```css
.landing { background: #0e3441; }   /* every element with class="landing" */
.landing p { color: white; }        /* every p that is inside an element with class="landing" */
```

A selector that starts with a dot is a **class selector**: `.landing` matches `class="landing"`. Two selectors separated by a space (`.landing p`) match a `p` anywhere **inside** `.landing`.

**Colors** are written as a name (`white`) or as a **hex code**: `#` and 6 characters (0-9, a-f). The pairs are red, green, blue. `#0e3441` is a dark teal. **Lengths** use `px` (pixels), for example `120px`.

---

**9. CSS: where the CSS goes**

An Angular project has two places for CSS:

| File | Applies to |
|---|---|
| `src/styles.css` | the whole app (**global**) |
| `src/app/app.css` | only the HTML of the `App` component |

Today you put one rule in `styles.css`:

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
```

- `body` is the element that holds everything on the page.
- Browsers add built-in default styles. For example, `body` has a margin of about 8px, which leaves a white border around your page. `margin: 0` removes it. (A **margin** is empty space outside an element.)
- `font-family: Arial, sans-serif` sets the font. If Arial is missing, the browser uses any `sans-serif` font. Child elements **inherit** this: they use the parent's font unless they set their own.

Everything specific to the landing screen goes in `app.css`.

---

**10. CSS: color, background, text-align**

```html
<div class="box">
  <p>Hello</p>
</div>
```

```css
.box {
  background: #0e3441;   /* the box is dark teal */
  color: white;          /* text inside is white */
  text-align: center;    /* text is centered horizontally */
}
```

- `background` sets the color behind the content.
- `color` sets the text color. Children inherit it, so the `<p>` is white too.
- `text-align: center` centers text (and also affects child elements). Other values: `left`, `right`.

---

**11. CSS: padding, min-height, box-sizing**

**Padding** is empty space *inside* an element, between its edge and its content.

```css
.box {
  padding-top: 120px;   /* 120px of space above the content */
  min-height: 100vh;    /* the box is at least as tall as the browser window */
}
```

- `vh` means 1% of the browser window height, so `100vh` is the full window height.
- `min-height` is the smallest allowed height. The box grows if its content needs more.

By default, padding is **added** to the height: `min-height: 100vh` plus `padding-top: 120px` would make the box 120px taller than the window, and a scroll bar appears. The declaration `box-sizing: border-box` changes this: padding is counted **inside** the height. Today you always write `box-sizing: border-box` together with `padding` and `min-height`. Day 02 explains the box fully.

---

**Common problems**
- `ng` is not recognized: close the terminal, open a new one and try again, or run `npm install -g @angular/cli`. On Windows PowerShell, an error saying "running scripts is disabled" means you should use Command Prompt (`cmd`) instead.
- `Port 4200 is already in use`: another `ng serve` is running. Stop it with `Ctrl+C`, or answer `y` when asked to use another port.
- The page does not change: you did not save the file, or the terminal shows a red error. Read the first line of the error.
- CSS does nothing: check the dot in `.landing`, the colon after the property, the `;` after the value, and that the `class` in HTML has the same spelling.

---

**Recap**
- Angular is a framework. The CLI command `ng new` creates a project and `ng serve` runs it at `http://localhost:4200/`.
- A component has a `.ts`, a `.html` and a `.css` file. `app.ts` links the other two.
- HTML is elements: opening tag, content, closing tag; attributes go in the opening tag; elements nest.
- A CSS rule is selector + declarations (`property: value;`). `.name` selects a class, `.a p` selects a `p` inside `.a`.
- `styles.css` is global; `app.css` is only for the `App` component.

**Next:** open `requirements.md` for today's project and challenges.

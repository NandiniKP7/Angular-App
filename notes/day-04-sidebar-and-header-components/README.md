# Day 04: Sidebar and Header Components

**Topic today:** 03 Components (Angular roadmap)
**Project today:** split the page into `Sidebar` and `Header` components (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **Angular:** what a component is, the parts of `@Component`, `ng generate component`, importing a component, component-scoped CSS
- **HTML:** `<nav>` for a group of navigation links
- **CSS:** `:hover`, `transition`, a highlighted "active" link, `min-height: 100vh` on a nested element

Keep `ng serve` running. Open a second terminal for the `ng generate` commands.

---

**1. Angular: a component owns a piece of the screen**

A **component** is one piece of the screen with its own HTML, its own CSS and its own data. Until today, `App` owned the whole page. A component is made of a TypeScript class and two files next to it:

| File | Holds |
|---|---|
| `sidebar.ts` | The class: data and methods |
| `sidebar.html` | The template: what the piece shows |
| `sidebar.css` | The styles for this piece |

Small components are easier to read, change and reuse than one very large `app.html`.

---

**2. Angular: the parts of `@Component`**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  appName: string = 'LearnBuddy';
}
```

Read it piece by piece:
- `import { Component } from '@angular/core';` loads the `Component` tool from Angular.
- `@Component({ ... })` is a **decorator**: a label written above a class that tells Angular "this class is a component, and here are its settings".
- `selector: 'app-sidebar'` is the **tag name** you write in HTML to place this component: `<app-sidebar />`. A tag name with a hyphen is how browsers recognize a custom tag.
- `imports: []` lists the other components this template uses. It is empty here because the sidebar uses no other component.
- `templateUrl: './sidebar.html'` is the path to the template file. `./` means "in the same folder as this file".
- `styleUrl: './sidebar.css'` is the path to the CSS file.
- `export class Sidebar` is the class. `export` lets other files import it.

Note: in older Angular versions the files are named `sidebar.component.ts` and the class is `SidebarComponent`. Newer versions (v20 and later), which you use, drop `.component`.

---

**3. Angular: `ng generate component` creates the files**

```bash
ng generate component sidebar --skip-tests
```

This creates a folder `src/app/sidebar/` with three files (the terminal lists them as `CREATE ...`):

```text
src/app/sidebar/sidebar.ts
src/app/sidebar/sidebar.html
src/app/sidebar/sidebar.css
```

Read it piece by piece:
- `ng generate component sidebar` creates a component named `sidebar`. The short form is `ng g c sidebar`.
- The class is named from the folder name: `sidebar` becomes `Sidebar`; the selector is `app-sidebar` (the prefix `app-` plus the name).
- `--skip-tests` stops Angular from creating a `sidebar.spec.ts` test file. You do not need it now.
- The new `sidebar.html` contains only `<p>sidebar works!</p>` and `sidebar.css` is empty. You fill them.

---

**4. Angular: each component owns its data**

When you move HTML into a component, you also move the properties and methods that the HTML uses into that component's class. The template can read only its own class.

```ts
// sidebar.ts: the sidebar's own data
export class Sidebar {
  topicsDone: number = 2;
}
```

```html
<!-- sidebar.html -->
<div>{{ topicsDone }} topics done</div>
<!-- Shows: 2 topics done -->
```

If `sidebar.html` uses `{{ topicsDone }}` but `topicsDone` is still only in `App`, the terminal shows an error. Today: the sidebar data moves to `Sidebar`, the header data moves to `Header`, and `App` keeps only what its own template uses.

---

**5. Angular: use a component in another one**

Two steps are needed in the parent (`app.ts`), and one in the template:

```ts
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
```

```html
<app-sidebar />
```

Read it piece by piece:
- `import { Sidebar } from './sidebar/sidebar';` makes the class available in `app.ts`. The path has no `.ts`.
- `imports: [Sidebar]` tells Angular that the template of `App` may use `<app-sidebar>`.
- `<app-sidebar />` places the component. The tag closes itself with `/>` because it has no content inside.

If you skip the `imports` entry, the terminal shows an error that `'app-sidebar' is not a known element`. If you add it to `imports` but never use the tag, you get a warning that the component is not used.

---

**6. Angular: scoped CSS**

CSS written in a component's `.css` file applies only to the elements in that component's own template. Angular does this by adding a hidden attribute to those elements and to the selectors. This is called **scoped** (or encapsulated) CSS.

```css
/* header.css */
.header {
  background: white;
}
```

This rule changes only the `.header` element inside `header.html`. If another component had an element with class `header`, it would be unchanged. Two results for you:
- Rules for the sidebar move to `sidebar.css`, rules for the header move to `header.css`. A rule left in `app.css` does not reach them.
- `src/styles.css` is global and still applies everywhere: `.card` and `body` keep working. Custom properties such as `var(--side)` also work in every component, because they are defined on `:root`.

---

**7. HTML: `<nav>`**

`<nav>` marks a group of links used to move around the app. It shows nothing by itself. Browsers and screen readers use it to find the navigation. You can name it with the attribute `aria-label`, which is text for screen readers (it does not appear on screen).

```html
<nav>
  <a>My Learning</a>
  <a>Topics</a>
</nav>
```

An `<a>` without an `href` attribute is not a real link yet: it is not underlined, is not clickable and the mouse pointer stays an arrow. The seven sidebar links are such placeholders until routing (a later day).

---

**8. CSS: `:hover`**

A **pseudo-class** is a word after a colon that selects an element only in a certain state. `:hover` means "while the mouse pointer is over the element".

```css
.sidebar a:hover {
  background: var(--side-active);
  color: white;
}
/* Pointer over a link: the link gets the teal background and white text.
   Pointer leaves: it goes back. */
```

The rule has two parts: the normal selector `.sidebar a` (every `<a>` inside an element with class `sidebar`), then `:hover`.

---

**9. CSS: `transition`**

Without a transition a change happens instantly. `transition` makes the change happen gradually.

```css
.sidebar a {
  transition: background 0.15s;
}
```

Read it piece by piece:
- `background` is the property that should change gradually. Other properties still change instantly.
- `0.15s` is the duration: 0.15 seconds.
- Write `transition` on the normal rule (`.sidebar a`), not on the `:hover` rule. Then the change is gradual in both directions: on enter and on leave.

---

**10. CSS: the active link**

A link for the current page gets the class `active` (`<a class="active">My Learning</a>`). The rule `.sidebar a.active` gives it a teal background and bold white text. `a.active` means "an `<a>` that has the class `active`" (no space between `a` and `.active`). Its colors match the hover colors, so hovering it shows no visible change.

---

**11. CSS: `min-height: 100vh` on a nested element**

`vh` is a unit: 1vh is 1% of the browser window height, so `100vh` is the full window height. `min-height` sets the smallest height the element may have.

In Day 03 the `<aside>` was a direct child of `.shell` (a flex container), so it stretched to the full height automatically. Now the `<aside>` is inside `<app-sidebar>`: `<app-sidebar>` stretches, but the `<aside>` inside it only grows to fit its content. So the rule `.sidebar` gets `min-height: 100vh;` to keep the dark column full height and the footer at the bottom.

`<app-sidebar>` and `<app-header>` are tags the browser does not know, so it shows them as inline elements (Day 03, concept 10). Today the page looks correct anyway. Day 05 explains when you must add `display: block`.

---

**Common problems**
- `'app-sidebar' is not a known element`: you did not add `Sidebar` to `imports` in `app.ts`, or you did not write the import line.
- `Cannot find module './sidebar/sidebar'`: the folder or file name is wrong. It must be `src/app/sidebar/sidebar.ts`.
- `Property 'topicsDone' does not exist on type 'Sidebar'`: the template uses data that is still in `App`. Move the property to `sidebar.ts`.
- The sidebar looks unstyled: the CSS rules are still in `app.css`. Scoped CSS means they must be in `sidebar.css`.
- The footer is not at the bottom: `min-height: 100vh` is missing in `.sidebar` in `sidebar.css`.
- A warning that says the `Header` import is not used in the template of `App`: you imported it but did not write `<app-header />` yet.

**Recap**
- A component = class + template + CSS, created with `ng generate component name --skip-tests`.
- `@Component` settings: `selector`, `imports`, `templateUrl`, `styleUrl`.
- To use a component: import line, `imports` entry, tag in the template.
- Component CSS is scoped to its own template; `styles.css` is global.
- `:hover` styles the hover state; `transition` makes the change gradual.
- `<nav>` groups the navigation links.

**Next:** open `requirements.md` for today's project and challenges.

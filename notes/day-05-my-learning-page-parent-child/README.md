# Day 5: My Learning page: parent and child components

**Project today:** split the page into four new components and show three track cards in a grid (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **Angular:** a parent component uses a child component by writing its selector as a tag; each component lists the components it uses in its own `imports`.
- **HTML:** `<section>`, `<h3>`, `<button>`.
- **CSS:** `display: block` versus inline, `margin-bottom`, `display: grid` with `grid-template-columns: repeat(3, 1fr)` and `gap`, `cursor`, `:hover`.

Keep `ng serve` running in your terminal. The browser reloads when you save a file.

---

**1. Angular: parent and child components**

A **component** is one part of the screen: a TypeScript class plus an HTML file plus a CSS file. A component can show another component inside its own HTML. The component that shows the other one is the **parent**. The one that is shown is the **child**. You show a child by writing its **selector** (its tag name) in the parent's HTML.

```html
<!-- my-learning.html (parent) -->
<app-today-build />
<app-welcome-card />
```

Read it piece by piece:
- `app-today-build` is the selector of the child component `TodayBuild`. It is written like an HTML tag.
- `/>` closes the tag at once, because the child has no content written between the tags.
- When the browser page is built, Angular replaces each tag with the child's own HTML.

Today the tree of components is:

```
App
 ├─ Sidebar
 ├─ Header
 └─ MyLearning
     ├─ TodayBuild
     ├─ WelcomeCard
     └─ TrackCards
```

`App` is the parent of `Sidebar`, `Header` and `MyLearning`. `MyLearning` is the parent of the other three. One component can be both a child and a parent.

---

**2. Angular: generate four components**

`ng generate component NAME --skip-tests` creates a folder `src/app/NAME/` with three files: `NAME.ts`, `NAME.html`, `NAME.css`. `--skip-tests` stops the CLI from also creating a `.spec.ts` test file we do not use. `ng g c` is the short form of `ng generate component`.

```
ng generate component my-learning --skip-tests
# CREATE src/app/my-learning/my-learning.css
# CREATE src/app/my-learning/my-learning.ts
# CREATE src/app/my-learning/my-learning.html
```

The name `my-learning` (words joined with `-`) gives the class `MyLearning` and the selector `app-my-learning`. A new component starts with this HTML: `<p>my-learning works!</p>`. You replace it.

---

**3. Angular: each component has its own `imports`**

Writing `<app-today-build />` is not enough. Angular only knows a tag if the parent's `imports` list contains the child's class. Every component has its own `imports`; it does not use the list of its parent.

```ts
import { Component } from '@angular/core';
import { TodayBuild } from '../today-build/today-build';
import { WelcomeCard } from '../welcome-card/welcome-card';
import { TrackCards } from '../track-cards/track-cards';

@Component({
  selector: 'app-my-learning',
  imports: [TodayBuild, WelcomeCard, TrackCards],
  templateUrl: './my-learning.html',
  styleUrl: './my-learning.css'
})
export class MyLearning {
}
```

Read it piece by piece:
- `import { TodayBuild } from '../today-build/today-build';` brings the class into this file. `..` means "go up one folder, from `my-learning/` to `app/`". Then `today-build/today-build` is the folder and the file (without `.ts`).
- `imports: [TodayBuild, WelcomeCard, TrackCards]` tells Angular: "my template may use the tags of these three components". The second and third import lines follow the same pattern as the first.

Two errors you will see if you forget:
- Tag written, class not in `imports`: `NG8001: 'app-today-build' is not a known element`.
- Class in `imports`, tag never written: a warning that the component "is not used within the template".

---

**4. Angular: moving code to a new component**

Yesterday the banner lived in `App`. Today it moves. When you move a piece of the screen, three things move with it:
1. its HTML goes into the new component's `.html`;
2. the properties that the HTML uses go into the new component's `.ts` class;
3. the CSS rules for that HTML go into the new component's `.css`.

CSS written in a component's `.css` file only affects that component's own HTML. This is called **scoped** CSS (Day 4). So the `.build` rules must move to `today-build.css`, or the banner loses its style.

CSS from `src/styles.css` is global. It applies everywhere, so the `.card` rule works inside `WelcomeCard` without being copied.

---

**5. HTML: `<section>`, `<h3>`, `<button>`**

- `<section>` groups content that belongs together (a card, a block with a heading). It looks like a `div` on screen. Its name tells readers what it is.
- `<h3>` is a heading of level 3 (`<h1>` is the biggest). Use it for a heading inside a section.
- `<button>` is a clickable button. Its text goes between the tags.

```html
<section>
  <h3>Angular</h3>
  <button>View topics</button>
</section>
```

On screen: a bold heading `Angular` and a button with the text `View topics` below it. A button does nothing yet. Clicks start on Day 8.

---

**6. CSS: why component tags need `display: block`**

`display` is a CSS property that decides how an element takes space. Two values matter now:
- `inline`: the element flows inside a line of text, next to other text. Width and top/bottom margin have no effect on it.
- `block`: the element starts on a new line and takes the full width. Top/bottom margin works.

`<p>` and `<div>` are `block` by default. A tag you invent, like `<app-today-build>`, is `inline` by default. So spacing between two component tags does nothing, until you write:

```css
app-today-build {
  display: block;
  margin-bottom: 16px;
}
```

Read it piece by piece:
- `app-today-build` is an **element selector**: it styles every `<app-today-build>` tag.
- `display: block;` makes it a block.
- `margin-bottom: 16px;` adds 16 pixels of empty space below it.

To give the same rule to several tags, write a **selector list**: selectors separated by commas, then one `{ }`:

```css
app-today-build,
app-welcome-card,
app-track-cards {
  display: block;
  margin-bottom: 16px;
}
```

This rule is in `my-learning.css`, not in the children's CSS. The tags are written in the HTML of `MyLearning`, so the CSS of `MyLearning` styles them.

---

**7. CSS: grid**

`display: grid` puts the children of an element in rows and columns.

```html
<div class="row">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

```css
.row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
/* Result: 1, 2 and 3 side by side, three equal columns, 16px between them. */
```

Read it piece by piece:
- `.row` is a **class selector**: it styles every element that has `class="row"`.
- `display: grid;` turns on the grid for the children of `.row`.
- `grid-template-columns` lists the width of each column.
- `1fr` means "one share of the free width". `repeat(3, 1fr)` is the short form of `1fr 1fr 1fr`: three columns, each one share, so all three have the same width.
- `gap: 16px;` is the empty space between rows and between columns.

A fourth child would start a second row, in the first column. By default, the cards in one row get the same height.

---

**8. CSS: spacing inside a card and the `margin` shorthand**

- `padding: 16px;` is space **inside** the border, between the border and the content.
- `margin` is space **outside** the border.
- `margin: 0 0 8px;` sets three values: top `0`, left and right `0`, bottom `8px`.

```css
.track h3 {
  margin: 0 0 8px;
}
/* An h3 inside .track: no space above, 8px of space below. */
```

`.track h3` is a **descendant selector**: an `h3` that is somewhere inside an element with class `track`. An `h3` outside a `.track` is not changed.

---

**9. CSS: `cursor` and `:hover`**

`cursor: pointer;` shows the hand icon when the mouse is over the element. It tells the user "you can click here".

`:hover` is a **pseudo-class**: it selects an element only while the mouse is over it.

```css
.track button:hover {
  filter: brightness(0.9);
}
/* While the mouse is on a button: it becomes 10% darker. */
```

`filter: brightness(0.9)` multiplies the brightness by 0.9. `1` is the normal brightness.

---

**Common problems**
- Tag written but nothing imported: `NG8001 ... is not a known element`. Add the class to that component's `imports` and add the `import` line.
- You import the child in `App` but use it in `MyLearning`: the list that counts is the one of the component whose HTML has the tag.
- The cards touch each other: `display: block` or `margin-bottom` is missing for the component tags.
- The banner has no mint background: `.build` rules are still in `app.css`. Move them to `today-build.css`.
- Wrong import path: from `my-learning/my-learning.ts` the path to a sibling folder starts with `../`.

**Recap**
- A parent shows a child with the child's selector as a tag.
- Every component lists the children it uses in its own `imports`.
- `ng generate component NAME --skip-tests` creates the folder and three files.
- Component tags are `inline` by default; use `display: block` to give them margins.
- `display: grid` with `grid-template-columns: repeat(3, 1fr)` and `gap` makes three equal columns.
- `cursor: pointer` and `:hover` tell the user an element is clickable.

**Next:** open `requirements.md` for today's project and challenges.

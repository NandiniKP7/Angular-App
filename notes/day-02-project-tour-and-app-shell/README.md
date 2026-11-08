# Day 02: Project Tour and App Shell

**Project today:** the LearnBuddy app shell: sidebar, header and page area (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
**Angular**
- What each file and folder of the project is for
- How `<app-root>` in `index.html` becomes your `App` component

**HTML**
- Semantic elements `aside`, `nav`, `header`, `main`; the elements `a` and `span`; classes

**CSS**
- The box model (`margin`, `padding`, `border`), `box-sizing`, `display`, flexbox (`flex`, `justify-content`, `align-items`, `gap`), `width`, `min-height`, `vh`, `border-radius`, hex colors

Keep `ng serve` running from Day 01. Words used here without explanation were defined in the Day 01 README.

---

**1. Angular: the project tour**

Open your `learnbuddy` folder in the editor. These are the files and folders you will meet:

| Path | What it is |
|---|---|
| `package.json` | Project name, **scripts** (named commands, for example `start` runs `ng serve`) and **dependencies** (the packages the project uses) |
| `angular.json` | Settings for the CLI: the folder `src`, the start file `src/main.ts`, the global style file `src/styles.css` |
| `tsconfig.json` | Settings for the TypeScript compiler |
| `node_modules/` | The downloaded packages. Very large. Never edit it. `npm install` can recreate it |
| `public/` | Files copied to the site as they are (for example the tab icon `favicon.ico`) |
| `src/index.html` | The one HTML page the browser loads |
| `src/main.ts` | The start-up file |
| `src/styles.css` | Global CSS |
| `src/app/app.ts`, `app.html`, `app.css` | The `App` component |
| `src/app/app.config.ts`, `app.routes.ts` | App-wide settings and the list of pages (routes). Not used in Days 01-10 |

Only the files in `src/app` and `src/styles.css` change in this course until Day 06 adds files to `public/`.

---

**2. Angular: how `<app-root>` becomes your screen**

`src/index.html` is short. The important line is the tag in `<body>`:

```html
<body>
  <app-root></app-root>
</body>
```

`<app-root>` is not an HTML element that browsers know. It is the **selector** of your component. The chain is:

1. The browser loads `index.html` and the JavaScript that Angular built.
2. `src/main.ts` starts the app with `bootstrapApplication(App, appConfig)`. This tells Angular: the main component is `App`.
3. `App` is declared with `selector: 'app-root'` (in `app.ts`).
4. Angular finds `<app-root>` in the page and puts the content of `app.html` inside it.

You can see the result in the browser: press `F12`, open the Elements tab, and find `<app-root>` with your `<div class="shell">` inside it. Also note `<title>` in `index.html`: it is the text on the browser tab.

---

**3. HTML: semantic elements**

`div` has no meaning. **Semantic** elements do the same job (they group things) but their name says what the group is. Browsers and screen readers (programs that read a page aloud) use this meaning.

| Element | Meaning |
|---|---|
| `<aside>` | Side content, here the sidebar |
| `<nav>` | A group of navigation links |
| `<header>` | The top part of a page or section |
| `<main>` | The main content. Use it once per page |

```html
<aside>
  <nav>
    <a>One</a>
  </nav>
</aside>
```

All four are block elements, like `div`, and have no visual style by themselves. CSS gives them the look.

---

**4. HTML: `a`, `span` and classes**

`<a>` is the **anchor** element: a link. A link has an `href` attribute with the address. In this course the sidebar links are **placeholders**: plain `<a>` without `href`, so they do nothing when clicked and browsers show them as plain text, not blue and underlined. They become real links when routing is added later.

`<span>` is a plain container for a piece of text **inside a line**. It is an **inline** element: it does not start a new line and is only as wide as its text.

```html
<p>Today is <span>Friday</span>.</p>
<!-- one line: Today is Friday. -->
```

A **class** is a name you give to an element so CSS can find it. An element can have the same class as other elements, so one rule styles them all:

```html
<a class="active">My Learning</a>
<a>Topics</a>
```

Here only the first `a` has the class `active`. Use only letters, digits and `-` in class names.

---

**5. CSS: selectors for classes and nesting**

You know `.landing` and `.landing p` from Day 01. Today adds three forms:

```css
.sidebar a { }          /* an a inside an element with class sidebar */
.sidebar a.active { }   /* an a with class active inside .sidebar (no space between a and .active) */
.header h2 { }          /* an h2 inside an element with class header */
```

`a.active` (no space) means: an `a` element **that also has** the class `active`. `a .active` (with a space) would mean something else: an element with class `active` inside an `a`. A space matters in selectors.

When two rules set the same property on the same element, the rule with the more specific selector wins. `.sidebar a.active` is more specific than `.sidebar a`, so the active link can change the background of the links.

---

**6. CSS: the box model**

Every element is a rectangular box with four layers, from inside to outside:

1. **content**: the text or child elements
2. **padding**: space inside the box, around the content
3. **border**: a line around the padding
4. **margin**: space outside the border, between this box and its neighbours

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid #dfe6ea;   /* thickness, style, color */
  margin: 10px;
}
```

Shorthand: `padding` and `margin` accept 1 to 4 values:

| Written | Meaning |
|---|---|
| `padding: 20px` | all four sides |
| `padding: 22px 14px` | top and bottom 22px, left and right 14px |
| `padding: 2px 8px 18px` | top 2px, left and right 8px, bottom 18px |
| `padding: 0 8px` | top and bottom 0, left and right 8px |

You can set one side only: `margin-bottom: 6px;`, `border-bottom: 1px solid #dfe6ea;`.

**`box-sizing`.** By default `width: 200px` is the width of the **content only**. The box above is then 200 + 20 + 20 (padding) + 2 + 2 (border) = 244px wide. With `box-sizing: border-box;` the `width` includes padding and border: the box stays 200px wide and the content becomes 156px. Today's sidebar uses it so `width: 230px` means 230px on screen.

---

**7. CSS: `display`, block and inline**

`display` sets how an element takes space.

| Value | Behaviour |
|---|---|
| `block` | Starts on a new line, takes the full width, accepts `width`, `padding`, `margin` on all sides |
| `inline` | Stays in the line of text, only as wide as its text; vertical `padding` and `margin` do not push other lines apart |
| `flex` | The element becomes a **flex container** (concept 8) |

`a` and `span` are inline by default. Today's rule `.sidebar a { display: block; }` turns each link into a full-width block, so each link sits on its own line and its `padding` and `margin-bottom` work.

---

**8. CSS: flexbox**

**Flexbox** places the children of an element in a row or a column. Write `display: flex` on the **parent** (the flex container). Its children are **flex items**.

```html
<div class="row">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>
```

```css
.row { display: flex; }
/* A, B and C now sit side by side, left to right (a row) */
```

Properties on the container:

| Property | Effect |
|---|---|
| `flex-direction: column` | Items stack top to bottom instead of left to right (default is `row`) |
| `justify-content: space-between` | Along the row: the first item at the left end, the last at the right end, the rest spread between |
| `align-items: center` | Across the row: items are centered vertically (default is `stretch`: items are as tall as the container) |
| `gap: 12px` | Space between items. Today's code does not need it; Day 05 uses it |

Properties on an item:

| Property | Effect |
|---|---|
| `flex: 1` | The item grows to fill all free space in the row |
| `flex: none` | The item keeps its own size: it neither grows nor shrinks |

Today's shell: the sidebar has `width: 230px` and `flex: none` (always 230px). The content area has `flex: 1` (takes the rest of the window width). `min-height: 100vh` on the container makes it as tall as the window; because `align-items` is `stretch`, both children are as tall as the container.

---

**9. CSS: colors, text and rounded corners**

```css
.pill {
  background: #235c5d;       /* hex color */
  color: white;
  font-size: 14px;           /* text size */
  font-weight: bold;         /* bold text */
  border-radius: 10px;       /* rounded corners; larger = rounder */
}
```

- Hex colors were explained on Day 01. Today's colors: `#0e3441` (sidebar), `#235c5d` (active link), `#f6f8f8` (page background), `#dfe6ea` (line), `#66788a` (muted text).
- `border-bottom: 1px solid #dfe6ea;` draws a 1px line under an element.
- `margin: 0` on `h2` removes the heading's default margins, so the header height comes from its `padding`.

---

**Common problems**
- All sidebar links appear on one line: `display: block` is missing in `.sidebar a`.
- The sidebar is as narrow as its text, or shrinks: `width: 230px` or `flex: none` is missing.
- The content area does not fill the window width: `flex: 1` is missing in `.content`, or `display: flex` is missing in `.shell`.
- The active link looks like the others: the class is missing in the HTML, or `.sidebar a.active` has a space (`.sidebar a .active`).
- The sidebar does not reach the bottom: `min-height: 100vh` is missing in `.shell`.

---

**Recap**
- `index.html` contains `<app-root>`; `main.ts` starts `App`; `App`'s selector is `app-root`.
- `aside`, `nav`, `header`, `main` are semantic block elements. `a` and `span` are inline.
- The box model: content, padding, border, margin; `box-sizing: border-box` makes `width` include padding and border.
- `display: flex` on a parent lays children in a row; `flex: 1` grows, `flex: none` keeps size.
- `display: block` on `a` makes each link a full-width block.

**Next:** open `requirements.md` for today's project and challenges.

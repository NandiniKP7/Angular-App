# Day 02: Project Tour and App Shell: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## Today's project
A two-column app shell: sidebar (230px) on the left, content with header and page area on the right (see `ui.svg` and `ui-breakdown.md`). `ng serve` must be running.

## Build it, step by step

### Step 1: Tour the project
**Do this:** open `package.json`, `angular.json`, `src/index.html`, `src/main.ts` and `src/app/app.ts`. In `index.html` find `<app-root></app-root>`. In `main.ts` find `bootstrapApplication(App, appConfig)`. In `app.ts` find `selector: 'app-root'`.
**You should see:** the same name `app-root` in `index.html` and `app.ts`. In the browser (`F12`, Elements), `<app-root>` contains your Day 01 `<div class="landing">`.
**Why:** this is how the `App` component reaches the page.

### Step 2: The HTML
Replace all of `src/app/app.html` with:
```html
<div class="shell">
  <aside class="sidebar">
    <div class="brand">❖ LearnBuddy</div>
    <div class="tagline">Learn · Practice · Improve</div>
    <nav>
      <a class="active">My Learning</a>
      <a>Roadmap Calendar</a>
      <a>Topics</a>
      <a>Practice</a>
      <a>Mistakes</a>
      <a>Progress</a>
      <a>My Diary</a>
    </nav>
  </aside>
  <div class="content">
    <header class="header">
      <h2>My Learning</h2>
      <span>Friday</span>
    </header>
    <main class="page">
      <h1>Welcome to LearnBuddy</h1>
      <p>Learn Angular and TypeScript by building real features.</p>
    </main>
  </div>
</div>
```
**You should see:** the old `app.css` rules do not match any element, so the page is white with black Arial text, from top to bottom: `❖ LearnBuddy`, `Learn · Practice · Improve`, then all seven link texts on ONE line (links are inline), then `My Learning` (bold), `Friday`, `Welcome to LearnBuddy` (large bold) and the sentence.
**Why:** this is HTML with no CSS. The structure exists; the look comes next.

### Step 3: Layout rules
Replace all of `src/app/app.css` with:
```css
.shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 230px;
  flex: none;
  box-sizing: border-box;
  background: #0e3441;
  color: #cfe3e6;
  padding: 22px 14px;
}

.content {
  flex: 1;
  background: #f6f8f8;
}
```
**You should see:** a dark teal column 230px wide at the left, full window height, with pale text inside (brand, tagline and links still look like plain text, links on one line, wrapping inside the column). To the right, a light grey area with the header texts and the welcome text in black.
**Why:** `display: flex` on `.shell` puts the two children side by side; `flex: none` and `width` fix the sidebar; `flex: 1` makes the content fill the rest.

### Step 4: Style the sidebar content
Add below the existing rules:
```css
.brand {
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 0 8px;
}

.tagline {
  color: #bcd6da;
  font-size: 12px;
  padding: 2px 8px 18px;
}

.sidebar a {
  display: block;
  padding: 11px 14px;
  margin-bottom: 6px;
  border-radius: 10px;
  font-size: 14px;
}

.sidebar a.active {
  background: #235c5d;
  color: white;
  font-weight: bold;
}
```
**You should see:** a white bold brand, a small pale tagline, and seven links, each on its own line with space around it. `My Learning` has a rounded `#235c5d` background with white bold text.
**Why:** `display: block` gives every link its own line so `padding` and `margin-bottom` work. `.sidebar a.active` is more specific than `.sidebar a`, so it can set the background.

### Step 5: Style the header and page
Add below the existing rules:
```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-bottom: 1px solid #dfe6ea;
  padding: 16px 26px;
}

.header h2 {
  margin: 0;
  font-size: 20px;
}

.header span {
  color: #66788a;
  font-size: 13px;
}

.page {
  padding: 24px 26px;
}
```
**You should see:** a white bar at the top of the grey area, with `My Learning` at its left end and grey `Friday` at its right end, a thin line under the bar. The welcome heading and sentence are inset 26px from the left and 24px from the top of the page area.
**Why:** `justify-content: space-between` pushes the two header children to opposite ends; `align-items: center` centers them vertically.

### Step 6: Look at the boxes
**Do this:** press `F12`, open Elements, click one `<a>` in the sidebar. In the Computed tab (or the Styles pane) find the box diagram: content, padding (11px 14px), margin (bottom 6px). Select `<aside>` and read its width: 230.
**Why:** this is the box model from the README.

## Check yourself
- [ ] The screen matches `ui.svg`: two columns, full window height, header with `My Learning` and `Friday` at opposite ends.
- [ ] `app.html` and `app.css` match the code above exactly. `styles.css` and `app.ts` are unchanged.
- [ ] No errors or warnings in the terminal and the browser console.

## Recap
- `<app-root>` in `index.html` is replaced by the content of `app.html`.
- `display: flex` + `flex: none` + `flex: 1` makes a fixed sidebar and a flexible content area.
- `display: block` on `a` makes full-width link rows; padding and margin set the spacing.

## If something breaks
- **Links on one line.** `display: block;` is missing in `.sidebar a`, or the selector is misspelled.
- **Sidebar too narrow or squeezed.** `width: 230px;` or `flex: none;` is missing.
- **Content does not fill the right side.** `flex: 1;` missing in `.content`, or `display: flex;` missing in `.shell`.
- **Columns do not reach the bottom.** `min-height: 100vh;` missing in `.shell`.
- **`My Learning` not highlighted.** `class="active"` missing in the HTML, or the selector has a space (`.sidebar a .active`).
- **`Friday` right under the title instead of at the right end.** `display: flex;` or `justify-content: space-between;` missing in `.header`.
- **Nothing is styled.** `app.css` has a missing `}` or `;` in an earlier rule: look at where the styling stops.

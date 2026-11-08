# Day 04 Practical Requirements: Sidebar and Header Components

**Time:** 30 minutes. **Core:** the project and Challenges 1-2. Challenges 3-4 are stretch: do them only if you have time left.

## Before you start
Open your `learnbuddy` project as you left it on Day 03, with `ng serve` running. Take a screenshot or note how the page looks: it must look the same after the project.
- Everything is in `App`: `app.ts` has 8 properties (`appName`, `tagline`, `pageTitle`, `weekday`, `topicNo`, `topicTitle`, `topicsDone`, `topicsTotal`) and the method `percentDone()`.
- `app.html` contains the sidebar `<aside>`, the header and the `<main>` content. `app.css` contains all rules.
- `src/styles.css` has `:root` (nine colors), `body` and `.card`. You do not change it today.
- Undo any Day 03 challenge changes before you start.

## Today's project: Sidebar and Header components
**What it does:** The page looks the same as on Day 03, but the sidebar and header are components. Hovering a sidebar link highlights it. Data and files are in the table in `ui-breakdown.md`.

**Requirements**
1. In a second terminal, in the `learnbuddy` folder, run `ng generate component sidebar --skip-tests` and `ng generate component header --skip-tests`. You must get the folders `src/app/sidebar/` and `src/app/header/`, each with `.ts`, `.html`, `.css` files.
2. **`sidebar/sidebar.ts`**: the class is `Sidebar` (selector `app-sidebar`). Add the properties `appName: string = 'LearnBuddy'`, `tagline: string = 'Learn · Practice · Improve'`, `topicsDone: number = 2`, `topicsTotal: number = 44` and the method `percentDone(): number` (same body as in `app.ts`).
3. **`sidebar/sidebar.html`**: replace the generated text with the whole `<aside class="sidebar"> ... </aside>` block cut from `app.html`, text unchanged (brand, tagline, nav with 7 links, footer).
4. **`sidebar/sidebar.css`**: the rules `.sidebar`, `.brand`, `.tagline`, `.sidebar a`, `.sidebar a.active`, `.side-footer`, `.side-footer strong`, cut from `app.css`, with these changes: add `min-height: 100vh;` to `.sidebar`; add `transition: background 0.15s;` to `.sidebar a`; add a new rule `.sidebar a:hover { background: var(--side-active); color: white; }` after `.sidebar a.active`.
5. **`header/header.ts`**: class `Header` (selector `app-header`) with `pageTitle: string = 'My Learning'` and `weekday: string = new Date().toLocaleDateString('en-US', { weekday: 'long' })`. **`header/header.html`**: the `<header class="header">` block cut from `app.html` (the `<h2>{{ pageTitle }}</h2>` and `<span>{{ weekday }}</span>` inside). **`header/header.css`**: the rules `.header`, `.header h2`, `.header span` cut from `app.css`, unchanged.
6. **`app.ts`**: add `import { Sidebar } from './sidebar/sidebar';` and `import { Header } from './header/header';`; set `imports: [Sidebar, Header]`. Remove all properties except `appName`, `topicNo` and `topicTitle`, and remove `percentDone()`. Set `topicNo` to `'03'` and `topicTitle` to `'Components'`.
7. **`app.html`**: inside `.shell`, replace the `<aside>` block with `<app-sidebar />`. Inside `.content`, replace the `<header>` block with `<app-header />`. The `<main class="page">` block stays unchanged.
8. **`app.css`**: keep only `.shell`, `.content`, `.page`, `.build`, `.build small`, `.build strong` (unchanged).

**Expected screen** (compare with `ui.svg`): identical to Day 03, except the banner reads `TODAY'S BUILD · TOPIC 03` and `Components`. When you move the mouse over a link in the sidebar (for example `Topics`), the link gets the teal background and white text within a fraction of a second. The sidebar is full window height and the footer `2 of 44 Angular topics done (5%)` is at the bottom.

**Check yourself**
- [ ] The folders `sidebar` and `header` exist in `src/app/`, each with three files.
- [ ] `app.css` has exactly six rules, and none starts with `.sidebar`, `.brand` or `.header`.
- [ ] Hover over `Topics`: the background changes. Hover over `My Learning`: it stays the same.
- [ ] Change `topicsDone` in `sidebar.ts` to `22`: the footer shows `22 of 44 ... (50%)`. Change it back to `2`.
- [ ] No errors in the terminal or in the browser console (F12, tab Console).

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`. Open a hint only after 10 minutes of trying.

## Challenges: extend the components
Challenges are added to the same files. Check the result in the browser.

## Challenge 1: One more link, and a named nav (HTML)
**Goal:** Practice `<nav>` and `<a>`; see that component CSS applies to new links.
**Requirements:**
1. In `sidebar.html`, add `<a>Settings</a>` after `<a>My Diary</a>`.
2. In `sidebar.html`, change `<nav>` to `<nav aria-label="Main navigation">`.

**Expected screen:** the sidebar shows 8 links; `Settings` looks like the others and highlights on hover. The `aria-label` is not visible; in the browser, press F12, tab Elements: the `nav` tag shows `aria-label="Main navigation"`.

<details><summary>Hint 1</summary>The link goes inside `<nav>`, as the last child. The attribute goes inside the opening `<nav>` tag only.</details>
<details><summary>Hint 2</summary>An attribute is written `name="value"` after the tag name.</details>
<details><summary>Hint 3</summary>`<nav aria-label="Main navigation">` ... `<a>Settings</a>` before `</nav>`.</details>

Undo this before tomorrow.

## Challenge 2: A slower, green hover (CSS)
**Goal:** Change `:hover` and `transition` values.
**Requirements:** in `sidebar.css`:
1. In `.sidebar a:hover` set `background` to `var(--green)`.
2. In `.sidebar a` set `transition` to `background 0.4s`.
3. In `.sidebar a` add `cursor: pointer;`.

**Expected screen:** hovering a link turns it green in about 0.4 seconds, and the mouse pointer becomes a hand over every link.

<details><summary>Hint 1</summary>All three edits are in `sidebar.css`, none in `app.css`.</details>
<details><summary>Hint 2</summary>Two edits change an existing value; one adds a new declaration to `.sidebar a`.</details>
<details><summary>Hint 3</summary>`.sidebar a:hover { background: var(--green); ... }` and `.sidebar a { ... transition: background 0.4s; cursor: pointer; }`</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Prove that CSS is scoped
**Goal:** See scoped CSS with your own eyes.
**Requirements:**
1. Add this rule at the end of `app.css`: `.header { background: #ffe8e8; }`. Save and look at the header.
2. Cut that rule from `app.css` and paste it at the end of `header.css`. Save and look again.

**Expected screen:** after step 1 the header stays white (the rule in `app.css` does not reach inside `Header`). After step 2 the header background is light pink. (The rule in `header.css` comes later in the file than the existing `.header` rule, so its background wins.)

<details><summary>Hint 1</summary>The header element belongs to the template of `Header`, not to the template of `App`.</details>
<details><summary>Hint 2</summary>Scoped CSS only applies to elements in the template of the same component.</details>
<details><summary>Hint 3</summary>The same rule text works in `header.css`; only the file changes.</details>

Undo this before tomorrow (remove the rule).

## Challenge 4 (stretch): New data in each component
**Goal:** Practice data that belongs to one component.
**Requirements:**
1. In `sidebar.ts` change `topicsDone` to `11`.
2. In `header.ts` add `greeting: string = 'Good to see you'`. In `header.html` change the span to `<span>{{ greeting }}, {{ weekday }}</span>`.

**Expected screen:** the footer shows `11 of 44 Angular topics done (25%)`. The header's right side shows `Good to see you, ` and today's weekday (for example `Good to see you, Friday`). The banner is unchanged.

<details><summary>Hint 1</summary>One change in `Sidebar`, one in `Header`; `App` does not change.</details>
<details><summary>Hint 2</summary>A new property needs a name, a type and a value. Then `{{ }}` in the template.</details>
<details><summary>Hint 3</summary>`greeting: string = 'Good to see you';` in the class and `{{ greeting }}, {{ weekday }}` in the span.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.

# Day 02 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2. Challenges 3-4 are stretch: do them if you have time left.

## Before you start
Open your `learnbuddy` project as you left it on Day 01, with `ng serve` running:
- `src/styles.css` has the `body` rule (`margin: 0;` and `font-family: Arial, sans-serif;`).
- `src/app/app.html` has `<div class="landing">` with the `h1` and `p`; `src/app/app.css` has the `.landing` and `.landing p` rules.
- `src/app/app.ts` is the cleaned class `App` (no `RouterOutlet`, no `title`).
- No Challenge code from Day 01 is left in the files.

Today you replace the whole content of `app.html` and `app.css`. `styles.css` and `app.ts` stay as they are.

## Today's project: the app shell
**What it does:** the page shows a dark sidebar on the left (230px wide) with the brand, the tagline and seven links, and a content area on the right with a white header (`My Learning` and `Friday`) and a welcome heading. All texts and colors are in the tables of `ui-breakdown.md`. The picture is `ui.svg`.

**Requirements**

1. **Tour (no code).** Open and read each of these: `package.json`, `angular.json`, `src/index.html`, `src/main.ts`, `src/app/app.ts`. Then write down, for yourself, the answer to: which tag in `index.html` matches the `selector` in `app.ts`? (Answer: `<app-root>` and `'app-root'`.) In the browser (`F12`, Elements tab) find `<app-root>` and the `div` inside it.
2. **`src/app/app.html`.** Replace all content with this structure (indent each child by 2 spaces; every element closes):

   ```
   div.shell
     aside.sidebar
       div.brand            text: ❖ LearnBuddy
       div.tagline          text: Learn · Practice · Improve
       nav
         a.active           text: My Learning
         a                  text: Roadmap Calendar
         a                  text: Topics
         a                  text: Practice
         a                  text: Mistakes
         a                  text: Progress
         a                  text: My Diary
     div.content
       header.header
         h2                 text: My Learning
         span               text: Friday
       main.page
         h1                 text: Welcome to LearnBuddy
         p                  text: Learn Angular and TypeScript by building real features.
   ```

   `div.shell` means `<div class="shell">`, `a.active` means `<a class="active">`, and so on. The seven links have no `href`.
3. **`src/app/app.css`.** Replace all content with exactly these 11 rules, in this order. The declarations of each rule are in this order too:

   | Selector | Declarations |
   |---|---|
   | `.shell` | `display: flex;` `min-height: 100vh;` |
   | `.sidebar` | `width: 230px;` `flex: none;` `box-sizing: border-box;` `background: #0e3441;` `color: #cfe3e6;` `padding: 22px 14px;` |
   | `.brand` | `color: white;` `font-size: 20px;` `font-weight: bold;` `padding: 0 8px;` |
   | `.tagline` | `color: #bcd6da;` `font-size: 12px;` `padding: 2px 8px 18px;` |
   | `.sidebar a` | `display: block;` `padding: 11px 14px;` `margin-bottom: 6px;` `border-radius: 10px;` `font-size: 14px;` |
   | `.sidebar a.active` | `background: #235c5d;` `color: white;` `font-weight: bold;` |
   | `.content` | `flex: 1;` `background: #f6f8f8;` |
   | `.header` | `display: flex;` `justify-content: space-between;` `align-items: center;` `background: white;` `border-bottom: 1px solid #dfe6ea;` `padding: 16px 26px;` |
   | `.header h2` | `margin: 0;` `font-size: 20px;` |
   | `.header span` | `color: #66788a;` `font-size: 13px;` |
   | `.page` | `padding: 24px 26px;` |

4. **Nothing else changes.** `styles.css` and `app.ts` are not edited today.
5. **No messages.** The terminal running `ng serve` shows no error and no warning.

**Expected screen:** the window is split into two columns. Left: a dark teal (`#0e3441`) column exactly 230px wide and as tall as the window. It shows the white bold `❖ LearnBuddy`, the small pale `Learn · Practice · Improve`, then seven link rows, each on its own line. `My Learning` has a green-teal (`#235c5d`) rounded background and white bold text; the other six are plain pale text. Right: a light grey (`#f6f8f8`) area that fills the rest of the width. At its top, a white bar with a thin line under it: `My Learning` at the left end and the small grey `Friday` at the right end, vertically centered. Below the bar: the large bold `Welcome to LearnBuddy` and the line `Learn Angular and TypeScript by building real features.`. The picture is `ui.svg`.

**Check yourself**
- [ ] The sidebar is 230px wide: in `F12` Elements, select `aside` and read the size in the Computed tab (or hover it).
- [ ] The two columns reach the bottom of the window; resize the window taller and they still do.
- [ ] Each link is on its own line; only `My Learning` is highlighted.
- [ ] `My Learning` and `Friday` are on the same line, at opposite ends of the white bar.
- [ ] No errors or warnings in the terminal or in the browser console.

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend the app shell
Challenges change `app.html` and `app.css` from the project above. Each one ends with an undo, so tomorrow starts from the exact Day 02 state.

## Challenge 1: an eighth link (HTML)
**Goal:** see that one class styles every element that has it.

**Requirements**
1. In `app.html`, add a new `<a>` with the text `Settings` as the last child of `<nav>` (after `My Diary`). No class, no `href`.

**Expected:** an eighth row `Settings` below `My Diary`, with exactly the same size, spacing and text color as `Roadmap Calendar`. It is not highlighted. You wrote no new CSS.

<details><summary>Hint 1</summary>The CSS rule `.sidebar a` already matches every `a` inside the sidebar.</details>
<details><summary>Hint 2</summary>The new element goes inside `nav`, after the last `a`, with its own closing tag.</details>
<details><summary>Hint 3</summary>`<a>Settings</a>` on the line after `<a>My Diary</a>`.</details>

Undo this before tomorrow.

## Challenge 2: a wider sidebar with a left border (CSS)
**Goal:** see how width and border change the boxes.

**Requirements**
1. In `app.css`, in the `.sidebar` rule, change `width` from `230px` to `260px`.
2. In the `.sidebar a.active` rule, add `border-left: 4px solid #15965f;`.

**Expected:** the sidebar is 260px wide, and the right area is 30px narrower (it uses `flex: 1`). The `My Learning` row has a 4px green line on its left edge, and its text starts 4px further right than the text of the other links (the border takes 4px inside the link's box).

<details><summary>Hint 1</summary>Both changes are inside rules that already exist. Do not create new rules.</details>
<details><summary>Hint 2</summary>The border shorthand is `thickness style color`.</details>
<details><summary>Hint 3</summary>`width: 260px;` and `border-left: 4px solid #15965f;`</details>

Undo this before tomorrow.

## Challenge 3 (stretch): stack the layout (CSS)
**Goal:** see what the flex direction controls.

**Requirements**
1. In the `.shell` rule, add `flex-direction: column;` and `gap: 20px;`.

**Expected:** the sidebar is now on top: a dark block 230px wide at the left edge, as tall as its content (not as tall as the window). Under it is a 20px white gap, then the content area, which spans the full window width and fills the remaining height. Header and page keep their look.

<details><summary>Hint 1</summary>The container decides the direction in which its children are placed.</details>
<details><summary>Hint 2</summary>Two new declarations in `.shell`. The sidebar keeps its 230px width because `width` is set; the content becomes full width because items are stretched across the container.</details>
<details><summary>Hint 3</summary>`flex-direction: column;` and `gap: 20px;` inside `.shell { }`.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): a real link and a style fix (HTML + CSS)
**Goal:** see why the sidebar links are placeholders without `href`.

**Requirements**
1. In `app.html`, change `<a>Topics</a>` to `<a href="#">Topics</a>`. Look at the screen before you do step 2.
2. In `app.css`, add to the `.sidebar a` rule: `color: inherit;` and `text-decoration: none;`.

**Expected:** after step 1, `Topics` is underlined and blue (the browser's default link style), and the mouse pointer becomes a hand over it. After step 2, `Topics` looks exactly like `Roadmap Calendar` again (pale `#cfe3e6`, no underline). The hand pointer remains. All other links look the same in both steps.

<details><summary>Hint 1</summary>An `a` with an `href` gets default browser styles for color and underline. CSS can switch both off.</details>
<details><summary>Hint 2</summary>`color: inherit` means "use the parent's color". `text-decoration` controls the underline.</details>
<details><summary>Hint 3</summary>Add `color: inherit;` and `text-decoration: none;` anywhere inside the `.sidebar a { }` rule.</details>

Undo this before tomorrow (remove `href="#"` and the two declarations).

When you finish: paste your files here for review.

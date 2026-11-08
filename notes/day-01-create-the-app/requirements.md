# Day 01 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2. Challenges 3-4 are stretch: do them if you have time left.
(`ng new` downloads packages and can take a few extra minutes. That waiting time is not counted.)

## Before you start
Nothing exists yet. You need: a terminal, a code editor (for example VS Code), Chrome or Edge, and Node.js version 20.19 or higher. Read `README.md` first.

## Today's project: the LearnBuddy landing screen
**What it does:** shows a full-window dark teal screen with the title `❖ LearnBuddy` and the tagline `Learn · Practice · Improve`, both centered. See `ui-breakdown.md` for all values and `ui.svg` for the picture.

**Requirements**

1. **Tools.** `node -v` prints `v20.19` or higher. `ng version` prints an Angular CLI version. If `ng` is missing, run `npm install -g @angular/cli`.
2. **Create the project.** In a folder of your choice, run `ng new learnbuddy --skip-tests`. Answers: stylesheet `CSS`, SSR `No`, zoneless `No`, AI tools `None`; accept every other default. Then `cd learnbuddy`. The file `src/app/app.ts` must exist.
3. **Run it.** Run `ng serve` inside `learnbuddy`. Open `http://localhost:4200/` in the browser. Keep `ng serve` running until the end.
4. **`src/styles.css`.** Replace all content with exactly one rule: selector `body`, two declarations: `margin: 0;` and `font-family: Arial, sans-serif;`.
5. **`src/app/app.html`.** Replace all content with exactly this structure and nothing else:
   - one `<div>` with `class="landing"`, which contains, in this order:
   - one `<h1>` with the text `❖ LearnBuddy`
   - one `<p>` with the text `Learn · Practice · Improve`
6. **`src/app/app.css`.** Exactly two rules:

   | Selector | Declarations (in this order) |
   |---|---|
   | `.landing` | `background: #0e3441;` `color: white;` `min-height: 100vh;` `text-align: center;` `padding-top: 120px;` `box-sizing: border-box;` |
   | `.landing p` | `color: #bcd6da;` |

7. **`src/app/app.ts`.** Remove the `RouterOutlet` import, remove `RouterOutlet` from `imports` (it becomes `imports: []`), remove the `title` line, and remove `signal` from the first import. Final first line: `import { Component } from '@angular/core';`. The class is `export class App { }` with nothing inside.
8. **No messages.** After you save all files, the terminal running `ng serve` shows no error and no warning.

**Expected screen:** the whole browser window is dark teal (`#0e3441`) with no white border and no scroll bar. About 120px below the top edge, the white, bold, large title `❖ LearnBuddy` is centered. Below it, the smaller pale teal (`#bcd6da`) line `Learn · Practice · Improve`, also centered. The picture is in `ui.svg`.

**Check yourself**
- [ ] The browser tab shows your app at `localhost:4200`, not the CLI's welcome page.
- [ ] The teal reaches all four edges of the window (no white border) and the page does not scroll.
- [ ] The title is white and the tagline is a paler color than the title.
- [ ] `app.ts` has no `RouterOutlet` and no `signal` anywhere.
- [ ] No errors or warnings in the terminal, and none in the browser console (press `F12`, tab Console).

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend the landing screen
Challenges change the same files you built today, one after the other. Each one ends with an undo, so tomorrow starts from the exact Day 01 state.

## Challenge 1: add a link (HTML)
**Goal:** practice attributes and nesting by adding a clickable link.

**Requirements**
1. In `app.html`, add a second `<p>` as the last child of the `<div class="landing">`.
2. Its content is the text `Built with ` followed by an `<a>` element with the attribute `href="https://angular.dev"` and the text `Angular`.

**Expected:** a new centered line `Built with Angular` under the tagline. `Built with` is pale teal (`#bcd6da`, from the `.landing p` rule). The word `Angular` is underlined and in the browser's default link color (blue), because `.landing p` sets the color of the `p` only, and the `a` has its own default color. Clicking it opens angular.dev.

<details><summary>Hint 1</summary>An `<a>` (anchor) element makes a link. The address it opens goes in an attribute.</details>
<details><summary>Hint 2</summary>The `a` element goes inside the second `p`, after the words `Built with `. The attribute is `href="..."`.</details>
<details><summary>Hint 3</summary>`<p>Built with <a href="https://angular.dev">Angular</a></p>`</details>

Undo this before tomorrow.

## Challenge 2: bigger, paler title (CSS)
**Goal:** practice writing a new rule with a new selector.

**Requirements**
1. In `app.css`, add a new rule with the selector `.landing h1` and two declarations: `font-size: 48px;` and `color: #e3f5ed;`.
2. In the existing `.landing` rule, change `padding-top` from `120px` to `80px`.

**Expected:** the title is larger (48px) and pale mint (`#e3f5ed`) instead of white. The whole block sits 40px higher than before. The tagline is unchanged.

<details><summary>Hint 1</summary>You need a selector that picks only the `h1` inside `.landing`. The README shows how to write "an element inside a class".</details>
<details><summary>Hint 2</summary>The shape is `.landing h1 { property: value; property: value; }`. `font-size` takes a length such as `20px`.</details>
<details><summary>Hint 3</summary>`.landing h1 { font-size: 48px; color: #e3f5ed; }` and `padding-top: 80px;`</details>

Undo this before tomorrow.

## Challenge 3 (stretch): a green band (CSS)
**Goal:** use a second class and see why a more specific selector wins.

**Requirements**
1. In `app.html`, add `<p class="start">Start learning</p>` as the last child of `<div class="landing">`.
2. In `app.css`, add a rule with the selector `.landing .start` (a class `start` inside a class `landing`) and the declarations `background: #15965f;`, `color: white;`, `padding: 12px 0;`.

**Expected:** a full-width green (`#15965f`) band with the centered white text `Start learning` at the bottom of the content. The text is white, not pale teal.

<details><summary>Hint 1</summary>If the text stays pale teal, two rules set `color` for the same `p`. The rule whose selector names more classes wins.</details>
<details><summary>Hint 2</summary>With only `.start { ... }` the `color: white` is ignored. The selector `.landing .start` is more specific than `.landing p`.</details>
<details><summary>Hint 3</summary>`.landing .start { background: #15965f; color: white; padding: 12px 0; }`</details>

Undo this before tomorrow.

## Challenge 4 (stretch): a list (HTML)
**Goal:** nest more elements.

**Requirements**
1. In `app.html`, add a `<ul>` as the last child of `<div class="landing">`.
2. Inside it, three `<li>` elements with the texts `HTML`, `CSS`, `Angular`, in this order.

**Expected:** three lines, `HTML`, `CSS`, `Angular`, each with a bullet, white text on teal, under the other content.

<details><summary>Hint 1</summary>`ul` means unordered list. Its children are list items.</details>
<details><summary>Hint 2</summary>One `ul` parent, three `li` children, each with its own closing tag.</details>
<details><summary>Hint 3</summary>`<ul>` newline `<li>HTML</li>` newline `<li>CSS</li>` newline `<li>Angular</li>` newline `</ul>`</details>

Undo this before tomorrow.

When you finish: paste your files here for review.

# Day 07 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2. Challenges 3-4 are stretch: do them only if you have time left.

## Before you start
Open your `learnbuddy` project as you left it on Day 6, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `WelcomeCard`, `TrackCards`.
- Banner: `TODAY'S BUILD · TOPIC 04` and `Property Binding`.
- Three track cards, each with a 32 x 32 icon from `public/` (`angular.svg`, `typescript.svg`, `csharp.svg`), a name, a description and a `View topics` button. The C# button is disabled with the tooltip `Coming later`.
- `src/app/track-cards/track-cards.ts` has these properties: `angularName`, `typescriptName`, `csharpName`, `angularIcon`, `typescriptIcon`, `csharpIcon`, `csharpLocked` (`true`), `csharpHint` (`'Coming later'`).

The exact values and the layout are in `ui-breakdown.md`. The picture is `ui.svg`.

## Today's project: Track card states
**What it does:** each track card shows a status text and a progress bar. The C# card is faded because it is locked.

**Requirements**

1. In `src/app/track-cards/track-cards.ts`, add these five properties inside the class, after `csharpHint`:
   ```ts
   angularStatus: string = 'In progress';
   typescriptStatus: string = 'Continue roadmap';
   csharpStatus: string = 'Not started';
   angularPercent: number = 5;
   typescriptPercent: number = 30;
   ```
2. In `track-cards.html`, in each card, put this `<span>` after the `<p>` and before the `<button>`. Use `angularStatus`, `typescriptStatus` and `csharpStatus` in the three cards:
   ```html
   <span class="status">{{ angularStatus }}</span>
   ```
3. Right after each status `<span>`, add the bar. Angular card:
   ```html
   <div class="bar" [attr.aria-label]="'Angular progress ' + angularPercent + ' percent'">
     <div class="bar-fill" [style.width.%]="angularPercent"></div>
   </div>
   ```
   TypeScript card: the same, with `'TypeScript progress '` and `typescriptPercent` (twice). C# card: `[attr.aria-label]="'C# progress 0 percent'"` and `[style.width.%]="0"`.
4. On the C# `<section>`, add `[class.locked]="csharpLocked"` so the tag reads `<section class="track csharp" [class.locked]="csharpLocked">`.
5. In `track-cards.css`, change the `.track p` rule to `margin: 0 0 8px;` (it was `0 0 24px`).
6. At the end of `track-cards.css`, add these four rules:
   ```css
   .status {
     display: inline-block;
     margin-bottom: 8px;
     font-size: 11px;
     font-weight: bold;
     color: var(--green);
   }

   .bar {
     height: 8px;
     margin-bottom: 16px;
     background: #dde7e5;
     border-radius: 4px;
     overflow: hidden;
   }

   .bar-fill {
     height: 100%;
     background: var(--green);
   }

   .locked {
     opacity: 0.65;
   }
   ```
7. Do not change any other file.

**Expected screen**
- In each card, in this order from top: icon, name, description, status text, bar, `View topics` button.
- Status texts (small, bold, green): `In progress`, `Continue roadmap`, `Not started`.
- Angular bar: a thin green sliver (5% of the bar). TypeScript bar: green fill covering 30%. C# bar: no green. Bars are 8px tall with rounded ends.
- The C# card (icon, text, bar, button) is faded; its button is grey and shows the not-allowed cursor.
- DevTools (F12, Elements): the Angular fill shows `style="width: 5%;"`, the TypeScript fill `style="width: 30%;"`, the C# fill `style="width: 0%;"`; the Angular bar shows `aria-label="Angular progress 5 percent"`; the C# section's class list ends with `locked`.
- The picture is in `ui.svg`.

**Check yourself**
- [ ] Three status texts match the list above exactly.
- [ ] Fill widths in DevTools are 5%, 30% and 0%.
- [ ] Changing `typescriptPercent` to `60` in the `.ts` file makes the TypeScript fill twice as wide after saving. Change it back to `30`.
- [ ] The C# card is faded; the other two are not.
- [ ] No errors in the terminal or in the browser console (F12, Console).

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend the track cards
Do these in the same three files, with the same data. Each challenge ends with "Undo this before tomorrow." so Day 8 starts from the exact Day 7 code. The result appears in the browser and in DevTools.

## Challenge 1: Tell screen readers it is a progress bar (HTML)
**Goal:** give the Angular bar the HTML attributes that mark it as a progress bar.
**Requirements:**
1. On the Angular `<div class="bar" ...>` add the fixed attributes `role="progressbar"`, `aria-valuemin="0"` and `aria-valuemax="100"`.
2. Add `[attr.aria-valuenow]="angularPercent"` to the same element.

**Expected screen:** no visual change. In DevTools the Angular bar shows `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"` and `aria-valuenow="5"` (plus the `aria-label` from the project).

<details><summary>Hint 1</summary>An element can have many attributes. Fixed values are plain `name="value"`. A value that comes from the class needs the attr binding from concept 7.</details>
<details><summary>Hint 2</summary>Plain attributes go in the tag like `class="bar"`. The one that changes uses the same shape as the existing `[attr.aria-label]`, with a number instead of a joined text.</details>
<details><summary>Hint 3</summary>Add `role="progressbar" aria-valuemin="0" aria-valuemax="100" [attr.aria-valuenow]="angularPercent"` inside the opening `<div class="bar" ...>` tag.</details>

Undo this before tomorrow.

## Challenge 2: Blue TypeScript bar (CSS)
**Goal:** show the TypeScript fill in blue without changing the HTML.
**Requirements:**
1. At the end of `track-cards.css` add one rule that sets `background` to `var(--blue)` for `.bar-fill` elements inside the TypeScript card (the card has the class `typescript`).
2. Then move that rule above the `.bar-fill` rule. Write in a comment in the CSS which color you see and why (one line, use the word "specificity").

**Expected screen:** the TypeScript fill (30%) is blue; the Angular fill stays green. After step 2 the TypeScript fill is still blue.

<details><summary>Hint 1</summary>You need a selector that matches `.bar-fill` only when it is inside the TypeScript card. Concept 8 shows a selector with two class names.</details>
<details><summary>Hint 2</summary>The selector has two classes with a space between them: first the card class, then the fill class.</details>
<details><summary>Hint 3</summary>`.typescript .bar-fill { background: var(--blue); }` has score 0,2,0 and `.bar-fill` has 0,1,0, so the first wins in any order.</details>

Undo this before tomorrow.

## Challenge 3 (stretch): A property for the C# percent
**Goal:** stop using the fixed `0` in the C# bar.
**Requirements:**
1. Add `csharpPercent: number = 15;` to `track-cards.ts`.
2. In the C# card use `[style.width.%]="csharpPercent"` and `[attr.aria-label]="'C# progress ' + csharpPercent + ' percent'"`.

**Expected screen:** the C# fill is a green sliver (15% wide, faded with the card). DevTools shows `style="width: 15%;"` and `aria-label="C# progress 15 percent"`.

<details><summary>Hint 1</summary>Copy the shape of the Angular card's bar and swap the names.</details>
<details><summary>Hint 2</summary>Replace the literal `0` in both bindings and in the text with the new property.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): Bar height from a property
**Goal:** control the bar height from the class.
**Requirements:**
1. Add `barHeight: number = 14;` to `track-cards.ts`.
2. On all three `<div class="bar" ...>` elements add `[style.height.px]="barHeight"`.

**Expected screen:** all three bars are 14px tall, although `.bar` in the CSS says `height: 8px`. DevTools shows `style="height: 14px;"` on each bar. Write one line in a comment in the HTML or CSS: which rule wins and why.

<details><summary>Hint 1</summary>The unit goes after the property name, as in concept 4.</details>
<details><summary>Hint 2</summary>The binding has the same shape as `[style.width.%]` with `.px` instead of `.%`.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.

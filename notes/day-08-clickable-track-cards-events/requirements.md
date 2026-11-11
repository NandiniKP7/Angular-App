# Day 08 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2. Challenges 3-4 are stretch: do them only if you have time left.

## Before you start
Open your `learnbuddy` project as you left it on Day 7, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `WelcomeCard`, `TrackCards`.
- Banner: `TODAY'S BUILD · TOPIC 04` and `Property Binding` (`src/app/today-build/today-build.ts`).
- Three track cards, each with icon, name, description, status text (`In progress`, `Continue roadmap`, `Not started`), a progress bar (5%, 30%, 0%) and a `View topics` button. The C# card is faded (`locked`) and its button is disabled with tooltip `Coming later`.
- `track-cards.ts` has `angularName` 'Angular', `typescriptName` 'TypeScript', `csharpName` 'C# / .NET', the icon, status and percent properties, `csharpLocked` true and `csharpHint` 'Coming later'.

Exact values and layout: `ui-breakdown.md`. Picture: `ui.svg`.

## Today's project: Select a track
**What it does:** clicking `View topics` on the Angular or TypeScript card selects that track: the card gets a green outline and a text line under the cards names it.

**Requirements**

1. In `src/app/track-cards/track-cards.ts`, after `typescriptPercent`, add the property and the method:
   ```ts
   selectedTrack: string = 'Angular';

   select(track: string): void {
     this.selectedTrack = track;
   }
   ```
2. In `track-cards.html`, change the three `<section>` opening tags to:
   ```html
   <section class="track angular" [class.selected]="selectedTrack === angularName">
   <section class="track typescript" [class.selected]="selectedTrack === typescriptName">
   <section class="track csharp" [class.locked]="csharpLocked" [class.selected]="selectedTrack === csharpName">
   ```
3. Change the three buttons to:
   ```html
   <button (click)="select(angularName)">View topics</button>
   <button (click)="select(typescriptName)">View topics</button>
   <button [disabled]="csharpLocked" [title]="csharpHint" (click)="select(csharpName)">View topics</button>
   ```
4. After the closing `</div>` of `<div class="tracks">` (the last line of the file), add this line as a second root element (not inside any other element):
   ```html
   <p class="selected-line">Selected track: {{ selectedTrack }}</p>
   ```
5. At the end of `track-cards.css` add:
   ```css
   .selected {
     outline: 3px solid var(--green);
   }

   .selected-line {
     margin: 12px 0 0;
     color: var(--muted);
     font-size: 14px;
   }

   .track button:focus-visible {
     outline: 3px solid var(--blue);
     outline-offset: 2px;
   }
   ```
6. In `src/app/today-build/today-build.ts` change the two values to `topicNo: string = '05';` and `topicTitle: string = 'Event Binding';`.
7. Do not change any other file.

**Expected screen**
- Banner: `TODAY'S BUILD · TOPIC 05` and `Event Binding`.
- On load: the Angular card has a 3px green outline. Under the three cards, the gray text `Selected track: Angular`.
- Click `View topics` on the TypeScript card: the outline moves to the TypeScript card (the Angular card has none) and the text becomes `Selected track: TypeScript`. Click the Angular button: back to `Selected track: Angular`.
- Clicking the grey C# button does nothing (it is disabled): the text and outline do not change. Hovering it shows the tooltip `Coming later`.
- Click in the page background, then press `Tab` until a `View topics` button is focused: a blue 3px ring appears 2px outside it. Press `Enter`: that track is selected. Cards do not move when the outline appears.
- The picture is in `ui.svg`.

**Check yourself**
- [ ] On load, only the Angular card has the green outline and the text says `Selected track: Angular`.
- [ ] After a click on TypeScript, DevTools (F12, Elements) shows the class list `track typescript selected` on that card and `track angular` on the Angular card.
- [ ] `Tab` focus shows a blue ring; `Enter` selects.
- [ ] The C# card stays faded and cannot be selected.
- [ ] No errors in the terminal or in the browser console (F12, Console).

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend the track cards
Do these in the same files, with the same data. Each challenge ends with "Undo this before tomorrow." so Day 9 starts from the exact Day 8 code. The result appears in the browser, DevTools or the console.

## Challenge 1: Buttons with names for screen readers (HTML)
**Goal:** make the buttons explicit and give them a clear name.
**Requirements:**
1. Add `type="button"` to all three `View topics` buttons.
2. Add `[attr.aria-label]="'View ' + angularName + ' topics'"` to the Angular button and the same shape with `typescriptName` to the TypeScript button.

**Expected screen:** no visual change. DevTools shows on the Angular button `type="button"` and `aria-label="View Angular topics"`; on the TypeScript button `aria-label="View TypeScript topics"`. Clicking still selects.

<details><summary>Hint 1</summary>`type` is a fixed attribute (plain text). The label changes with the name, so it needs the attr binding from Day 7, concept 7.</details>
<details><summary>Hint 2</summary>The binding value is a text joined with `+`: a start text, the property, an end text.</details>
<details><summary>Hint 3</summary>`<button type="button" [attr.aria-label]="'View ' + angularName + ' topics'" (click)="select(angularName)">`.</details>

Undo this before tomorrow.

## Challenge 2: A stronger selected style (CSS)
**Goal:** make the selected card easier to see.
**Requirements:**
1. In the `.selected` rule add `outline-offset: 3px;`.
2. Add a new rule that sets `color` to `var(--green)` on the `<h3>` inside the selected card.

**Expected screen:** the green line is 3px away from the selected card, and the selected card's name (`Angular` on load) is green. When you select TypeScript, its name turns green and Angular's name is black again. The text `Selected track: ...` is unchanged.

<details><summary>Hint 1</summary>A selector can combine a class and an element name inside it. Look at `.track h3` in your CSS for the shape.</details>
<details><summary>Hint 2</summary>The selector starts with the state class `.selected` and ends with the element name `h3`, with a space between.</details>
<details><summary>Hint 3</summary>`.selected h3 { color: var(--green); }`</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Clear the selection
**Goal:** add a second handler.
**Requirements:**
1. In `track-cards.ts` add a method `clear(): void` that sets `selectedTrack` to `'None'`.
2. In `track-cards.html`, after the `selected-line` paragraph, add `<button type="button" (click)="clear()">Clear selection</button>`.

**Expected screen:** a button `Clear selection` under the text. Click it: no card has the outline and the text reads `Selected track: None`. Click a `View topics` button: selection returns.

<details><summary>Hint 1</summary>It has the same shape as `select`, but it needs no parameter.</details>
<details><summary>Hint 2</summary>The method body is one line that assigns a fixed text to the property, with `this.`.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): Log the event
**Goal:** use `$event`.
**Requirements:**
1. In `track-cards.ts` add `log(event: MouseEvent): void` that runs `console.log(event.type, this.selectedTrack);`.
2. Change the TypeScript button to `(click)="select(typescriptName); log($event)"`.

**Expected screen:** no visual change. Open the Console (F12). Click the TypeScript button: it prints `click TypeScript`. Click it again: another `click TypeScript` line.

<details><summary>Hint 1</summary>Two statements in one binding are separated with `;`.</details>
<details><summary>Hint 2</summary>Order matters: `select` first, so `selectedTrack` is already updated when `log` runs.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.

# Day 9 Practical Requirements

**Time:** 30 minutes. **Core:** the project and Challenges 1-2 (about 20 minutes for the project, 5 minutes for each challenge). Challenges 3-4 are stretch: do them if you have time.

## Before you start
Open your `learnbuddy` project as you left it on Day 8, with `ng serve` running. It has:
- Components `App`, `Sidebar`, `Header`, `MyLearning`, `TodayBuild`, `WelcomeCard`, `TrackCards`.
- `my-learning.html` with three tags: `<app-today-build />`, `<app-welcome-card />`, `<app-track-cards />`.
- `TodayBuild` with `topicNo` `'05'` and `topicTitle` `'Event Binding'`.
- `TrackCards` with `selectedTrack`, the method `select(track: string)`, and three track cards that you click.

If your app is the older Dashboard version, see the first section of `walkthrough.md`.

## Today's project: Today's choice

**What it does:** The page shows the track list as one card with three rows, and a new card, "Today's choice", next to it. The learner picks a time (15 min, 30 min, 60 min or Rest) with chips, then clicks Save to see the saved value. The card uses `[(ngModel)]`. All values and CSS are in `ui-breakdown.md`, and the picture is `ui.svg`.

**Requirements**
1. In `src/app/today-build/today-build.ts`, change `topicNo` to `'06'` and `topicTitle` to `'Two-Way Binding'`.
2. Generate the component `today-choice` with `--skip-tests` (class `TodayChoice`, selector `app-today-choice`). Delete the `WelcomeCard` component: remove `<app-welcome-card />` from `my-learning.html`, remove `WelcomeCard` from `imports` and its import line in `my-learning.ts`, then delete the folder `src/app/welcome-card`.
3. Change `MyLearning`:
   - `my-learning.html` contains, in this order: `<app-today-build />`, then a `<div class="two-col">` that holds `<app-track-cards />` followed by `<app-today-choice />`.
   - `my-learning.ts` has `imports: [TodayBuild, TrackCards, TodayChoice]` and the three import lines.
   - `my-learning.css` has exactly two rules, `app-today-build` and `.two-col`, with the values in the `my-learning.css` table of `ui-breakdown.md`.
4. Rewrite `track-cards.html` and `track-cards.css` (do not change `track-cards.ts`):
   - One `<section class="card">` containing: `<h3>` with the text `Choose a Learning Track`; `<p class="sub">` with the text `Visual controls and typed topic list`; three `<div class="track-row ...">` rows; and `<p class="selected-line">Selected track: {{ selectedTrack }}</p>`.
   - The rows have the classes `angular`, `typescript`, `csharp` (in this order). Each row has an `<img>` (`[src]` and `[alt]` bound to the existing icon and name properties, `width="32" height="32"`), a `<div class="info">` with a `<strong>` (the name) and a `<span>` (the status), and a `<button>` with the text `View`.
   - Each row has `[class.selected]="selectedTrack === <name property>"`. The `csharp` row also has `[class.locked]="csharpLocked"`. Each button calls `select(<name property>)` on click. The C# button also has `[disabled]="csharpLocked"` and `[title]="csharpHint"`.
   - The CSS has the rules in the `track-cards.css` table of `ui-breakdown.md`.
5. In `today-choice.ts`: import `FormsModule` (import line and `imports: [FormsModule]`); add `choice: string = '';`, `saved: string = '';` and the method `save(): void` that copies `choice` into `saved`.
6. In `today-choice.html`: one `<section class="card">` with `<h3>` `Today's choice`, `<p class="sub">` `How much time do you have?`, a `<div class="chips" role="radiogroup" aria-label="Time today">` with four `<label class="chip">` elements, each holding an `<input type="radio" name="time" value="..." [(ngModel)]="choice">` followed by a `<span>`. The four values and span texts are `15 min`, `30 min`, `60 min`, `Rest` (in this order). After the chips: `<button class="save" (click)="save()" [disabled]="choice === ''">Save preference</button>` and `<p class="saved" [hidden]="saved === ''">Saved: {{ saved }}</p>`.
7. In `today-choice.css`: the rules in the `today-choice.css` table of `ui-breakdown.md`.

**Expected screen** (compare with `ui.svg`)
- Banner: `TODAY'S BUILD · TOPIC 06` and `Two-Way Binding`. No welcome card.
- Below it, two columns, left about twice as wide. Left card: `Choose a Learning Track`, the grey line, three colored rows (Angular green-tinted with `In progress`, TypeScript blue-tinted with `Continue roadmap`, C# / .NET purple-tinted, faded, with `Not started` and a grey `View` button), and `Selected track: Angular`. The Angular row has a green outline.
- Right card: `Today's choice`, `How much time do you have?`, four chips in a 2 x 2 grid (`15 min`, `30 min` on the first row, `60 min`, `Rest` on the second), a grey disabled `Save preference` button, and no "Saved" line. No round radio buttons are visible.
- Click `30 min`: that chip turns green, the Save button turns green. Click `Save preference`: `Saved: 30 min` appears in green. Click `Rest`: the chip changes, but the Saved line still says `30 min` until you click Save again.
- Click `View` on TypeScript: its row gets the green outline and the line says `Selected track: TypeScript`. The C# button does nothing.

**Check yourself**
- [ ] There is no `welcome-card` folder and no reference to `WelcomeCard` anywhere in `src/app`.
- [ ] Pressing Tab moves to a chip and shows a blue ring on its text (not on a hidden radio).
- [ ] Only one chip can be green at a time.
- [ ] Save is grey and unclickable until you choose a chip.
- [ ] The terminal and the browser console (F12, Console tab) show no errors.

**Build it yourself first.** Use today's `README.md` as your reference. If you are stuck for 15 minutes, open `walkthrough.md`.

Open a hint only after 10 minutes of trying.

## Challenges: extend Today's choice

Challenges are added to the same app. Each one changes only the files named in it. Do each challenge on top of the finished project, and undo it when it says so.

## Challenge 1: A note field with a label (HTML)
**Goal:** Add a text input with a connected label, bound in two directions.
**Requirements**
1. In `today-choice.ts` add `note: string = '';`.
2. In `today-choice.html`, between the closing `</div>` of `.chips` and the Save button, add: a `<label for="note">` with the text `Note for today`; an `<input id="note" class="note-input" type="text" placeholder="Write one line" [(ngModel)]="note">`; and `<p class="sub">You typed: {{ note }}</p>`.
3. In `today-choice.css` add the rule `.note-input` with `display: block; width: 100%; box-sizing: border-box; margin-bottom: 8px;`.

**Expected:** The card shows the label `Note for today` above a full-width input. Clicking the words `Note for today` puts the cursor in the input. Typing `Read chapter 3` shows `You typed: Read chapter 3`, updating after every key.

<details><summary>Hint 1</summary>Today's README concept 1 (label and `for`/`id`) and concept 7 (`[(ngModel)]` on a text input) are all you need.</details>
<details><summary>Hint 2</summary>The `for` value must be the same text as the input's `id`. The property `note` is a string, like `choice`.</details>
<details><summary>Hint 3</summary>`<label for="note">Note for today</label>` then `<input id="note" ... [(ngModel)]="note">`. If the input does not update the line, check that `note` exists in the `.ts` file.</details>

Undo this before tomorrow.

## Challenge 2: Hover and blue chips (CSS)
**Goal:** Change how the chips look.
**Requirements**
1. In `today-choice.css`, in the rule `.chip input:checked + span`, change `background` and `border-color` from `var(--green)` to `var(--blue)`. Keep `color: white`.
2. Add a new rule `.chip span:hover` with `border-color: var(--green);`.
3. In the `.save` rule add `width: 100%;`.

**Expected:** The chosen chip is blue. Moving the mouse over an unchosen chip gives it a green border. The chosen chip stays blue with a blue border when hovered. The Save button is as wide as the card.

<details><summary>Hint 1</summary>All three changes are only in `today-choice.css`. No HTML changes.</details>
<details><summary>Hint 2</summary>For requirement 2, the selector looks like the `span` rule from today, plus `:hover` after `span`.</details>
<details><summary>Hint 3</summary>`.chip span:hover { border-color: var(--green); }`. It does not beat the checked rule because the checked rule's selector is more specific (Day 7).</details>

Undo this before tomorrow.

## Challenge 3 (stretch): Reset button
**Goal:** Change the screen from code.
**Requirements**
1. In `today-choice.ts` add the method `reset(): void` that sets `choice` and `saved` to `''`.
2. In `today-choice.html`, directly after the Save button, add `<button class="reset" (click)="reset()">Reset</button>`.
3. In `today-choice.css` add `.reset` with `margin-left: 8px; background: white; color: var(--ink); border: 1px solid var(--line); border-radius: 9px; padding: 9px 16px; font-weight: bold; cursor: pointer;`.

**Expected:** Choose `30 min`, click Save (`Saved: 30 min`), then click Reset: no chip is green, Save is grey again, and the Saved line is gone.

<details><summary>Hint 1</summary>You do not touch the radio buttons. You change the property, and the binding updates them.</details>
<details><summary>Hint 2</summary>Method with two assignments using `this.`.</details>
<details><summary>Hint 3</summary>`this.choice = '';` and `this.saved = '';` inside `reset()`.</details>

Undo this before tomorrow.

## Challenge 4 (stretch): A checkbox
**Goal:** Use `ngModel` with a checkbox.
**Requirements**
1. In `today-choice.ts` add `remind: boolean = false;`.
2. In `today-choice.html`, directly before the Save button, add `<label class="remind"><input type="checkbox" [(ngModel)]="remind"> Remind me tomorrow</label>` and then `<p class="sub">Reminder: {{ remind ? 'on' : 'off' }}</p>`. (`a ? b : c` is the conditional operator: it gives `b` when `a` is true, otherwise `c`.)
3. In `today-choice.css` add `.remind` with `display: block; margin-bottom: 8px;`.

**Expected:** `Reminder: off` at first. Ticking the box shows `Reminder: on`; unticking shows `off`.

<details><summary>Hint 1</summary>A checkbox with `ngModel` gives the property `true` or `false`, not text.</details>
<details><summary>Hint 2</summary>`a ? b : c` means "if `a` is true use `b`, otherwise use `c`". You can write it inside `{{ }}`.</details>
<details><summary>Hint 3</summary>`{{ remind ? 'on' : 'off' }}` inside a `<p>`.</details>

Undo this before tomorrow.

## When you finish
When you finish: paste your files here for review.

# Day 9: Today's Choice and Two-Way Binding

**Project today:** a "Today's choice" card with radio buttons, next to the track list (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** `<label>`, `<input type="radio">` with `name` and `value`, grouping controls with `role` and `aria-label`, the `hidden` attribute.
- **CSS:** hiding a native control with `position` and `opacity`, the `:checked` pseudo-class with the `+` selector, a two-column grid with `2fr 1fr` and `align-items: start`.
- **Angular:** `FormsModule`, `[(ngModel)]` (two-way binding), deleting a component (`WelcomeCard`).

Keep `ng serve` running in your terminal. Today's topic in the app is topic 06, Two-Way Binding.

---

**1. HTML: `<label>` and `<input>`**

A **form control** is an element where the user types or chooses something. `<input>` is a form control. It has no content, so it has no closing tag (an element like this is called a **void element**). Its `type` attribute chooses the kind of control.

A `<label>` is the text that belongs to a control. Clicking the label activates the control. You connect them in one of two ways.

```html
<!-- Way 1: wrap the control inside the label -->
<label>
  <input type="checkbox">
  Send reminders
</label>

<!-- Way 2: give the input an id, and point the label at it with for -->
<label for="email">Email</label>
<input id="email" type="text">
```

Read it piece by piece:
- `id="email"` gives one element a unique name on the page.
- `for="email"` says "this label belongs to the element whose id is `email`".
- In both ways, clicking the words "Send reminders" or "Email" activates the control.

Today's project uses Way 1.

---

**2. HTML: radio buttons**

`<input type="radio">` is a round button. Radio buttons that share the same `name` attribute form a **group**, and only one button in a group can be selected. The `value` attribute is the text that identifies the option.

```html
<input type="radio" name="size" value="small">
<input type="radio" name="size" value="large">
<!-- Selecting the second one makes the group's value "large". -->
```

Without a shared `name`, the browser treats each radio button as its own group, and you could select all of them.

---

**3. HTML: grouping controls so everyone can use them**

**Accessibility** means that people who cannot see the screen can still use the page. A **screen reader** is software that reads the page aloud. A plain `<div>` has no meaning, so a screen reader does not know that several radio buttons belong together. You tell it with two attributes:

```html
<div role="radiogroup" aria-label="Time today">
  <!-- the radio buttons go here -->
</div>
```

- `role="radiogroup"` says "this element is a group of radio buttons".
- `aria-label="Time today"` gives the group a name that the screen reader reads aloud. You used `aria-label` on Day 7.

Nothing changes on the screen. The change is only for assistive software.

---

**4. HTML: the `hidden` attribute**

`hidden` is an attribute that hides an element. The browser's default style for it is `display: none`.

```html
<p hidden>You cannot see me.</p>
```

In Angular, `[hidden]="expression"` is a property binding (Day 6). When the expression is `true`, the element is hidden:

```html
<p [hidden]="saved === ''">Saved: {{ saved }}</p>
<!-- saved is '' -> the paragraph is hidden.  saved is '30 min' -> it shows. -->
```

Watch out: if your own CSS sets `display` on that element (for example `display: block`), your rule wins and `hidden` stops working. The `.saved` rule in today's project does not set `display`, so `hidden` works.

---

**5. Angular: why two-way binding exists**

You already know two directions:
- Property binding `[x]="value"` sends data from the class to the screen (Day 6).
- Event binding `(click)="method()"` sends something the user did from the screen to the class (Day 8).

A form control needs both. The screen must show the value in the class, and when the user changes the control, the class must receive the new value. **Two-way binding** does both with one piece of syntax.

---

**6. Angular: `FormsModule` and `ngModel`**

A **directive** is an instruction you write on an HTML element that adds behavior to it. `ngModel` is a directive that connects a form control to a class property. It is not available by default. It lives in `FormsModule`, a built-in set of form features, so you must import it in two places in the component's `.ts` file:

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo',
  imports: [FormsModule],
  templateUrl: './demo.html'
})
export class Demo {
  name: string = '';
}
```

Read it piece by piece:
- `import { FormsModule } from '@angular/forms';` loads the code into the file.
- `imports: [FormsModule]` makes it usable in this component's template.

Watch out: if you forget the `imports` entry, `ng serve` shows an error like `Can't bind to 'ngModel' since it isn't a known property of 'input'`. The exact wording can differ between versions.

---

**7. Angular: `[(ngModel)]`**

```html
<input type="text" [(ngModel)]="name">
<p>Hello {{ name }}</p>
<!-- Typing N, a, n shows: Hello N, then Hello Na, then Hello Nan -->
```

The syntax `[( )]` is a property binding `[ ]` and an event binding `( )` combined. This is the long form that does the same thing:

```html
<input type="text" [ngModel]="name" (ngModelChange)="name = $event">
```

Read it piece by piece:
- `[ngModel]="name"` sends the property `name` into the input (class to screen).
- `(ngModelChange)="name = $event"` runs when the user changes the input. `$event` (Day 8) is the new value, and the assignment stores it in `name` (screen to class).
- `[(ngModel)]="name"` is the short form of both lines.

The order is round brackets inside square brackets: `[(` and `)]`. People call it "banana in a box" only to remember that order. The form `([ngModel])` is wrong.

---

**8. Angular: `ngModel` with radio buttons**

Give every radio button its own `value` and bind all of them to the same property.

```html
<input type="radio" name="size" value="small" [(ngModel)]="size">
<input type="radio" name="size" value="large" [(ngModel)]="size">
<!-- size is '' at the start: no button is selected.
     The user selects the second one: size becomes 'large'.
     Code runs size = 'small': the first button becomes selected. -->
```

Both directions work. The user changes the property, and code that changes the property changes the screen. In today's project the Save button uses the property too: `[disabled]="choice === ''"` is disabled until the user picks an option (`===` means "is exactly equal to").

---

**9. Angular: deleting a component**

Today you delete `WelcomeCard`. Do the steps in this order so you do not get errors:
1. Remove its tag (`<app-welcome-card />`) from the parent's `.html` file.
2. Remove its class (`WelcomeCard`) from the parent's `imports: [ ]` array.
3. Remove its `import { WelcomeCard } ...` line at the top of the parent's `.ts` file.
4. Delete its folder (`src/app/welcome-card`).

If you delete the folder first, `ng serve` shows `Cannot find module`. If you leave the class in `imports` but no longer use it in the template, Angular warns that the import is unused.

---

**10. CSS: `position` and `opacity` to hide a native control**

By default, every element sits in the normal flow: one after another down the page. `position: relative` keeps an element in the flow and makes it the reference point for elements inside it that use `position: absolute`. An element with `position: absolute` is taken out of the normal flow: it takes no space.

`opacity: 0` makes an element fully see-through. The element is still there, so it can still be clicked and reached with the Tab key. `display: none` removes it completely, so the Tab key cannot reach it.

```css
.chip { position: relative; }
.chip input { position: absolute; opacity: 0; }
```

Result: the round radio button is invisible and takes no space, but the keyboard still works. We show our own button shape instead (concept 11).

---

**11. CSS: `:checked` and the `+` selector**

A **pseudo-class** is a word starting with `:` that selects an element in a certain state. `:checked` selects a radio button or checkbox that is selected. Siblings are elements with the same parent. The **adjacent sibling combinator** `+` selects an element that comes directly after another one.

```html
<label class="chip">
  <input type="radio" name="time" value="15 min">
  <span>15 min</span>
</label>
```

```css
.chip input:checked + span {
  background: #15965f;
  color: white;
}
```

Read it piece by piece:
- `.chip input:checked` is an `input` inside `.chip` that is selected.
- `+ span` is the `span` that comes directly after it.
- When the radio is selected, its `span` turns green. When another radio is selected, the first `span` goes back to normal.

Watch out: the `span` must come after the `input` in the HTML. CSS cannot select an element that comes before.

---

**12. CSS: `fr` units and `align-items: start` in a grid**

You used `grid-template-columns: repeat(3, 1fr)` on Day 5. `fr` means one share of the free space. `2fr 1fr` makes two columns where the first is twice as wide as the second.

```css
.two-col {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  align-items: start;
}
```

By default (`align-items: stretch`), both items in a row get the height of the taller item. `align-items: start` lets each item keep its own natural height, aligned to the top. Today the left card is taller than the right card, and `start` stops the right card from stretching.

---

**Common problems**
- Radio buttons all selectable at once: the `name` values are not exactly the same.
- `[(ngModel)]` error about a known property: `FormsModule` is missing from `imports`.
- Chips never turn green: the `span` is not directly after the `input`, or the CSS says `input:checked span` without `+`.
- Radio buttons visible next to the chips: `.chip input` is missing `position: absolute` or `opacity: 0`.
- `Cannot find module '../welcome-card/welcome-card'`: you deleted the folder before removing the import line.

---

**Recap**
- `<label>` is the text of a control. Radio buttons with the same `name` form a group, and `value` identifies each option.
- `role="radiogroup"` and `aria-label` name a group for screen readers.
- `[(ngModel)]="x"` means `[ngModel]="x"` plus `(ngModelChange)="x = $event"`. It needs `FormsModule` in `imports`.
- To delete a component, remove the tag, the `imports` entry, the import line, then the folder.
- `input:checked + span` styles the element after a selected input. `2fr 1fr` makes uneven columns. `align-items: start` stops stretching.

**Next:** open `requirements.md` for today's project and challenges.

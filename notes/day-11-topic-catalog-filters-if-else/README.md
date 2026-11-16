# Day 11: Topic Catalog Filters with `@if` / `@else`

**Project today:** filter buttons ("chips") on the Angular Roadmap card that show only the topics with one status (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** `<button>` elements used as a group of filter chips.
- **CSS:** chip styles (pill shape, border), an active state class `.on`, `flex-wrap` so chips move to a new line when there is no room.
- **Angular:** `@if` and `@else`, a property that stores the chosen filter, a method that is called inside the template, filtering an array with `.filter()` and an arrow function, `[class.on]` with a comparison.

Keep `ng serve` running. Today's topic in the app is still topic 07, Angular Template Control Flow. **Control flow** means choosing what the template shows or repeating part of it. Yesterday you repeated rows with `@for`. Today you choose between two pieces of template with `@if`, and you choose which rows `@for` repeats.

---

**1. HTML: `<button>` as a filter chip**

`<button>` is an element for something the user clicks. Its text is written between the opening and closing tags. You can put several buttons next to each other, and each one can call its own code with `(click)` (Day 8).

```html
<div class="chips">
  <button class="chip">All</button>
  <button class="chip">Completed</button>
</div>
<!-- The browser shows two buttons side by side with the default grey look. -->
```

A **chip** is a small rounded button used to pick one option from a few. Buttons can be used with the keyboard (Tab to move, Enter or Space to press) without any extra code. That is why a button is the right element here, and not a `<span>` or a `<div>`.

---

**2. Angular: a property that remembers the choice**

A **property** is a variable that belongs to the class (Day 3). The filter the user picked must be remembered while the page is open, so we store it in a property. A **method** is a function that belongs to the class. `setFilter` changes the property.

```ts
filter: string = 'All';

setFilter(value: string): void {
  this.filter = value;
}
```

Read it piece by piece:
- `filter: string = 'All';` creates the property. `string` is its type: text. It starts as `'All'`.
- `setFilter(value: string): void` is a method that takes one text value. `void` means it gives nothing back.
- `this.filter = value;` stores the new value. `this` means "this component" (Day 8).

In the template, `(click)="setFilter('Completed')"` calls the method with the text `'Completed'`. After the click Angular shows the page again with the new value.

---

**3. Angular: `[class.on]` with a comparison**

You know `[class.name]="condition"` from Day 7. The condition can compare the property with a value. `===` means "is exactly equal to" and gives `true` or `false`.

```html
<button class="chip" [class.on]="filter === 'Completed'" (click)="setFilter('Completed')">Completed</button>
<!-- filter is 'Completed': the button has class="chip on".
     filter is anything else: the button has class="chip". -->
```

Only one chip is true at a time, because `filter` holds one value. That one chip gets the class `on`.

---

**4. CSS: chip styles and the `.on` state**

A chip is a button with a border, round ends and some padding. The state class `.on` changes its colors. You met state classes on Day 7 (`.locked`).

```css
.chip {
  background: white;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
}

.chip.on {
  background: var(--green);
  border-color: var(--green);
  color: white;
}
```

Read it piece by piece:
- `border-radius: 20px;` is larger than half the chip's height, so the ends are round.
- `.chip.on` has no space between the names: it selects an element that has both classes. It is more specific than `.chip`, so its colors win for the chosen chip.
- `cursor: pointer;` shows the hand when the mouse is over the chip.

The chips are inside `.chips`, not inside `.actions`. The rule `.actions button` only styles buttons inside `.actions`, so the chips keep their own look.

---

**5. CSS: `flex-wrap`**

You know `display: flex` (Day 2). By default, flex items stay on one line, even if that makes them very narrow. `flex-wrap: wrap;` lets items move to a new line when there is not enough room.

```css
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
/* Wide card: four chips on one line.
   Very narrow card: the last chips move to a second line, 8px apart. */
```

`gap: 8px;` adds 8px between chips, both across and down.

---

**6. Angular: `@if` and `@else`**

`@if` shows a piece of template only when a condition is `true`. `@else` is optional and shows another piece when the condition is `false`. A **condition** is an expression that gives `true` or `false`.

```html
@if (filter === 'All') {
  <p class="sub">{{ topics.length }} of 44 topics shown</p>
} @else {
  <p class="sub">{{ visibleTopics().length }} topics: {{ filter }}</p>
}
<!-- filter is 'All':        8 of 44 topics shown
     filter is 'Completed':  2 topics: Completed -->
```

Read it piece by piece:
- `@if (condition) { ... }` the condition goes in round brackets. The part to show goes in curly braces.
- `} @else { ... }` is written right after the closing brace of `@if`, on the same line.
- Only one of the two `<p>` elements is in the page at a time. The other does not exist in the page, it is not just hidden.
- `@if` is different from `@for`. `@for` repeats a block for every item. `@if` shows a block once, or not at all.

Compare with `[hidden]` from Day 9: `[hidden]` keeps the element in the page and hides it with CSS. `@if` removes it.

---

**7. TypeScript: `.filter()` and an arrow function**

An **arrow function** is a short way to write a small function: `topic => topic.status === 'Completed'`. The name before `=>` is the input (here one topic), and the expression after `=>` is what it gives back.

`.filter()` is an array method. It calls your arrow function once for each item and builds a **new array** with only the items for which the function gave `true`. The original array does not change.

```ts
const topics = [
  { no: 1, status: 'Completed' },
  { no: 3, status: 'In progress' },
  { no: 4, status: 'Not started' }
];
const done = topics.filter(topic => topic.status === 'Completed');
// done is [ { no: 1, status: 'Completed' } ]
// topics still has all 3 items
```

---

**8. Angular: a method called in the template**

You called `percentDone()` in `{{ }}` on Day 3. You can also call a method in `@for` and `@if`. Today's method returns the list to show.

```ts
visibleTopics() {
  if (this.filter === 'All') {
    return this.topics;
  }
  return this.topics.filter(topic => topic.status === this.filter);
}
```

Read it piece by piece:
- `if (this.filter === 'All') { return this.topics; }` is a normal TypeScript `if`. With the filter `'All'` the whole list is returned. `return` ends the method at once.
- Otherwise the second `return` runs and gives only the topics whose `status` equals the chosen filter.
- No return type is written. TypeScript infers it from the `return` lines (Day 10: type inference).
- `this.topics` is the copy from Day 10, so `Clear list` still works: filtering an empty array gives an empty array.

In the template, the loop uses the method instead of the property:

```html
@for (topic of visibleTopics(); track topic.no) { ... }
```

With the filter `'Not started'` the loop receives 5 topics (4 to 8), so 5 rows appear. With `'Completed'` it receives topics 1 and 2. `@empty` still shows when the result has no items.

---

**Common problems**
- Clicking a chip changes nothing: the chip has `(click)="setFilter('...')"` with text that differs from the data. The text must match exactly, including capital letters (`'In progress'`, not `'In Progress'`).
- All chips look the same: the CSS rule is `.chip .on` (with a space) instead of `.chip.on`.
- No rows with the filter `Completed`: the data status text must be exactly `Completed`.
- An error about `@else`: write `} @else {` on one line, directly after the `}` of `@if`.
- An error that `visibleTopics` is not a function: in the template, `visibleTopics()` needs the round brackets.
- The chips stay on one line and squeeze: `flex-wrap: wrap;` is missing in `.chips`.
- The subtitle says `1 topics: In progress`: the word is plural even for one topic. That is expected today.

---

**Recap**
- `<button>` is the element for clickable chips. Keep the chosen filter in a class property and change it with a method.
- `[class.on]="filter === 'Completed'"` marks the chosen chip. Style it with `.chip.on`.
- `@if (condition) { ... } @else { ... }` shows one of two pieces. The other piece is not in the page.
- `.filter(topic => condition)` makes a new array with only the items that match. The original array stays the same.
- `@for` can loop over a method call: `visibleTopics()`.
- `flex-wrap: wrap;` lets flex items move to a new line.

**Next:** open `requirements.md` for today's project and challenges.

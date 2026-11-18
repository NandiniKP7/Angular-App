# Day 12: Topic Catalog with `@switch` and Loop Variables

**Project today:** status badges chosen with `@switch`, striped rows, and no line under the last row (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** one `<li>` that carries several classes, and how to check them in the browser (F12, Elements).
- **CSS:** striped ("zebra") rows with a background color, a class that removes the last row's line, why rule order and specificity matter.
- **Angular:** `@switch`, `@case`, `@default`; status codes in data; loop variables `$odd` and `$last` saved with `let`.

Keep `ng serve` running. Today's topic in the app is still topic 07, Angular Template Control Flow. Yesterday you used `@if` for two choices. Today you use `@switch` for one value with several possible matches.

---

**1. Angular: status codes in data**

A **code** is a short fixed value that the program compares, such as `'done'`. A **label** is the text people read, such as `Completed`. Until yesterday the data held the label. Today the data holds codes, and the template decides which label to show.

```ts
{ no: 1, title: 'String Interpolation', status: 'done' }
{ no: 3, title: 'Components', status: 'in-progress' }
{ no: 4, title: 'Property Binding', status: 'not-started' }
```

The three codes are `'done'`, `'in-progress'` and `'not-started'`. They are lowercase with no spaces (a dash joins words). The filter chips also use codes: `'all'`, `'done'`, `'in-progress'`, `'not-started'`. The chip text people read stays `All`, `Completed`, `In progress`, `Not started`.

Why: the label can change (for example to another language) without changing the data or the comparisons.

---

**2. Angular: `@switch`, `@case` and `@default`**

`@switch` looks at one value and shows the block of the first `@case` that is exactly equal to it. `@default` is optional and shows when no `@case` matched.

```html
@switch (topic.status) {
  @case ('done') {
    <span class="badge done">Completed</span>
  }
  @case ('in-progress') {
    <span class="badge progress">In progress</span>
  }
  @default {
    <span class="badge">Not started</span>
  }
}
<!-- status 'done':        a green pill "Completed"
     status 'in-progress': a blue pill "In progress"
     any other status:     a grey pill "Not started" -->
```

Read it piece by piece:
- `@switch (topic.status) { ... }` names the value to look at, in round brackets. All the cases go inside its curly braces.
- `@case ('done') { ... }` runs when `topic.status === 'done'`. The text in the brackets is a normal expression, so a text value needs quotes.
- Only one block is shown. Angular does not continue to the next case after a match.
- `@default { ... }` has no brackets. Here it catches `'not-started'`.
- There is no `@else` or `@else if` in `@switch`.

`@switch` and `@if` can both pick one piece. Use `@if` for a true or false question. Use `@switch` when one value can be one of several exact values.

---

**3. Angular: `@switch` inside `@for`**

`@switch` is a block like any other, so you can put it in the middle of a row. Each row has its own `topic`, so each row picks its own badge. Yesterday you wrote two `[class.done]` and `[class.progress]` bindings on one span. Today each case has its own span with fixed classes.

```html
<li class="topic-row">
  <span class="title">{{ topic.title }}</span>
  @switch (topic.status) {
    @case ('done') {
      <span class="badge done">Completed</span>
    }
    @default {
      <span class="badge">Not started</span>
    }
  }
</li>
```

Each `@case` and `@default` block starts on its own line inside the `@switch` braces. Unlike `@else`, they are not joined to a closing brace.

---

**4. Angular: loop variables `$odd` and `$last`**

Inside `@for`, Angular provides extra values. You met `$index` on Day 10. The full set:

| Value | Is `true` or has this value |
|---|---|
| `$index` | position, starting at `0` |
| `$count` | number of items in the loop |
| `$first` | `true` for the first item |
| `$last` | `true` for the last item |
| `$even` | `true` when `$index` is 0, 2, 4, ... |
| `$odd` | `true` when `$index` is 1, 3, 5, ... |

To use them you save them under a name with `let`. The names are yours to choose.

```html
@for (topic of visibleTopics(); track topic.no; let last = $last, odd = $odd) {
  <li class="topic-row" [class.last]="last" [class.odd]="odd">...</li>
}
```

Read it piece by piece:
- `let last = $last, odd = $odd` comes after `track ...;` and is separated from it by a semicolon. Several `name = value` pairs are separated by commas.
- `last` and `odd` exist only inside the braces, like `topic`.
- `[class.last]="last"` adds the class `last` only on the final row. `[class.odd]="odd"` adds `odd` on the rows at index 1, 3, 5 and 7, which are the 2nd, 4th, 6th and 8th rows.
- `$last` is about the rows that are shown. When the filter is `done`, the 2nd row is the last one.

---

**5. HTML: one element, several classes**

The `class` attribute can hold several names separated by spaces. Angular's `[class.name]` adds or removes one name and leaves the others alone.

```html
<li class="topic-row" [class.last]="last" [class.odd]="odd">
<!-- Row 2 of 8:  class="topic-row odd"
     Row 8 of 8:  class="topic-row odd last"
     Row 1 of 8:  class="topic-row" -->
```

You can check this yourself. Press F12, open the **Elements** tab, and click a `<li>` in the tree. Its `class` shows the names that are on it right now. Click `Completed` and look again: the classes change with the rows.

---

**6. CSS: striped rows and a last row without a line**

**Zebra striping** gives every second row a slightly different background so the eye can follow a row across. Today Angular decides which rows are `odd`, so the CSS only needs to style the class.

```css
.topic-row.odd {
  background: #fafcfc;
}

.topic-row.last {
  border-bottom: 0;
}
```

Read it piece by piece:
- `.topic-row.odd` selects an element with both classes `topic-row` and `odd`.
- `#fafcfc` is almost white, so the stripe is very faint on purpose. Challenge 2 makes it easier to see.
- `.topic-row.last { border-bottom: 0; }` removes the line under the final row. The row rule from Day 10 gives every row `border-bottom: 1px solid #eef1f2;`.

Why `.topic-row.last` wins over `.topic-row`: it names two classes, so it is more specific (Day 7). Specificity is checked first. When two rules are equally specific, the one written later in the file wins.

CSS also has `:last-child` (Day 10, Challenge 2). Today you let Angular decide with `$last`, so you learn loop variables.

---

**Common problems**
- Every badge says `Not started`: the data still has labels (`'Completed'`) and not codes (`'done'`), or a `@case` text does not match the code exactly.
- A chip shows nothing: the chip and the data must use the same code. `'in-progress'` has a dash, and `'In progress'` does not match.
- An error about `$last` or `$odd`: the `let` part must come after `track topic.no;` with a semicolon: `track topic.no; let last = $last, odd = $odd`.
- No stripes: look at the `<li>` in Elements. If it has no class `odd`, the `[class.odd]="odd"` binding is missing. If it has the class, check the CSS rule name.
- The last row still has a line: `.topic-row.last` is missing, or it is written above a rule that overrides it.
- `@default` with brackets: `@default` takes no brackets.
- Subtitle shows `topics: ...` text from yesterday: the `@else` paragraph must read `{{ visibleTopics().length }} topics match this filter`.

---

**Recap**
- Data stores short codes; the template turns a code into a label.
- `@switch (value) { @case ('x') { ... } @default { ... } }` shows one block. `@default` is optional.
- `let last = $last, odd = $odd` saves loop variables after `track ...;`. `$odd` is true for the 2nd, 4th, 6th rows.
- `class` can hold many names; `[class.name]="condition"` toggles one of them.
- `.topic-row.odd` gives stripes, `.topic-row.last` removes the last line. For equal specificity, the later rule wins.

**Next:** open `requirements.md` for today's project and challenges.

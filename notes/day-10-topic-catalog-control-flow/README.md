# Day 10: Topic Catalog and Template Control Flow

**Project today:** an "Angular Roadmap" card that lists 8 topics with a loop (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** lists with `<ul>` and `<li>`.
- **CSS:** removing the default list style, rows built with flex, small pill badges, `border-bottom` lines between rows, `@media (max-width: 800px)` to stack two columns.
- **Angular:** `@for` with `track`, `@empty`, `$index`, an array of objects, copying an array with `[...]`, class binding inside a loop.

Keep `ng serve` running. Today's topic in the app is topic 07, Angular Template Control Flow. **Control flow** means choosing what the template shows or repeating part of it.

---

**1. HTML: lists with `<ul>` and `<li>`**

`<ul>` is an **unordered list**: a group of items with no numbering. Each item is an `<li>` (list item). The only elements allowed directly inside a `<ul>` are `<li>` elements.

```html
<ul>
  <li>Components</li>
  <li>Property Binding</li>
</ul>
<!-- The browser shows two lines, each with a bullet, indented to the right. -->
```

There is also `<ol>`, an ordered list that numbers the items itself. Today we write our own numbers, so we use `<ul>`.

---

**2. CSS: removing the default list style**

The browser gives every list default styling: bullets, space above and below, and 40px of padding on the left. A **reset** is a rule that removes default styling so you can build your own.

```css
.topic-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

Read it piece by piece:
- `list-style: none;` removes the bullets.
- `margin: 0;` removes the space outside the list.
- `padding: 0;` removes the space inside the list (the left indent).

---

**3. Angular: an array of objects**

An **object** groups named values: `{ no: 1, title: 'Components' }`. An **array** holds several values in order. An array of objects holds one object per item. You know both from the TypeScript days.

```ts
const TOPICS = [
  { no: 1, title: 'Setup', status: 'Completed' },
  { no: 2, title: 'Interpolation', status: 'Completed' }
];
// TypeScript infers the type: { no: number; title: string; status: string }[]
```

Read it piece by piece:
- `TOPICS` is declared with `const` outside the class, at the top of the file. It is written in capitals to show that it is fixed data.
- You do not write the type. **Type inference** means TypeScript works out the type from the value. `TOPICS[0].title` is known to be a string, and `TOPICS[0].titel` would be an error.

---

**4. Angular: copying an array with `[...]`**

The three dots `...` are the **spread** operator. It takes every item of an array and puts it in another place. `[...TOPICS]` builds a new array with the same items.

```ts
topics = [...TOPICS];     // the property gets its own array
this.topics = [];         // now topics is empty; TOPICS still has its items
this.topics = [...TOPICS]; // topics has the items again
```

Why copy: the property can be changed (for example with `push` or `splice`) without changing the original fixed list. In today's project the buttons replace the whole array, and the constant `ANGULAR_TOPICS` always keeps the full list so Restore works.

---

**5. Angular: `@for`**

`@for` repeats a piece of the template once for every item in an array. Each `@...` block has curly braces `{ }` that hold the part to repeat.

```html
<ul>
  @for (topic of topics; track topic.no) {
    <li>{{ topic.no }}. {{ topic.title }}</li>
  }
</ul>
<!-- With the two items above this produces:
     <li>1. Setup</li>
     <li>2. Interpolation</li>  -->
```

Read it piece by piece:
- `topic` is the **loop variable**: it names the current item. It exists only inside the braces.
- `of topics` is the array to go through (a property of the class).
- `track topic.no` is required. It tells Angular which value identifies each item, so when the list changes, Angular updates only the rows that changed. Choose a value that is unique for each item, like `no`.
- Inside the braces you use `{{ }}` as usual.

---

**6. Angular: `@empty` and `.length`**

`@empty` is an optional block that is shown instead of the loop when the array has no items. `topics.length` is the number of items in the array, and you can use it in `{{ }}`.

```html
<p>{{ topics.length }} topics</p>
@for (topic of topics; track topic.no) {
  <p>{{ topic.title }}</p>
} @empty {
  <p>No topics to show.</p>
}
<!-- topics has 2 items: "2 topics", then the two titles.
     topics is []: "0 topics", then "No topics to show." -->
```

`@empty` is written right after the closing brace of `@for`, on the same line.

---

**7. Angular: `$index`**

Inside `@for`, Angular gives you extra values. `$index` is the position of the current item, and the first item is `0`.

```html
@for (topic of topics; track topic.no) {
  <p>{{ $index }}: {{ topic.title }}</p>
}
<!-- 0: Setup
     1: Interpolation -->
```

Today's project does not need `$index` because each topic has its own `no`. You use it in Challenge 3.

---

**8. Angular: a class binding inside a loop**

You know `[class.name]="condition"` from Day 7. Inside `@for`, the condition can use the loop variable, so each row decides separately.

```html
<span [class.done]="topic.status === 'Completed'">{{ topic.status }}</span>
<!-- Row with status 'Completed': <span class="done">.  Other rows: no class. -->
```

---

**9. CSS: a row built with flex**

You used `display: flex` on Day 2. In a row, `align-items: center` centers items vertically and `gap` adds space between them. A child with `flex: 1` grows to fill all free space, and a child with a fixed `width` keeps it.

```css
.topic-row { display: flex; align-items: center; gap: 10px; }
.num       { width: 26px; }
.title     { flex: 1; }
```

Result: the number takes 26px, the title takes all the remaining width, and the badge sits at the right edge.

---

**10. CSS: pill badges and row lines**

A **badge** is a small label. Padding gives it room, and a `border-radius` larger than half its height gives it round ends (a pill).

```css
.badge       { background: #eeeeee; color: #777777; border-radius: 10px; padding: 2px 10px; font-size: 11px; font-weight: bold; }
.badge.done  { background: var(--mint); color: var(--green); }
```

`.badge.done` has no space between the two class names: it selects an element that has both classes. Because it is more specific than `.badge` (Day 7), it wins for completed rows.

A line between rows is a bottom border: `border-bottom: 1px solid #eef1f2;` means 1 pixel wide, solid, very light grey.

---

**11. CSS: `@media` to stack columns**

The **viewport** is the visible area of the browser window. `@media (max-width: 800px)` is a **media query**: the rules inside apply only while the viewport is 800px wide or narrower.

```css
.two-col {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

@media (max-width: 800px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}
```

On a wide window you see two columns. When you narrow the window to 800px or less, there is one column and the second card moves below the first. The 800px is the whole window width, including the sidebar.

---

**Common problems**
- Nothing appears from `@for`: the property name in `of topics` does not match the class property.
- An error that mentions `track`: every `@for` needs `track ...`.
- `@empty` shows an error: it must follow `}` of the `@for` block, not stand alone.
- Bullets and a left indent still visible: the `ul` is missing the class `topic-list`, or `list-style`, `margin` or `padding` is missing from that rule.
- Rows have no line: the `border-bottom` is on `.topic-list` instead of `.topic-row`.
- The columns do not stack when you narrow the window: the `@media` block is inside another rule, or the window is wider than 800px.

---

**Recap**
- `<ul>` holds `<li>` items. Reset the default look with `list-style: none; margin: 0; padding: 0;`.
- `@for (x of xs; track x.id) { ... }` repeats the template for each item. `@empty` shows when there are none. `$index` starts at 0.
- `[...ARR]` makes a new array with the same items, so the original list stays safe.
- Flex rows: `align-items: center`, `gap`, `flex: 1` on the part that grows.
- `@media (max-width: 800px)` applies rules only on narrow windows.

**Next:** open `requirements.md` for today's project and challenges.

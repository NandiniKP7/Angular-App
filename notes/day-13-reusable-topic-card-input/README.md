# Day 13: A Reusable Topic Card with input()

**Project today:** replace the roadmap list rows with a new component, `topic-card`, that receives its data from the catalog (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** the `<article>` element and the `<small>` element.
- **CSS:** a card list in a 2-column grid, a round number badge (`border-radius: 50%`, fixed width and height, centered text), why badge rules move to the new component's CSS file.
- **Angular:** `ng generate component topic-card`, `input()`, `input.required<number>()`, default values, reading an input with `no()`, binding a parent value to a child input with `[no]="topic.no"`.

Keep `ng serve` running. Today's topic in the app is topic 08, Parent → Child Communication with input(). A **parent** component is one whose template contains another component's tag. The **child** is the component inside that tag. Today `TopicCatalog` is the parent and `TopicCard` is the child.

---

**1. HTML: the `<article>` element**

`<article>` marks a self-contained piece of content that still makes sense on its own, like one card showing one topic. It looks the same as a `<div>` (a block with no styling), but its name tells browsers and screen readers what the content is.

```html
<article class="topic-card">
  <strong>Components</strong>
</article>
<!-- The browser shows the text "Components" in bold, on its own line. -->
```

Use `<div>` for plain layout boxes, and `<article>` when the box is one complete item (a card, a post, a topic).

---

**2. HTML: the `<small>` element**

`<small>` marks side text: a note, a label, a caption. Browsers show it in a smaller font. You will use it in Challenge 3 today and in the project tomorrow.

```html
<strong>Components</strong>
<small>Topic 3 of 8</small>
<!-- Components is bold. "Topic 3 of 8" is shown in smaller letters next to it. -->
```

---

**3. Angular: why a reusable component**

Yesterday each topic row was written inside `topic-catalog.html`. If another page needs the same topic display, you would copy the markup. A **reusable component** is one component written once and used many times, each time with different data. You already did this with `<app-sidebar />`. Today the data will change per use: the card must be told which number, title and status to show.

Create it with the CLI, in a second terminal inside `learnbuddy`:

```
ng generate component topic-card --skip-tests
```
```
CREATE src/app/topic-card/topic-card.ts
CREATE src/app/topic-card/topic-card.html
CREATE src/app/topic-card/topic-card.css
```

Read it piece by piece:
- The class is `TopicCard` and the selector is `app-topic-card`, built from the name you typed.
- `--skip-tests` stops the CLI from creating a test file, as on every day.

---

**4. Angular: `input()`**

An **input** is a property of a child component whose value is given by its parent. You create one by calling the function `input()` and importing it from `@angular/core`.

```ts
import { Component, input } from '@angular/core';

export class TopicCard {
  title = input('Untitled topic');
}
```

Read it piece by piece:
- `import { Component, input } from '@angular/core';` brings `input` into the file next to `Component`.
- `input('Untitled topic')` creates an input whose **default value** is the text in the parentheses. The default is used when the parent gives nothing.
- TypeScript infers the type from the default: `'Untitled topic'` is a string, so `title` accepts strings.

An input is not a plain string. It is a **signal**: a small container that holds a value and lets Angular notice when the value changes. For today you only need one rule: to **read** the value, call it like a function, `title()`. Never write `this.title = ...`; the child cannot change an input, only the parent can.

---

**5. Angular: reading an input in the template**

In the child's HTML, you write the input name followed by `()` inside `{{ }}`.

```html
<strong>{{ title() }}</strong>
<!-- Parent gives nothing: Untitled topic
     Parent gives 'Components': Components -->
```

Forgetting the `()` shows text like `[Signal: ...]` instead of the value.

---

**6. Angular: `input.required<T>()`**

Some data has no sensible default. A topic number is one: "Untitled number" does not exist. `input.required<number>()` makes an input that the parent **must** provide.

```ts
no = input.required<number>();
```

Read it piece by piece:
- `<number>` in angle brackets is a **generic type**: it tells TypeScript which type of value this input holds. There is no default value to infer from, so you state the type.
- If a parent uses `<app-topic-card />` without giving `no`, Angular stops with an error that says the required input `no` must be specified. This catches the mistake before the page runs.

Today's three inputs:

```ts
no = input.required<number>();
title = input('Untitled topic');
status = input('not-started');
```

---

**7. Angular: binding a parent value to a child input**

You know `[src]="angularIcon"` from Day 6: square brackets set a property from a class value. The same syntax sets a child's input. In the parent's HTML:

```html
<app-topic-card [no]="topic.no" [title]="topic.title" [status]="topic.status" />
<!-- topic is { no: 3, title: 'Components', status: 'in-progress' }
     so the child receives no = 3, title = 'Components', status = 'in-progress' -->
```

Read it piece by piece:
- `[no]` is the child's input name. `"topic.no"` is an expression evaluated in the parent.
- Without brackets, the value is a plain string: `status="done"` gives the text `done`. With brackets it is an expression: `[no]="9"` gives the number 9.
- Data goes one way: parent to child.

The parent must also list the child in its own `imports` array, or Angular does not know the tag `app-topic-card`.

---

**8. Angular: the card inside `@for`**

```html
<div class="cards">
  @for (topic of visibleTopics(); track topic.no) {
    <app-topic-card [no]="topic.no" [title]="topic.title" [status]="topic.status" />
  } @empty {
    <p class="empty">No topics to show.</p>
  }
</div>
```

The loop makes one card per topic, and each card gets its own values. The `@switch` for the badge text (Day 12) now lives inside the card's HTML, so the card decides how a status looks.

---

**9. CSS: the round number badge**

A circle is a square with `border-radius: 50%` (half the side on every corner).

```css
.no {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 50%;
  background: var(--mint);
  color: var(--green);
  font-weight: bold;
}
```

Read it piece by piece:
- `width: 36px; height: 36px;` make a square. `border-radius: 50%` rounds it into a circle.
- `display: flex; align-items: center; justify-content: center;` centers the number inside the circle, up-down and left-right.
- `flex: none;` stops the circle from shrinking when the title is long (Day 2).

---

**10. CSS: a 2-column grid of cards**

You used grid on Day 5. `repeat(2, 1fr)` makes two columns of equal width, and cards fill the cells from left to right, then the next row.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (max-width: 800px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
```

Eight cards make four rows of two. At 800px or narrower there is one column of eight cards. The card tag `<app-topic-card>` needs no `display: block` here: a direct child of a grid container is laid out as a block automatically.

---

**11. CSS: styles belong to the component that shows them**

Each component's CSS file applies only to that component's own HTML (Day 4). The classes `.badge`, `.badge.done` and `.badge.progress` are now used in `topic-card.html`, so their rules move to `topic-card.css`. The same for `.num` and `.title`, replaced by `.no` and the `strong` inside `.body`. If you leave the old rules in `topic-catalog.css`, nothing breaks, but they do nothing: remove them to keep the file honest. `topic-catalog.css` keeps the rules for what it still shows: `.sub`, `.actions`, `.chips`, `.chip`, `.empty` and the new `.cards`.

---

**Common problems**
- `'app-topic-card' is not a known element`: `TopicCard` is missing from `imports` in `topic-catalog.ts`, or the import line is wrong.
- Error about a required input `no`: a `<app-topic-card ... />` tag has no `[no]="..."`.
- The card shows `[Signal: ...]`: you wrote `{{ no }}` instead of `{{ no() }}`.
- Every card says `Untitled topic`: the `[title]="topic.title"` binding is missing, or you wrote `title="topic.title"` without brackets (that gives the literal text `topic.title`).
- Every badge says `Not started`: the `[status]="topic.status"` binding is missing, or the `@case` text does not match the codes `'done'` and `'in-progress'`.
- Badges are unstyled: the `.badge` rules are still in `topic-catalog.css` and not in `topic-card.css`.
- Cards stay in one column on a wide window: `grid-template-columns` is missing from `.cards`, or the `@media` block is inside another rule.

---

**Recap**
- `<article>` is one complete item; `<small>` is side text.
- `input('default')` is an optional input; `input.required<number>()` must be given by the parent. Read both with `()`.
- Parent sets a child input with `[name]="expression"`; the child is listed in the parent's `imports`.
- A round badge: equal `width` and `height`, `border-radius: 50%`, flex to center, `flex: none`.
- `repeat(2, 1fr)` makes a 2-column grid; a media query makes it one column on narrow windows.
- A component's CSS holds the rules for its own HTML.

**Next:** open `requirements.md` for today's project and challenges.

# Day 15: Card Controls and output()

**Project today:** each topic card gets three small buttons (Open, Complete, Review) that tell the catalog what happened (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** a group of buttons inside a card, and the `disabled` attribute on one of them.
- **CSS:** small action buttons, `flex-wrap` so buttons move to a new line when the space is too narrow, a `:disabled` style, and scoped CSS when two components use the same class name.
- **Angular:** `output<T>()`, `.emit()`, listening with `(event)="handler($event)"`, changing state in the parent, and an immutable update with `.map()` and the spread operator. TypeScript: an arrow function with a return type, `(topic): Topic =>`, and the ternary `? :`.

Keep `ng serve` running. Today's topic in the app is topic 09, Child → Parent Communication with output(). A **parent** component contains another component in its template (`TopicCatalog` contains `TopicCard`). The contained one is the **child**.

---

**1. Angular: data goes down, events go up**

On Days 13 and 14 the parent gave data to the child with `input()`, and the child could only show it. Today the child must tell the parent that something happened (a button was clicked). A child cannot change the parent's data directly. Instead the child **sends an event** and the parent decides what to do. This is done with `output()`.

```
TopicCatalog (parent)  ---- [topic]="topic" ---->  TopicCard (child)    data goes down (input)
TopicCatalog (parent)  <--- (opened)="..." ------  TopicCard (child)    events go up (output)
```

---

**2. Angular: declaring an output**

An **output** is a named event that a component can send. You create it with `output()` and the type of the value it sends.

```ts
import { Component, output } from '@angular/core';

export class TopicCard {
  opened = output<number>();
}
```

Read it piece by piece:
- `output` must be imported from `@angular/core`, like `input`.
- `opened` is the name of the event. The parent will listen to it with `(opened)`.
- `<number>` is a **generic type argument**: the angle brackets say what type of value travels with the event. Here the event carries one number (the topic number). The same idea was `input.required<Topic>()` on Day 14.
- There is nothing inside `output<number>()` to put in the parentheses: an output has no starting value.

---

**3. Angular: sending the event with `.emit()`**

`.emit(value)` sends the event, with the value, to the parent. You call it from the child's template when a button is clicked.

```html
<button (click)="opened.emit(topic().no)">Open</button>
<!-- Click: the card sends the event "opened" with the number, for example 3. -->
```

Read it piece by piece:
- `(click)` is the event binding from Day 8: when the button is clicked, run the code in quotes.
- `opened.emit(...)` sends the event.
- `topic().no` is the number of the topic this card shows. `topic` is an input (a signal-based input), so you read it with `()`, as on Days 13 and 14.

Today's card has three outputs: `opened`, `completed` and `reviewRequested`. Each one carries the topic number.

---

**4. Angular: listening in the parent with `$event`**

The parent uses the same round-bracket syntax as a click, but with the output name. `$event` is the value that was sent with `.emit()`.

```html
<app-topic-card [topic]="topic" (opened)="onOpen($event)" />
<!-- The card emits 3  ->  Angular runs onOpen(3). -->
```

```ts
onOpen(no: number): void {
  this.lastAction = 'Opened topic ' + no;
}
```

Read it piece by piece:
- `(opened)` listens to the card's `opened` output.
- `$event` is not a mouse click here. It is whatever `.emit()` sent: the number.
- `onOpen(no: number)` is a method in the parent class. Its parameter `no` receives that number, so the type `number` matches `output<number>()`.
- `lastAction` is a string property in the parent. The template shows it with `{{ lastAction }}`, so the text on screen changes after each click.

---

**5. Angular: changing one object without editing it (`.map` and spread, TypeScript)**

When Complete is clicked, the parent must change one topic: its status becomes `'done'` and its finished subtopics become all of them. We do not edit the old object. We build a **new array** that has a **new object** for that one topic. Doing it this way is an **immutable update** (immutable means "not changed after creation").

```ts
this.topics = this.topics.map((topic): Topic =>
  topic.no === no
    ? { ...topic, status: 'done', subtopicsDone: topic.subtopicsTotal }
    : topic
);
```

Read it piece by piece:
- `.map(...)` goes through an array and builds a **new array of the same length**. For each item it runs the function you give it and puts the result in the new array.
- `(topic): Topic => ...` is an **arrow function**: `topic` is the current item, and `: Topic` after the parentheses is the **return type**, meaning the function always gives back a `Topic`. This makes TypeScript check that `status: 'done'` is one of the allowed `TopicStatus` values.
- `condition ? a : b` is the **ternary**: if the condition is true the result is `a`, otherwise `b`. Here: if this is the topic that was clicked, give the changed copy; otherwise give the same topic back unchanged.
- `{ ...topic, status: 'done', ... }` uses **spread** on an object: it copies every property of `topic`, and the properties written after it replace the copied ones. The result is a new object with the same `no` and `title`, but a new `status` and `subtopicsDone`.

Why not edit the old object: the card receives its topic through `[topic]="topic"`. A new object tells Angular the input has a new value, so the card shows the new badge, bar and counts. The constant `ANGULAR_TOPICS` is never changed either, so `Restore list` still brings back the original data.

---

**6. HTML: a group of buttons**

A `<button>` is an element the user clicks. Several buttons that belong together are placed in one `<div>`, which gives you one element to style as a group. The `disabled` attribute (Day 6) switches a button off.

```html
<div class="actions">
  <button>Open</button>
  <button [disabled]="topic().status === 'done'">Complete</button>
</div>
<!-- For a topic with status 'done' the Complete button is disabled: it cannot be clicked. -->
```

Here `[disabled]` is a property binding (Day 6): the button is disabled when the condition is true.

---

**7. CSS: small buttons that wrap**

`flex-wrap: wrap` lets flex items move to a new line when they do not fit. Without it, a flex row squeezes the items into one line.

```css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.actions button {
  background: white;
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
```

Read it piece by piece:
- `display: flex` puts the three buttons in a row; `gap: 6px` is the space between them (Day 2).
- `flex-wrap: wrap` moves a button to a second line if the card is too narrow.
- `.actions button` selects only buttons inside an element with the class `actions`.
- The small `padding` and `font-size: 12px` make the buttons smaller than the green buttons used elsewhere.

---

**8. CSS: the `:disabled` state**

`:disabled` selects a button that has the `disabled` attribute (Day 6).

```css
.actions button:disabled {
  color: #aab7bd;
  cursor: not-allowed;
}
```

The text of a disabled button turns light grey, and the mouse pointer shows a "not allowed" sign.

---

**9. CSS: scoped styles with the same class name**

On Day 4 you learned that a component's CSS file applies only to that component's own template. This is called **scoped CSS** (also **view encapsulation**). Today there is a class `actions` in two components: the catalog has `Clear list` and `Restore list` in `<div class="actions">`, and the card has its three buttons in `<div class="actions">`. The two `.actions` rules do not affect each other, because each CSS file applies only to its own component. You can reuse a class name safely in different components.

---

**Common problems**
- Nothing happens on click: check that the event name in the parent, `(opened)`, matches the output name in the child exactly (case matters).
- Error `Property 'opened' does not exist`: the `output` line is missing in `topic-card.ts`, or you forgot `output` in the import line.
- Error about `$event` type: the method parameter type (`no: number`) must match the type in `output<number>()`.
- The row does not change after Complete: you must assign the new array (`this.topics = this.topics.map(...)`); `.map` alone does nothing.
- All three buttons stay in one squeezed line: `flex-wrap: wrap` is missing from `.actions` in `topic-card.css`.
- The catalog buttons look unstyled: you added the card's `.actions` rules to the wrong CSS file.

---

**Recap**
- `output<T>()` declares an event; `.emit(value)` sends it; the parent listens with `(name)="handler($event)"` where `$event` is the value.
- Data goes down with `input()`, events go up with `output()`.
- The parent changes its own data. To change one item, `.map()` builds a new array and `{ ...topic, ... }` builds a new object.
- `(topic): Topic =>` is an arrow function with a return type; `a ? b : c` is the ternary.
- `flex-wrap: wrap` lets buttons use a second line; `:disabled` styles a disabled button.
- The same class name in two components does not clash, because CSS is scoped.

**Next:** open `requirements.md` for today's project and challenges.

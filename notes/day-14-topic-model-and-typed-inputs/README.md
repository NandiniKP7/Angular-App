# Day 14: Topic Model and Typed Inputs

**Project today:** describe a topic with one TypeScript type, move the data to its own file, and give the card one object input, a progress bar and a `compact` option (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** `<small>` for a side note and the progress-bar markup (a `<div>` inside a `<div>`).
- **CSS:** reusing the bar rules from Day 7, and a `.compact` rule that overrides an earlier rule because it comes later.
- **Angular:** an object input `input.required<Topic>()`, the `booleanAttribute` transform, a `[compact]` flag, `@if (!compact())`, a method that reads an input.
- **TypeScript:** `interface`, the union type `TopicStatus`, the typed array `Topic[]`, `export` and `import` between files.

Keep `ng serve` running. Today's topic in the app is still topic 08, Parent → Child Communication with input(). The screen looks like Day 13, with one addition: each card shows `Subtopics: 2 / 5` and a green progress bar.

---

**1. TypeScript: `interface`**

An **interface** is a named description of the shape of an object: which property names it has and the type of each. It exists only for TypeScript's checks; it creates nothing at run time.

```ts
export interface Topic {
  no: number;
  title: string;
  status: TopicStatus;
  subtopicsDone: number;
  subtopicsTotal: number;
}
```

Read it piece by piece:
- `interface Topic { ... }` names the shape `Topic`.
- Each line is `propertyName: type;`. An object is a valid `Topic` only if it has all five properties with those types.
- `status: TopicStatus` uses a type that is defined in the next concept (concept 2). For now read it as "one of three allowed texts".
- `{ no: 1, title: 'Setup' }` is not a `Topic`: three properties are missing, and TypeScript marks the error.

---

**2. TypeScript: a union type**

A **union type** lists the exact values (or types) that are allowed, separated by `|` (read it as "or"). A `type` line gives the union a name.

```ts
export type TopicStatus = 'done' | 'in-progress' | 'not-started';
```

Now a variable of type `TopicStatus` can only hold one of those three texts. `'finished'` is an error that shows in the editor and in the terminal: `Type '"finished"' is not assignable to type 'TopicStatus'`. Typing the codes in a union removes typing mistakes such as `'in progress'` with a space.

---

**3. TypeScript: a typed array and `export` / `import`**

`Topic[]` means "an array in which every item is a `Topic`".

```ts
import { Topic } from '../models/topic';

export const ANGULAR_TOPICS: Topic[] = [
  { no: 1, title: 'Angular Application Setup & Architecture', status: 'done', subtopicsDone: 6, subtopicsTotal: 6 }
];
```

Read it piece by piece:
- `export` makes a name usable from other files. `import { Topic } from '../models/topic';` brings it in. `'../models/topic'` is a path: `..` means "go up one folder" (from `data/` to `app/`), then into `models/`, file `topic` (no `.ts` written).
- `: Topic[]` after the name is the type you write yourself. Now each object is checked: a wrong `status` text or a missing property is an error.
- Today you create two new folders in `src/app/`: `models/` (the types) and `data/` (the topic list). Neither is a component, so there is no `ng generate`: you create the files by hand.

---

**4. Angular: one object input**

Yesterday the card had three inputs (`no`, `title`, `status`). With `Topic` we can pass the whole object as one input.

```ts
import { Topic } from '../models/topic';

topic = input.required<Topic>();
```

Read it piece by piece:
- `<Topic>` is the generic type from Day 13: the input holds a `Topic` object. It is required, so the parent must give it.
- In the template, read the object with `topic()`, then a property with a dot: `topic().title`.
- In the parent, one binding sends everything: `<app-topic-card [topic]="topic" />`. The `topic` on the right is the loop variable of `@for`.

```html
<strong>{{ topic().title }}</strong>
<!-- topic() is { no: 3, title: 'Components', ... }  ->  Components -->
```

---

**5. Angular: a method that reads an input**

A method in the card class can read an input with `()` like the template does. Today's `percent()` turns two numbers into a whole percent.

```ts
percent(): number {
  const topic = this.topic();
  if (topic.subtopicsTotal === 0) {
    return 0;
  }
  return Math.round((topic.subtopicsDone / topic.subtopicsTotal) * 100);
}
// Components: 2 done of 5 -> 2 / 5 = 0.4 -> 0.4 * 100 = 40 -> 40
```

Read it piece by piece:
- `const topic = this.topic();` reads the input once and gives it a short local name (a `const` inside a method exists only in that method).
- The `if` stops a division by zero: with a total of 0 the answer is 0.
- `Math.round(...)` rounds to the nearest whole number. `: number` says the method returns a number.
- In the template, a method is called with `()`: `percent()`.

---

**6. Angular: the `booleanAttribute` transform and `compact`**

In HTML, a **boolean attribute** is written by name only, like `disabled`. If it is there, it is on. We want the same for our own flag: `<app-topic-card compact />`. A plain `input(false)` would receive the text `''` (empty string) from that attribute, which is not `true`. A **transform** is a function that converts the value the parent writes into the value the child stores. `booleanAttribute` is a function from Angular that does this conversion.

```ts
import { Component, booleanAttribute, input } from '@angular/core';

compact = input(false, { transform: booleanAttribute });
```

Read it piece by piece:
- `false` is the default. The second argument `{ transform: booleanAttribute }` is an options object.
- `booleanAttribute` turns `compact` (name only) into `true`, `compact="false"` into `false`, and keeps real booleans as they are.

```html
<app-topic-card [topic]="topic" />            <!-- compact is false -->
<app-topic-card [topic]="topic" compact />    <!-- compact is true  -->
<app-topic-card [topic]="topic" [compact]="topic.no > 3" />  <!-- true for topics 4 to 8 -->
```

In today's project the catalog does not use `compact`; you try it in Challenge 1.

---

**7. Angular: `@if` with `!`**

`!` means **not**: it turns `true` into `false` and `false` into `true`. `@if (!compact()) { ... }` shows its block when `compact()` is `false`.

```html
@if (!compact()) {
  <small>Subtopics: {{ topic().subtopicsDone }} / {{ topic().subtopicsTotal }}</small>
}
<!-- compact false: the line is shown.  compact true: nothing is shown. -->
```

The class binding `[class.compact]="compact()"` (Day 7) adds the class `compact` to the card when the flag is on.

---

**8. HTML: `<small>` and the progress bar**

You built a bar on Day 7 from two nested `<div>` elements. The outer one is the track, the inner one is the filled part, and its width is a percent.

```html
<div class="bar" [attr.aria-label]="'Progress ' + percent() + ' percent'">
  <div class="bar-fill" [style.width.%]="percent()"></div>
</div>
<!-- percent() is 40: the green part fills 40% of the grey track.
     aria-label becomes "Progress 40 percent" for screen readers. -->
```

`[style.width.%]="percent()"` sets the inline style `width` in percent (Day 7). `[attr.aria-label]` sets an attribute that has no property of its own (Day 7). `<small>` shows the text `Subtopics: 2 / 5` in smaller letters.

---

**9. CSS: reuse the bar, and a later rule wins**

The bar rules are the same ideas as Day 7, written again in `topic-card.css` because each component has its own CSS file.

```css
.bar {
  height: 8px;
  margin-top: 6px;
  background: #dde7e5;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--green);
}

.compact {
  padding: 8px 12px;
}
```

Read it piece by piece:
- `overflow: hidden` cuts the fill at the track's rounded corners.
- `height: 100%` makes the fill as tall as the track.
- `.topic-card` and `.compact` both set `padding` and have the same specificity (one class each). When specificity is equal, the rule that comes later in the file wins, so `.compact` must be after `.topic-card`. It is at the end of the file today.

---

**Common problems**
- `Cannot find module '../models/topic'`: the file is not at `src/app/models/topic.ts`, or the path has a typo.
- `Type '"..."' is not assignable to type 'TopicStatus'`: a status text in the data is not one of the three codes.
- `Property 'subtopicsDone' is missing`: an object in `ANGULAR_TOPICS` lacks one of the five properties.
- Error that `no` is not a known input: the parent still has `[no]`, `[title]`, `[status]`. Use `[topic]="topic"` only.
- Bar always empty or `NaN%`: you wrote `percent` without `()`, or the property names in `percent()` do not match the interface.
- `export` forgotten: an error says the module "has no exported member".
- `compact` has no effect: `booleanAttribute` is not imported, or `{ transform: booleanAttribute }` is missing.

---

**Recap**
- `interface Topic { ... }` describes an object; `type TopicStatus = 'a' | 'b'` limits the allowed texts; `Topic[]` is an array of topics.
- `export` in one file and `import { X } from '../folder/file'` in another share a type or data.
- `input.required<Topic>()` takes one object; read with `topic().title`.
- `input(false, { transform: booleanAttribute })` lets the parent write `compact` by name.
- `@if (!compact()) { ... }` shows the block when `compact()` is false.
- The bar is two nested `<div>`s; `[style.width.%]` sets the fill.

**Next:** open `requirements.md` for today's project and challenges.

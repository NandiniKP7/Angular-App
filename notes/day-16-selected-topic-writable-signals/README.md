# Day 16: Selected Topic and Writable Signals

**Project today:** clicking `Open` on a card selects that topic and shows it in a `Selected topic` panel; the catalog's data moves from plain properties into signals (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** nothing new. A plain `<div>` holds text with a `<strong>` inside it, and Angular decides which text it shows.
- **CSS:** a highlighted panel (`margin-top`, `padding`, `background`, `border-radius`), and why the class name `.selected` can be used again in this component.
- **Angular:** `signal()` and `signal<T>()`, reading with `x()`, changing with `.set()`, why Angular tracks signals, and `@if (x(); as t)`. TypeScript: the union types `number | null` and `Topic | undefined`, and `.find()`.

Keep `ng serve` running. Today's topic in the app is topic 10, Writable Signals.

---

**1. Angular: what is a signal, and why use one**

Until today `TopicCatalog` kept its data in ordinary class properties, such as `filter: string = 'all';`. A **signal** is a special container for a value. Angular watches it: when the template reads a signal, Angular records "this part of the screen depends on that signal". When the value is later changed, Angular updates exactly those parts of the screen.

A signal that you can change is called a **writable signal**. You create it with `signal()`.

```ts
import { signal } from '@angular/core';

filter = signal('all');
// filter holds the value 'all'. It is a signal, not a string.
```

Read it piece by piece:
- `signal` must be imported from `@angular/core`.
- `signal('all')` creates the signal; the value in the parentheses is the **starting value**.
- TypeScript infers the type from the starting value: this is a signal that holds a `string`.

---

**2. Angular: giving the signal a type with `signal<T>()` (TypeScript)**

Sometimes the starting value does not show the whole type. An empty list `[]` could hold anything, and `null` does not say what could come later. You write the type between `<` and `>`. This is a **generic type argument**: it tells `signal` what type of value it will hold.

```ts
topics = signal<Topic[]>([...ANGULAR_TOPICS]);   // holds a list of Topic objects
filter = signal<string>('all');                  // holds a string
selectedNo = signal<number | null>(null);        // holds a number, or null
lastAction = signal<string>('Nothing yet');      // holds a string
```

Read it piece by piece:
- `Topic[]` means "an array of `Topic` objects" (the `Topic` type from Day 14).
- `number | null` is a **union type**: the value is either a `number` or `null`. `null` means "no value". At the start no topic is selected, so `selectedNo` starts as `null`; after `Open` it holds the topic number.
- `signal<string>('all')` has the same meaning as `signal('all')`. Writing `<string>` is optional when the type is obvious; we write it here for clarity.

---

**3. Angular: reading a signal with `x()`**

A signal is read by **calling it like a function**: write its name followed by `()`. The name without `()` is the signal container, not its value.

```ts
this.filter()              // 'all'
this.topics().length       // 8
this.topics()              // the array of 8 topics
```

```html
<p class="sub">{{ topics().length }} of 44 topics shown</p>
<!-- topics() is the array, .length is 8: "8 of 44 topics shown" -->
```

Reading with `()` is how Angular notices which template parts depend on the signal (concept 1). It works the same in the class and in the template. You already did this with `topic()` on Days 13-15, because inputs are signals as well.

---

**4. Angular: changing a signal with `.set()`**

`.set(newValue)` replaces the value of a writable signal. Angular then updates every part of the screen that read it.

```ts
setFilter(value: string): void {
  this.filter.set(value);       // before: this.filter = value;
}

clear(): void {
  this.topics.set([]);          // before: this.topics = [];
}
```

Read it piece by piece:
- `this.filter.set(value)` has no `()` after `filter`, because you are using the signal itself, not reading it.
- Never write `this.filter = value;` any more. That would replace the signal with a plain string and break the code.
- The new value must have the signal's type: `this.selectedNo.set('3')` is an error because `selectedNo` holds a number or `null`.

Today's `onComplete` still builds a new array with `.map()` (Day 15), and then hands it to `.set()`:

```ts
this.topics.set(
  this.topics().map((topic): Topic => /* same as Day 15 */)
);
```

---

**5. Angular: `.find()` and `Topic | undefined` (TypeScript)**

`.find(function)` goes through an array and returns **the first item** for which the function gives `true`. If no item matches, it returns `undefined` (meaning "nothing found"). So the type of the result is `Topic | undefined`: a `Topic`, or `undefined`.

```ts
selectedTopic(): Topic | undefined {
  return this.topics().find(topic => topic.no === this.selectedNo());
}
// selectedNo() is 3  ->  the topic object with no 3
// selectedNo() is null, or no topic has that number  ->  undefined
```

Read it piece by piece:
- `topic => topic.no === this.selectedNo()` is an arrow function (Day 11): it gets one topic and answers true or false.
- The method reads two signals, `topics()` and `selectedNo()`. When a template calls `selectedTopic()`, Angular tracks both reads, so the panel updates when either signal changes.
- The return type `Topic | undefined` tells TypeScript, and you, that the answer may be missing.

We store only the **number** of the selected topic (`selectedNo`), not the whole object. Then, when `Complete` replaces the topic with a changed copy, `find` returns the new copy, and the panel shows the new status.

---

**6. Angular: `@if (x(); as t)`**

`@if` can give a name to its condition value with `; as name`. Inside the braces, the name holds the value, and its type no longer includes `undefined`.

```html
@if (selectedTopic(); as chosen) {
  <div class="selected">Selected topic: <strong>{{ chosen.title }}</strong> ({{ chosen.status }})</div>
} @else {
  <div class="selected">Selected topic: none. Click Open on a card.</div>
}
<!-- selectedTopic() found topic 3: Selected topic: Components (in-progress)
     selectedTopic() is undefined:  Selected topic: none. Click Open on a card. -->
```

Read it piece by piece:
- The condition `selectedTopic()` is true when a topic object was found, and false when it is `undefined`.
- `as chosen` stores the found topic in the name `chosen`, so you can write `chosen.title` without calling the method again.
- `@else` is shown when there is no topic.

---

**7. Angular: a method that reads signals still works in the template**

`visibleTopics()` is still a method. Inside it, `this.filter()` and `this.topics()` are reads. Angular tracks reads while the template runs, so the card list updates when `filter` or `topics` changes. You do not need to change the method's idea, only add `()` to each signal read and use `.set()` to write.

---

**8. HTML: text with a `<strong>` inside a `<div>`**

A `<div>` is a generic box (Day 1). `<strong>` marks text as important and shows it bold. You can mix plain text and `<strong>` in one `<div>`.

```html
<div class="selected">Selected topic: <strong>Components</strong> (in-progress)</div>
<!-- Selected topic: Components (in-progress)   with "Components" in bold -->
```

There is no new element today. Angular chooses which of two `<div>` blocks is on the page.

---

**9. CSS: a highlighted panel**

A **panel** is a box that stands out from the content around it. Four properties build today's panel:

```css
.selected {
  margin-top: 12px;
  padding: 10px 14px;
  background: var(--mint);
  border-radius: 10px;
  font-size: 14px;
}
```

Read it piece by piece:
- `margin-top: 12px;` is empty space outside the top edge, so the panel does not touch the cards above.
- `padding: 10px 14px;` is space inside: 10px above and below, 14px left and right (box model, Day 2).
- `background: var(--mint);` is the light green from `styles.css`.
- `border-radius: 10px;` rounds the corners.

`TrackCards` also has a `.selected` class (Days 8-9). The two do not clash: component CSS is scoped (Day 4), and the catalog's `.actions` and the card's `.actions` from Day 15 are separate for the same reason.

---

**Common problems**
- Error such as `Property 'length' does not exist on type 'WritableSignal<Topic[]>'`: you wrote `topics.length` instead of `topics().length`. Add `()`.
- Text like `[Signal: all]` or a function shown on screen: you wrote `{{ filter }}` instead of `{{ filter() }}`.
- `Type 'string' is not assignable to type 'WritableSignal<string>'`: you wrote `this.filter = value;`. Use `this.filter.set(value);`.
- The panel always says `none`: `onOpen` must call `this.selectedNo.set(no);`, and the card tag must have `(opened)="onOpen($event)"`.
- Error about `undefined` when using `chosen`: the `@if` needs `; as chosen` after `selectedTopic()`.
- The `.selected` panel has no color: the rule is in the wrong CSS file. It belongs in `topic-catalog.css`.

---

**Recap**
- A signal holds a value that Angular watches. `signal(start)` or `signal<T>(start)` creates it.
- Read with `x()` (class and template). Change with `x.set(value)`.
- `number | null` and `Topic | undefined` are union types: a value or "nothing".
- `.find(...)` returns the first match or `undefined`. `@if (x(); as t) { ... } @else { ... }` names the found value.
- Store the selected topic's `no`, and compute the topic from the list with `find`.
- A highlighted panel uses `margin-top`, `padding`, `background` and `border-radius`.

**Next:** open `requirements.md` for today's project and challenges.

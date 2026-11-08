# Day 03: Welcome and String Interpolation

**Topic today:** 02 String Interpolation (Angular roadmap)
**Project today:** the LearnBuddy shell shows real data from the class (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **Angular:** class properties with types, `{{ }}` interpolation, expressions, calling a method inside `{{ }}`, today's weekday from `new Date()`
- **HTML:** heading levels, `<strong>`, `<small>`, `<section>`
- **CSS:** custom properties (`:root`, `var()`), typography (`font-size`, `font-weight`, `letter-spacing`), `display: block` on inline elements, cards (`border`, `border-radius`), `margin-top: auto`

Keep `ng serve` running. Today you edit `src/styles.css`, `src/app/app.ts`, `src/app/app.html` and `src/app/app.css`.

---

**1. Angular: a class property with a type**

A **class** is a block of code that groups data and actions. Your `App` class in `app.ts` is the class behind the page. A **property** is one named piece of data inside the class. A **type** says what kind of value the property holds: `string` is text (written in quotes), `number` is a number (no quotes).

```ts
export class App {
  appName: string = 'LearnBuddy';
  topicsDone: number = 2;
}
```

Read it piece by piece:
- `appName` is the property name.
- `: string` is the type. The property can only hold text.
- `= 'LearnBuddy'` is the starting value.
- The line ends with `;`.

---

**2. Angular: `{{ }}` shows a value in the page**

The **template** is the HTML file of a component (`app.html`). **Interpolation** means writing `{{ name }}` in the template: Angular replaces it with the current value of the property `name` from the class.

```html
<div class="brand">{{ appName }}</div>
<!-- The page shows: LearnBuddy -->
```

The text outside `{{ }}` stays as written. You can mix both:

```html
<h3>Welcome to {{ appName }}</h3>
<!-- The page shows: Welcome to LearnBuddy -->
```

Inside `{{ }}` you write the property name only, with no `this.`.

---

**3. Angular: an expression inside `{{ }}`**

An **expression** is a piece of code that produces one value. Angular evaluates it and shows the result. You can use several `{{ }}` in one element.

```html
<span>{{ topicsDone }} of {{ topicsTotal }}</span>
<!-- With topicsDone = 2 and topicsTotal = 44, the page shows: 2 of 44 -->
<span>{{ topicsDone + 1 }}</span>
<!-- The page shows: 3 -->
```

Rules: use property names, operators (`+`, `-`, `*`, `/`, `===`) and method calls. Do not use assignments (`x = 5`) or the word `new`. A template can read only the properties and methods of its own class. It cannot use `Math` or `Date` directly, so calculations go in the class.

---

**4. Angular: calling a method inside `{{ }}`**

A **method** is a function inside a class. Its **return type** (after the `:`) says what kind of value it gives back. Inside a method you reach the class's properties with `this.`, so `this.topicsDone` means "the `topicsDone` property of this class".

```ts
percentDone(): number {
  return Math.round((this.topicsDone / this.topicsTotal) * 100);
}
```

```html
<span>{{ percentDone() }}%</span>
<!-- 2 / 44 = 0.04545..., times 100 = 4.545..., Math.round gives 5. The page shows: 5% -->
```

Read it piece by piece:
- `percentDone(): number` is a method with no inputs that returns a number.
- `this.topicsDone / this.topicsTotal` divides 2 by 44.
- `* 100` turns the fraction into a percentage.
- `Math.round(...)` rounds to the nearest whole number.
- In the template you write the parentheses: `percentDone()`. Without `()` the method is not called.

---

**5. Angular: today's weekday from `new Date()`**

`new Date()` creates an object holding the current date and time. Its method `toLocaleDateString` writes the date as text.

```ts
weekday: string = new Date().toLocaleDateString('en-US', { weekday: 'long' });
// On a Friday the value is: 'Friday'
```

Read it piece by piece:
- `new Date()` is "now".
- `'en-US'` is the **locale**: the language and region used for the text.
- `{ weekday: 'long' }` is an **options object**: it asks for only the weekday, written in full. `'short'` would give `'Fri'`.
- The value is calculated once, when Angular creates the component. It does not change until you reload the page.

---

**6. HTML: heading levels**

HTML has six heading elements: `<h1>` to `<h6>`. The number is the **level**: it says how important the heading is in the page structure (1 is the main title, 2 is a section of the page, 3 is inside a section). Pick the level for the structure, not for the size. You change the size with CSS.

```html
<h2>My Learning</h2>
<h3>Welcome to LearnBuddy</h3>
```

Today the header uses `<h2>` and the welcome card uses `<h3>`. Browsers give each level a default size and default margins (empty space around it).

---

**7. HTML: `<strong>`, `<small>`, `<section>`**

- `<strong>` marks text as important. Browsers show it bold.
- `<small>` marks side text, such as a label. Browsers show it smaller.
- `<section>` groups content that belongs together, usually with a heading inside. It shows nothing by itself.

```html
<section class="card">
  <small>TODAY'S BUILD</small>
  <strong>String Interpolation</strong>
</section>
```

---

**8. CSS: custom properties with `:root` and `var()`**

A **custom property** is a name you invent that holds a value. Its name starts with `--`. You write it like a normal property inside a rule, and you read it with `var(--name)`. `:root` is a selector that matches the top element of the page (`<html>`). Custom properties set on `:root` can be read by every element.

```css
:root {
  --green: #15965f;
}

.badge {
  color: var(--green);
}

.save {
  background: var(--green);
}
/* Both rules use #15965f. Change the one line in :root and both change. */
```

Why it matters: LearnBuddy uses the same colors in many places. Today the nine colors live in `src/styles.css`, and every component reads them with `var()`.

---

**9. CSS: typography**

**Typography** means how text looks.

```css
.label {
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.06em;
}
```

Read it piece by piece:
- `font-size: 11px` sets the size of the letters in pixels.
- `font-weight: bold` makes the letters thick. You can also use numbers from 100 to 900 (`bold` is 700).
- `letter-spacing: 0.06em` adds extra space between letters. `em` means "times the font size", so 0.06em at 11px adds 0.66px between letters.

`font-family` is a list: `font-family: 'Segoe UI', Arial, sans-serif;`. The browser uses the first font it finds on the computer. `sans-serif` is the last choice and means "any font without small decorations". Names that contain a space go in quotes.

---

**10. CSS: inline and block elements**

Every element has a **display** type. A **block** element starts on a new line and is as wide as its parent (`<div>`, `<p>`, `<h3>`). An **inline** element stays inside a line of text and is only as wide as its content (`<span>`, `<small>`, `<strong>`, `<a>`).

```html
<small>TODAY'S BUILD</small>
<strong>String Interpolation</strong>
<!-- Both inline: they appear on one line: TODAY'S BUILD String Interpolation -->
```

```css
small {
  display: block;
}
/* Now <small> is a block: it takes its own line, and <strong> appears on the next line. */
```

---

**11. CSS: a card with `border` and `border-radius`**

```css
.card {
  background: white;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
}
```

Read it piece by piece:
- `border: 1px solid var(--line)` is a shorthand for three values in this order: width, style (`solid` is a plain line), color.
- `border-radius: 14px` rounds the corners. A larger number gives rounder corners.
- `padding: 16px` is the space between the border and the content (Day 02).

Put this rule in `src/styles.css` (the **global** file): it applies to the whole app, so any element in any component can use `class="card"`. Rules in `app.css` apply only to `App` (you will see why on Day 04).

---

**12. CSS: `margin-top: auto` pushes an item to the bottom**

`display: flex` (Day 02) lays children in a row. `flex-direction: column` lays them from top to bottom instead. A container that is taller than its children has free space left over. A margin set to `auto` takes all of that free space.

```css
.box {
  display: flex;
  flex-direction: column;
  min-height: 300px;
}

.last {
  margin-top: auto;
}
```

```html
<div class="box">
  <p>First</p>
  <p>Second</p>
  <p class="last">Last</p>
</div>
<!-- "First" and "Second" are at the top. "Last" sits at the bottom of the 300px box. -->
```

The sidebar uses this: `.sidebar` is a column, and `.side-footer` has `margin-top: auto`, so the footer sits at the bottom.

---

**Common problems**
- The page shows an error that says `Property 'appNme' does not exist on type 'App'`: the name in `{{ }}` has a typo. Copy the name from `app.ts`.
- The page shows code text, or an error, instead of a number: you wrote `{{ percentDone }}`. Add the parentheses: `{{ percentDone() }}`.
- TypeScript says `Cannot find name 'topicsDone'`: inside a method you must write `this.topicsDone`.
- A color does not change: a typo in `var(--grn)` is ignored silently. Check the name against `styles.css`.
- Your weekday differs from `ui.svg`: the page always shows today's weekday.

**Recap**
- A class property has a name, a type and a value: `topicsDone: number = 2;`.
- `{{ name }}` shows a property; `{{ method() }}` shows what a method returns.
- Calculations go in the class; the template only shows the result.
- Custom properties (`--name` in `:root`, read with `var(--name)`) keep colors in one place.
- `small` is inline; `display: block` gives it its own line.
- `margin-top: auto` in a column container pushes an item to the bottom.

**Next:** open `requirements.md` for today's project and challenges.

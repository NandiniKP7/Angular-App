# Day 07: Track Card States with class, style and attr Bindings

**Project today:** progress bars and a locked state on the LearnBuddy track cards (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** a progress bar built from one `<div>` inside another `<div>`, and the `aria-label` attribute.
- **CSS:** percent widths, `overflow: hidden`, `opacity`, state classes, and specificity (which rule wins).
- **Angular:** `[class.x]`, `[style.width.%]` and `[attr.aria-label]`.

Keep `ng serve` running. Today you edit three files in `src/app/track-cards/`: `track-cards.ts`, `track-cards.html` and `track-cards.css`.

---

**1. HTML: a progress bar is a `<div>` inside a `<div>`**

A `<div>` is a generic box. An element written inside another element is its **child**; the outer element is its **parent**. A `<div>` is a **block** element: it starts on a new line and is as wide as its parent by default. A `<div>` with no text and no CSS height has height 0, so you cannot see it.

```html
<div class="bar">
  <div class="bar-fill"></div>
</div>
<!-- Nothing is visible yet: both boxes have height 0. CSS will give them size. -->
```

Read it piece by piece:
- `.bar` is the outer box (the empty track of the bar).
- `.bar-fill` is the inner box (the filled part). Its width will show how much is done.

---

**2. CSS: a percent width is a percent of the parent**

`width: 25%` means 25% of the width inside the parent element. The parent here has `width: 200px`.

```css
.bar {
  width: 200px;
  background: #dde7e5;
}

.bar-fill {
  width: 25%;
  height: 10px;
  background: #15965f;
}
/* .bar-fill is 50px wide (25% of 200px) and 10px tall. */
```

`height: 100%` works the same way, but only if the parent has a fixed height. In the project `.bar` has `height: 8px`, so `.bar-fill { height: 100%; }` is 8px tall.

---

**3. CSS: `overflow` and `overflow: hidden`**

**Overflow** is content that is bigger than its box. By default (`overflow: visible`) it spills out. `overflow: hidden` cuts off everything outside the box. It also cuts the child at the parent's rounded corners.

```css
.bar {
  width: 200px;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  width: 300px;
  height: 100%;
}
/* .bar-fill is 300px wide but only the first 200px are drawn, with rounded ends. */
```

Without `overflow: hidden`, the square corners of `.bar-fill` would stick out past the rounded corners of `.bar`.

---

**4. Angular: `[style.width.%]` sets one inline style from a property**

An **inline style** is CSS written in the `style` attribute of one element: `style="width: 30%"`. Angular can set one CSS property for you from a class property.

```ts
export class Demo {
  percent: number = 30;
}
```

```html
<div class="bar-fill" [style.width.%]="percent"></div>
<!-- The browser gets: <div class="bar-fill" style="width: 30%;"></div> -->
```

Read it piece by piece:
- `[ ... ]` means "bind": the value on the right is calculated by Angular (Day 6).
- `style.width` means the CSS property `width` of this element.
- `.%` is the unit. Angular puts the unit after the number. Use `.px` for pixels: `[style.height.px]="14"` gives `height: 14px`.
- `percent` is a property of the class, so the bar changes when the number changes.

Watch out: an inline style wins over the same property in a CSS file (see concept 8). Also, `[style.width]="percent"` without a unit gives `width: 30`, which is not valid CSS, so the browser ignores it.

---

**5. Angular: `[class.locked]` adds or removes one class**

The `class` attribute holds one or more class names separated by spaces. The CSS selector `.locked` matches elements that have the name `locked` in that list. `[class.locked]="condition"` adds the name when `condition` is `true` and removes it when `false`. The fixed `class="..."` text stays.

```html
<section class="track csharp" [class.locked]="csharpLocked">...</section>
<!-- csharpLocked = true  -> class="track csharp locked" -->
<!-- csharpLocked = false -> class="track csharp" -->
```

A class that records a condition ("locked", "selected", "done") is called a **state class**. The TypeScript code decides when the state is true. The CSS decides how the state looks.

---

**6. CSS: `opacity` and the `.locked` state**

`opacity` is a number from 0 (invisible) to 1 (fully visible). It applies to the element and everything inside it: text, image, button.

```css
.locked {
  opacity: 0.65;
}
/* The whole C# card is 65% visible, so it looks faded. */
```

---

**7. HTML and Angular: `aria-label` and `[attr.aria-label]`**

An **attribute** is a name="value" pair in the tag text, such as `src="a.svg"`. A **property** is a field on the JavaScript object the browser builds for that element. `[src]="x"` sets the property `src`. Many attributes have a property with the same name (`src`, `alt`, `disabled`, `title`), but `aria-label` does not.

`aria-label` gives an element a text name for a **screen reader** (software that reads the page aloud for people who cannot see it). The bar has no text inside it, so without `aria-label` it has no name.

To set an attribute directly, write `attr.` before its name:

```html
<div class="bar" [attr.aria-label]="'Angular progress ' + angularPercent + ' percent'"></div>
<!-- With angularPercent = 5 the browser gets: aria-label="Angular progress 5 percent" -->
```

Read it piece by piece:
- `[attr.aria-label]` sets the attribute `aria-label`.
- `'Angular progress '` is a text value. It uses single quotes because the whole binding is already inside double quotes.
- `+` joins text and numbers into one text, as in TypeScript.

Watch out: `[aria-label]="..."` (without `attr.`) fails with an error saying it is not a known property.

---

**8. CSS: specificity (which rule wins)**

When two rules set the same property on the same element, the browser picks one. **Specificity** is the score of a selector. Count three things, compare left number first:

| Selector | Classes and pseudo-classes | Element names | Score |
|---|---|---|---|
| `button` | 0 | 1 | 0,0,1 |
| `.track button` | 1 | 1 | 0,1,1 |
| `.track button:hover` | 2 | 1 | 0,2,1 |
| `.track button:disabled` | 2 | 1 | 0,2,1 |

A **pseudo-class** is a part after a colon (`:hover`, `:disabled`) that matches an element in a state. It counts like a class.

Rules:
1. The higher score wins, even if its rule is earlier in the file.
2. If the scores are equal, the rule that comes later in the file wins.
3. An inline style (concept 4) beats every selector.

```css
.bar-fill {
  background: #15965f;      /* score 0,1,0 */
}

.typescript .bar-fill {
  background: #3b6fd8;      /* score 0,2,0: wins on the TypeScript card, even if written first */
}
```

In the project: a disabled button that is hovered matches both `.track button:hover` (`filter: brightness(0.9)`) and `.track button:disabled` (`filter: none`). The scores are equal, and `:disabled` is later in the file, so `filter: none` wins.

---

**Common problems**
- The bar shows nothing: `.bar-fill` needs `height: 100%` and the parent `.bar` needs a fixed `height`.
- `[style.width.%]` has no effect: you wrote `[style.width]` (no unit) or a text value such as `'30'`.
- Error about `aria-label`: use `[attr.aria-label]`.
- The locked card is not faded: check that `.locked` is spelled the same in the HTML and the CSS.
- A CSS change does nothing: a rule with a higher score or an inline style wins. Open DevTools (F12), select the element and look at the Styles panel: lost rules are crossed out.

---

**Recap**
- A progress bar is a `.bar` box with a `.bar-fill` box inside; the fill width is a percent of the bar.
- `overflow: hidden` cuts the child at the parent's rounded corners.
- `[style.width.%]="n"` sets an inline width; `[class.x]="condition"` toggles a class; `[attr.name]="value"` sets an attribute.
- `opacity` fades an element and all its children.
- Specificity decides conflicts: higher score first, then later rule; inline style beats both.

**Next:** open `requirements.md` for today's project and challenges.

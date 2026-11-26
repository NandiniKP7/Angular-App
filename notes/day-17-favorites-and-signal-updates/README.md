# Day 17: Favorites and Signal Updates

**Project today:** a star button on every topic card, a favorites list, and counters for how many times you opened and completed topics (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** a `<button>` that shows a symbol (★ or ☆), and `aria-label` to give an icon button a name.
- **CSS:** turning a button into a plain icon (`background: none; border: 0;`), `float: right`, an amber color.
- **Angular:** `.update()` on a signal, an array signal changed without mutation (`filter`, spread), an object signal (`stats`), a plain property versus a signal, a second `input()` and `output()` on the card.

Keep `ng serve` running. Today's banner stays at topic 10, Writable Signals. A **signal** is a value that Angular watches: you read it by calling it, `x()`, and change it with a method such as `.set()`. You used signals on Day 16.

---

**1. HTML: a button that shows a symbol**

A `<button>` can hold any text, including a symbol. `★` (filled star) and `☆` (outline star) are ordinary text characters, so you type them like letters.

```html
<button>★</button>
<!-- The browser shows a small grey button with a filled star. -->
```

---

**2. HTML: `aria-label` names an icon button**

A screen reader reads the text inside a button aloud. A star symbol gives a poor name. `aria-label` is an attribute whose value is the name a screen reader uses instead of the text. You met it on Day 7.

```html
<button aria-label="Add to favorites">☆</button>
<!-- The screen shows ☆. A screen reader says "Add to favorites, button". -->
```

Today the label changes with the state, so we bind it: `[attr.aria-label]="..."` (Day 7).

---

**3. CSS: a button that looks like an icon**

A browser draws a button with a grey background and a border. To show only the symbol, remove both. **`float: right`** moves an element to the right edge of its container, and the content that follows wraps beside it.

```css
.star {
  float: right;
  background: none;
  border: 0;
  font-size: 18px;
  color: #f0a500;
  cursor: pointer;
}
```

Read it piece by piece:
- `float: right;` puts the star at the right side of the card body.
- `background: none; border: 0;` removes the button box, so only the star shows.
- `font-size: 18px;` makes the symbol bigger than the 13px default.
- `color: #f0a500;` is amber. The color of text applies to the symbol too.
- `cursor: pointer;` shows the hand when the mouse is over it.

---

**4. Angular: where the favorites live**

The card must show a star, and the roadmap must remember which topics are favorites. Two places could hold that. Today's rule: **the parent owns the data, the child shows it and reports clicks.**

- `TopicCatalog` (parent) holds `favorites`, the list of favorite topic numbers.
- `TopicCard` (child) receives `favorite` (true or false) with `input()` and sends the topic number back with `output()`.

Why not store it in the card? With the filter chips, cards are removed and created again. A value stored inside a card would be lost; a value stored in the parent stays.

```ts
// topic-card.ts (new lines)
favorite = input(false);              // type inferred: boolean. Default false.
favoriteToggled = output<number>();   // sends one number to the parent
```

---

**5. Angular: a condition inside the template (the ternary)**

The **ternary operator** `condition ? valueIfTrue : valueIfFalse` chooses between two values. You can write it inside `{{ }}` or a binding.

```html
<button [attr.aria-label]="favorite() ? 'Remove from favorites' : 'Add to favorites'">
  {{ favorite() ? '★' : '☆' }}
</button>
<!-- favorite() is true:  label "Remove from favorites", text ★
     favorite() is false: label "Add to favorites",     text ☆ -->
```

Read it piece by piece:
- `favorite()` is the input read like a signal, with parentheses.
- The text between `?` and `:` is used when the condition is true; the text after `:` when it is false.

---

**6. Angular: `.update()`**

`.set(value)` replaces the value. **`.update(fn)`** computes the new value from the current one. `fn` is an **arrow function**: a short function written `current => newValue`. Angular calls it and passes the current value in.

```ts
count = signal(0);
this.count.set(5);                         // count() is 5
this.count.update(current => current + 1); // count() is 6
// current is the name you give to the value now stored in the signal.
```

Use `.update()` when the new value depends on the old one.

---

**7. Angular: change an array signal by making a new array**

Angular decides that a signal changed by comparing the old value with the new one. For an array, it compares the **reference**: whether it is the same array object, not whether the items are the same. If you do `list.push(3)`, the array object is the same, so Angular sees no change and the screen may not update. So you always build **a new array**.

```ts
favorites = signal<number[]>([]);   // number[] = an array of numbers; starts empty

toggleFavorite(no: number): void {
  this.favorites.update(list =>
    list.includes(no) ? list.filter(item => item !== no) : [...list, no]
  );
}
```

Read it piece by piece:
- `signal<number[]>([])`: the `<number[]>` after `signal` is a **generic**: it tells TypeScript the signal holds an array of numbers. Without it, `[]` would have an unclear type.
- `list.includes(no)` is `true` when the array contains the value `no`.
- `list.filter(item => item !== no)` makes a new array with every item except `no` (`!==` means "is not equal to"). This removes the favorite.
- `[...list, no]` is a new array: all items of `list` (spread, Day 10), then `no`. This adds the favorite.

```ts
// favorites() is [3]
// toggleFavorite(1) -> [3, 1]      (1 was not in the list: added)
// toggleFavorite(3) -> [1]         (3 was in the list: removed)
```

---

**8. Angular: an object signal and the spread copy**

A signal can hold an object. `stats` holds two counters.

```ts
stats = signal({ opened: 0, completed: 0 });   // type inferred: { opened: number; completed: number }

this.stats.update(current => ({ ...current, opened: current.opened + 1 }));
// { opened: 0, completed: 0 } becomes { opened: 1, completed: 0 }
```

Read it piece by piece:
- `...current` copies both fields of the old object into a new object.
- `opened: current.opened + 1` then replaces the `opened` field. A field written later wins.
- The extra parentheses `( { ... } )` are needed: without them, JavaScript reads `{` after `=>` as the start of a function body, not an object.
- Again the result is a new object, so Angular sees the change.

In the template you read one field: `{{ stats().opened }}`.

---

**9. Angular: property versus signal**

A **property** is a plain class field, such as `totalTopics: number = 44;`. You read it as `totalTopics`. A **signal** is read as `stats()`, with parentheses. Angular re-draws the part of the screen that reads a signal when the signal changes. Use a signal for a value that changes while the app runs; a plain property is fine for a value that never changes.

A method can read a signal too. The template calls it, and Angular still knows which signal was read:

```ts
isFavorite(no: number): boolean {
  return this.favorites().includes(no);
}
```

```html
<app-topic-card [topic]="topic" [favorite]="isFavorite(topic.no)" (favoriteToggled)="toggleFavorite($event)" />
<!-- For topic 3 with favorites() equal to [3]: [favorite] receives true. -->
```

`(favoriteToggled)="toggleFavorite($event)"`: `$event` is the number sent by `favoriteToggled.emit(topic().no)` in the card (Day 15).

---

**10. Angular: the full round trip**

1. You click ☆ on topic 3. The card runs `favoriteToggled.emit(3)`.
2. The parent runs `toggleFavorite(3)`. `favorites` becomes `[3]`.
3. `isFavorite(3)` now returns `true`, so `[favorite]` is `true` and the card shows ★.
4. The line `Favorites: 1` reads `favorites().length` and updates too.

---

**Common problems**
- Star does nothing: `(favoriteToggled)="toggleFavorite($event)"` is missing from the `<app-topic-card>` tag, or the output name is spelled differently from the card.
- Star shows but never turns filled: `[favorite]="isFavorite(topic.no)"` is missing, or the card reads `favorite` without `()`.
- Error that says a value is "not callable", or `[object Object]` on screen: `favorite`, `favorites` and `stats` are signals and are read with parentheses; plain properties are not.
- Counters do not update: the `.update()` function returns the same object. Write `({ ...current, opened: current.opened + 1 })`.
- Star is grey with a box: the `.star` rule is in `topic-catalog.css` instead of `topic-card.css`. Each component's CSS applies only to its own template.
- The `Favorites:` and `Last action:` lines appear in the wrong order: `Favorites` is first, `Last action` is last.

---

**Recap**
- A button can show a symbol; `aria-label` gives it a spoken name. CSS `background: none; border: 0;` makes it look like an icon.
- Parent owns the data (`favorites`, `stats`); the card gets `favorite` with `input()` and reports with `output()`.
- `.set(x)` replaces; `.update(current => ...)` calculates from the old value.
- Arrays and objects in signals are never changed in place: use `filter`, `[...list, x]` and `{ ...current, field: x }`.
- A plain property is read as `x`; a signal as `x()`.

**Next:** open `requirements.md` for today's project and challenges.

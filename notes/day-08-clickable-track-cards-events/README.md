# Day 08: Clickable Track Cards with Event Binding

**Project today:** click a track card button to select that track (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **HTML:** the `<button>` element, its default `type`, and keyboard focus.
- **CSS:** `outline`, `outline-offset`, the `:focus-visible` pseudo-class and a `.selected` state class.
- **Angular:** `(click)`, handler methods, `this`, `$event`, and the `selectedTrack` property.

Keep `ng serve` running. Today you edit `track-cards.ts`, `track-cards.html` and `track-cards.css` in `src/app/track-cards/`, and `today-build.ts` in `src/app/today-build/`.

---

**1. Angular: what an event is**

An **event** is something that happens in the browser page: a mouse click, a key press, the page loading. Every event has a name. The mouse click event is named `click`. An element can listen for an event and run code when it happens.

---

**2. Angular: `(click)` runs code when the element is clicked**

You have used `[ ]` to send a value from the class to the page. Round brackets `( )` do the other direction: they run code from the class when something happens on the page.

```ts
export class Demo {
  clicks: number = 0;

  addClick(): void {
    this.clicks = this.clicks + 1;
  }
}
```

```html
<button (click)="addClick()">Click me</button>
<p>Clicks: {{ clicks }}</p>
<!-- Starts as: Clicks: 0. After 3 clicks: Clicks: 3 -->
```

Read it piece by piece:
- `(click)` means "when this element gets a click".
- `"addClick()"` is the code to run. The `()` after the name calls the method. Without them nothing is called.
- `addClick` is a **handler**: a method that handles an event.

---

**3. Angular: methods and `this`**

A method is a function inside the class (you know this from TypeScript). Inside a method, `this` means the component object that owns the properties. To read or change a property you must write `this.` before its name.

```ts
select(track: string): void {
  this.selectedTrack = track;
}
```

Read it piece by piece:
- `track: string` is a **parameter**: a named slot for a value that the caller passes in.
- `: void` means the method returns nothing.
- `this.selectedTrack = track;` stores the value in the property.

Watch out: if you write `selectedTrack = track;` without `this.`, TypeScript reports an error such as `Cannot find name 'selectedTrack'`.

---

**4. Angular: passing a value to the handler**

The value you pass inside the parentheses is an **argument**. It is an expression, so it can be a property of the class.

```html
<button (click)="select(angularName)">View topics</button>
<!-- With angularName = 'Angular', a click runs: select('Angular') -->
```

If you write `select(Angular)` without quotes, Angular looks for a property named `Angular` and reports that it does not exist. A fixed text needs quotes: `select('Angular')`.

---

**5. Angular: changing a property updates the screen**

`selectedTrack` is **state**: a value that can change while the page is open.

```ts
selectedTrack: string = 'Angular';
```

```html
<p class="selected-line">Selected track: {{ selectedTrack }}</p>
<!-- Starts as: Selected track: Angular -->
<!-- After select('TypeScript') runs: Selected track: TypeScript -->
```

After an event handler finishes, Angular checks every binding in the template again and updates the parts of the page whose values changed. You do not write any code to refresh the page.

---

**6. Angular: a class that depends on a comparison**

From Day 7: `[class.x]="condition"` adds the class when the condition is `true`. A comparison with `===` gives `true` or `false`.

```html
<section class="track angular" [class.selected]="selectedTrack === angularName">
<!-- selectedTrack is 'Angular':    class="track angular selected" -->
<!-- selectedTrack is 'TypeScript': class="track angular" -->
```

Only one name equals `selectedTrack` at a time, so only one card has the class `selected`. The class list of the other cards is unchanged.

---

**7. Angular: `$event`**

In an event binding, `$event` is the **event object**: a value the browser creates with details about what happened (its `type`, the mouse position, and more). You pass it to your method as an argument. For a click its type is `MouseEvent`.

```ts
log(event: MouseEvent): void {
  console.log(event.type);
}
```

```html
<button (click)="log($event)">Test</button>
<!-- The browser console (F12, Console) prints: click -->
```

The project does not need `$event`. Challenge 4 uses it.

---

**8. HTML: `<button>`, its default type and focus**

A `<button>` is an element the user can activate by mouse click, or with the keyboard: press `Tab` to move to it, then press `Enter` or `Space`. The element that currently receives key presses has **focus**. A disabled button (`[disabled]="true"`) cannot get focus and does not send `click` events, so `(click)` never runs on it.

A button has a `type` attribute. Its default is `submit`, which sends a form when the button is inside a `<form>`. Our buttons are not in a form, so the default does no harm today. Writing `type="button"` makes it explicit that the button only runs your own code.

```html
<button type="button" (click)="select(angularName)">View topics</button>
```

---

**9. CSS: `outline` and `outline-offset`**

An `outline` is a line drawn around the outside of an element. It looks like a `border`, but it takes **no space**: adding or removing an outline does not move other elements. It follows the element's rounded corners in current browsers.

```css
.selected {
  outline: 3px solid var(--green);
}
/* A 3px green line is drawn around the card. Other cards do not move. */
```

`outline: 3px solid var(--green)` has three parts: width, style (`solid`) and color. `outline-offset: 2px;` moves the line 2px away from the element.

---

**10. CSS: `:focus-visible`**

A **pseudo-class** is a keyword after a colon that matches an element in a certain state (`:hover` matches while the mouse is over it). `:focus-visible` matches an element that has focus and where the browser decides the focus must be shown, for example after pressing `Tab`. Browsers usually do not show it after a mouse click on a button.

```css
.track button:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 2px;
}
/* Press Tab until a View topics button is focused: a blue 3px ring appears 2px outside it. */
```

The ring tells keyboard users which button they are on. Never remove it without a replacement.

---

**Common problems**
- Clicking does nothing: you wrote `(click)="select"` without `()`, or the method name is misspelled in the HTML.
- Error `Property 'Angular' does not exist`: you passed `Angular` without quotes. Pass `angularName` or `'Angular'`.
- `selectedTrack` never changes on screen: in the method you wrote `selectedTrack = track` instead of `this.selectedTrack = track`.
- Clicking the C# button does nothing: this is correct. The button is disabled, so no click event is sent.
- No blue ring after a mouse click: this is correct. Use `Tab` to see it.

---

**Recap**
- An event is something the browser reports; `(click)="method(args)"` runs a method of the class on click.
- Inside methods, use `this.` to read and change properties.
- Changing a property updates every binding that uses it.
- `[class.selected]="selectedTrack === name"` marks the one chosen card.
- `outline` draws a line without taking space; `:focus-visible` shows the keyboard focus.

**Next:** open `requirements.md` for today's project and challenges.

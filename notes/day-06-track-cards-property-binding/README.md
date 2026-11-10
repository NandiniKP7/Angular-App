# Day 6: Track cards with property binding

**Project today:** add an icon to each track card and lock the C# / .NET button (see `requirements.md`)
**Time:** 15 minutes reading, then practice

## What you will learn
- **Angular:** property binding `[property]="expression"` for `src`, `alt`, `disabled` and `title`; why `[disabled]="true"` is not the same as `disabled="true"`.
- **HTML:** `<img>` with `src`, `alt`, `width`, `height`; the `disabled` attribute; the `title` tooltip; the `public/` folder.
- **CSS:** `display: block` on an image, `button:disabled`, `cursor: not-allowed`, `filter: none`.

Keep `ng serve` running. Today you work in `track-cards/`, `today-build/` and the `public/` folder.

---

**1. HTML: attributes**

An **attribute** is extra information written inside the opening tag, as `name="value"`. A tag can have several attributes, separated by spaces.

```html
<a class="active">My Learning</a>
<!-- class is the attribute name, "active" is its value -->
```

You already used `class`. Today you meet `src`, `alt`, `width`, `height`, `disabled` and `title`.

---

**2. HTML: the `<img>` element**

`<img>` shows a picture. It has no text inside, so it has no closing tag.

```html
<img src="angular.svg" alt="Angular" width="32" height="32">
<!-- Shows a 32 by 32 pixel picture. If it cannot load, the text "Angular" is shown. -->
```

Read it piece by piece:
- `src` ("source") is the address of the picture file.
- `alt` ("alternative text") is a short text that describes the picture. A screen reader reads it aloud to a user who cannot see the picture. The browser shows it if the file is missing.
- `width` and `height` are the size in pixels. The browser reserves that space before the file has loaded, so the page does not jump.

---

**3. HTML: the `public/` folder**

Your project has a folder called `public/` (next to `src/`). Every file in `public/` is served by `ng serve` at the root of the site. A file `public/angular.svg` has the address `/angular.svg`. So `src="angular.svg"` finds it. The name `public` is not written in the address.

```
learnbuddy/
  public/
    angular.svg        -> address in the browser: /angular.svg
    typescript.svg
    csharp.svg
  src/
```

An `.svg` file is a picture written as text (shapes and letters), so it stays sharp at any size. Today's three files are given in `requirements.md`.

If you add a file to `public/` while `ng serve` is running and the picture does not load, stop `ng serve` (Ctrl+C) and start it again.

---

**4. HTML: `disabled` and `title`**

- `disabled` is a **boolean attribute** on a `<button>`: the button cannot be clicked and looks dimmed. A boolean attribute works by being present or absent. Its value is ignored.
- `title` is text that the browser shows in a small box (a **tooltip**) when the mouse stays on the element for about a second.

```html
<button disabled title="Coming later">View topics</button>
<!-- A dimmed button that cannot be clicked. The tooltip "Coming later" shows on hover. -->

<button disabled="false">View topics</button>
<!-- STILL disabled. The attribute is present, so the value "false" does not matter. -->
```

Only removing the attribute enables the button. This is a problem when the value must change while the page is running. Angular solves it with property binding.

---

**5. Angular: property binding**

An HTML **attribute** is what you write in the tag. The browser reads the tag and builds an object for every element. That object has **properties**. For `<button>`, the property `disabled` is `true` or `false`. Property binding sets such a property from a value in your class. The syntax is square brackets around the property name, and an **expression** in quotes.

```ts
// in the class
csharpLocked: boolean = true;
```
```html
<button [disabled]="csharpLocked">View topics</button>
<!-- csharpLocked is true  -> button disabled -->
<!-- csharpLocked is false -> button enabled -->
```

Read it piece by piece:
- `[disabled]` means: "set the `disabled` property of this button".
- `"csharpLocked"` is read as TypeScript, not as text. It is the property `csharpLocked` of the class.
- Angular keeps the button in step with the value. If `csharpLocked` changes, the button changes.
- The type must fit: `disabled` expects a `boolean`, so `csharpLocked` is declared `boolean`.

Compare these two lines. They look alike and behave differently:

```html
<button [disabled]="true">A</button>   <!-- disabled property = true (a boolean) -->
<button disabled="true">B</button>     <!-- plain attribute, text "true" -->
```

Both are disabled here. With `false` they differ: `[disabled]="false"` enables the button. `disabled="false"` still disables it, as shown in concept 4. Use the bracket form whenever the value comes from your class.

---

**6. Angular: binding `src`, `alt` and `title`**

The same brackets work for any property. Text from the class replaces the fixed text.

```ts
angularName: string = 'Angular';
angularIcon: string = 'angular.svg';
```
```html
<img [src]="angularIcon" [alt]="angularName" width="32" height="32">
<!-- Same result as: <img src="angular.svg" alt="Angular" width="32" height="32"> -->
<!-- width and height have no brackets: they are fixed text. -->
```

Without brackets, `src="angularIcon"` would look for a file named `angularIcon`. The brackets tell Angular to use the value of the class property.

The same for `title`:

```ts
csharpHint: string = 'Coming later';
```
```html
<button [title]="csharpHint">View topics</button>
<!-- Tooltip on hover: Coming later -->
```

Interpolation `{{ }}` (Day 3) is for **text between tags**: `<h3>{{ angularName }}</h3>`. Brackets `[ ]` are for **properties of the tag**.

---

**7. CSS: `display: block` on an image**

`<img>` is `inline` by default (Day 5): it sits in a line of text. A line of text keeps a few extra pixels of space below, so inline images get a small unwanted gap, and `margin-bottom` does not do what you expect. With `display: block` the image has its own line.

```css
.track img {
  display: block;
  margin-bottom: 8px;
}
/* Every img inside a .track: on its own line, with 8px of space below. */
```

---

**8. CSS: `:disabled`, `cursor: not-allowed` and rule order**

`:disabled` is a pseudo-class that selects only disabled form controls.

```css
.track button:disabled {
  background: #aab7bd;
  cursor: not-allowed;
  filter: none;
}
/* A disabled button: grey, a "forbidden" cursor, and no darkening. */
```

Read it piece by piece:
- `background: #aab7bd;` is a grey that replaces the green.
- `cursor: not-allowed;` shows a forbidden-sign cursor on hover.
- `filter: none;` removes any filter. Yesterday's rule `.track button:hover` makes buttons darker. A disabled button is still "hovered", so without `filter: none` it would darken.

Why does `:disabled` win over `.track button` (green)? Two rules that both match the same element and are equally specific: the one written **later in the file** wins. `.track button:disabled` has more parts than `.track button`, so it wins. `.track button:hover` and `.track button:disabled` have equal parts, so the later one wins. Add the `:disabled` rule **after** the `:hover` rule.

---

**Common problems**
- Picture missing, alt text shown: the file name in the class (`'angular.svg'`) differs from the file in `public/`. Names are case-sensitive on some systems.
- You wrote `src="angularIcon"` without brackets: the browser looks for a file called `angularIcon` (error 404 in the Network tab).
- Error `Can't bind to 'disabled' since it isn't a known property`: spelling of the property name, or you used `[disable]`.
- Button stays disabled after you set the value to `false`: you used `disabled="..."` without brackets.
- Disabled button gets darker on hover: `filter: none;` is missing or the `:disabled` rule is above the `:hover` rule.
- The picture is still not shown after adding the files: restart `ng serve`.

**Recap**
- Attributes are written in the tag; properties live on the browser's element object.
- `[property]="expression"` sets a property from your class value.
- `[src]`, `[alt]`, `[disabled]`, `[title]` are all property bindings.
- `disabled="false"` still disables; `[disabled]="false"` enables.
- Files in `public/` are served from the site root: `src="angular.svg"`.
- `display: block` fixes inline image spacing; `button:disabled` styles locked buttons.

**Next:** open `requirements.md` for today's project and challenges.

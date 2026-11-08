# Day 01: Create the App: Walkthrough

> **Open this only after you have tried the project yourself** (see `requirements.md`), or if you are stuck for more than 15 minutes.

## Today's project
A full-window dark teal screen with the centered title `❖ LearnBuddy` and the tagline `Learn · Practice · Improve` (see `ui.svg` and `ui-breakdown.md`).

## Build it, step by step

### Step 1: Check the tools
**Type this** in a terminal:
```
node -v
npm -v
ng version
```
**You should see:** a Node version `v20.19` or higher, an npm version, and an Angular CLI version. If `ng version` fails, run `npm install -g @angular/cli`, then run it again.

### Step 2: Create the project
**Type this** in the folder where you keep your projects:
```
ng new learnbuddy --skip-tests
```
Answer: stylesheet `CSS`, SSR `No`, zoneless `No`, AI tools `None`. Press Enter for everything else. Then:
```
cd learnbuddy
```
**You should see:** many lines about files being created and packages installed, ending without errors. Open the folder `learnbuddy` in your code editor.

### Step 3: Run it
**Type this:**
```
ng serve
```
**You should see:** a line `Local: http://localhost:4200/`. Open it in the browser: the CLI's welcome page appears. Leave this terminal running and do the next steps in your editor.

### Step 4: The global CSS
Open `src/styles.css`. It is empty or has a comment. Replace everything with:
```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
```
**You should see:** no visible change yet (the welcome page may shift 8px to the left edge).

### Step 5: The HTML
Open `src/app/app.html`. It holds a long welcome page. Select all and replace it with:
```html
<div class="landing">
  <h1>❖ LearnBuddy</h1>
  <p>Learn · Practice · Improve</p>
</div>
```
**You should see:** the browser reloads and shows plain black text on a white page, at the left edge: the bold title `❖ LearnBuddy`, and under it `Learn · Practice · Improve`. The terminal may print a warning that `RouterOutlet` is not used. Step 7 fixes it.

### Step 6: The component CSS
Open `src/app/app.css` (it is empty). Type:
```css
.landing {
  background: #0e3441;
  color: white;
  min-height: 100vh;
  text-align: center;
  padding-top: 120px;
  box-sizing: border-box;
}

.landing p {
  color: #bcd6da;
}
```
**You should see:** the window turns dark teal with no white border. The title is white and centered, about 120px (plus the heading's own top margin) below the top edge. The tagline is centered and paler. No scroll bar.

### Step 7: Clean up `app.ts`
Open `src/app/app.ts`. The CLI's version is:
```ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('learnbuddy');
}
```
Delete the `RouterOutlet` import line, the `RouterOutlet` inside `imports`, the `title` line, and `signal` from the first line. The result:
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
```
**You should see:** the page does not change, and the terminal warning is gone.

### Step 8: Try the tools
- Change `120px` to `40px`, save, and watch the title move up. Change it back to `120px`.
- Press `F12` in the browser, open the Elements tab and find `<app-root>` with your `<div class="landing">` inside it.

## Check yourself
- [ ] The screen matches `ui.svg`: dark teal, no white border, no scroll bar, centered title and tagline.
- [ ] `styles.css`, `app.html`, `app.css`, `app.ts` match the code above exactly.
- [ ] The terminal and the browser console show no errors or warnings.

## Recap
- `ng new` creates the project; `ng serve` runs it and reloads on save.
- `app.html` is the content, `app.css` the look, `app.ts` the link between them; `styles.css` is global.
- HTML elements nest; CSS rules are `selector { property: value; }`.

## If something breaks
- **The browser still shows the CLI welcome page.** You did not save `app.html`, or the terminal shows a red error. Fix the error and save.
- **A white border around the teal.** `body { margin: 0; }` is missing or `styles.css` was not saved.
- **A scroll bar appears.** `box-sizing: border-box;` is missing in `.landing`.
- **The tagline is white instead of pale.** The rule `.landing p` is missing or has a typo (`.landing p` needs a space and no comma).
- **Nothing is styled.** Check the dot in `.landing`, and that `class="landing"` has the same spelling in `app.html`.
- **`NG` error in the terminal after step 7.** A comma or bracket was deleted by mistake: compare `app.ts` with the code above.
- **`Port 4200 is already in use`.** Stop the other `ng serve` with `Ctrl+C`, or answer `y` to use another port.

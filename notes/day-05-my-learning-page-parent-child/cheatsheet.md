# Day 5 Cheatsheet: parent and child components

## Angular
| Syntax | Meaning |
|---|---|
| `<app-today-build />` | Show the child component with this selector |
| `imports: [TodayBuild]` | This component may use the tag of `TodayBuild` |
| `import { TodayBuild } from '../today-build/today-build';` | Bring the class in (`..` = one folder up) |
| `export class App {` then `}` on the next line | A component with no data (empty class) |

## Commands
```
ng generate component my-learning --skip-tests
ng g c today-build --skip-tests        (short form)
ng serve                               (keep it running; save to reload)
```
Creates `src/app/my-learning/` with `my-learning.ts`, `.html`, `.css`.

## HTML
| Element | Use |
|---|---|
| `<section>` | One block of related content (a card) |
| `<h3>` | Heading level 3 |
| `<button>` | Clickable button; text between the tags |

## CSS
| Rule | Meaning |
|---|---|
| `display: block;` | Starts on a new line, margins work |
| `display: inline;` | Flows like text (default for unknown tags) |
| `margin-bottom: 16px;` | Space outside, below |
| `margin: 0 0 8px;` | top, left+right, bottom |
| `a, b, c { }` | Selector list: one rule for several selectors |
| `.track h3 { }` | h3 inside an element with class `track` |
| `display: grid;` | Children go in rows and columns |
| `grid-template-columns: repeat(3, 1fr);` | Three equal columns |
| `gap: 16px;` | Space between grid cells |
| `cursor: pointer;` | Hand icon on hover |
| `:hover` | Only while the mouse is over the element |
| `filter: brightness(0.9);` | 10% darker |

## Memory rule
1. Generate it, build its HTML/CSS/data, then write its tag in the parent.
2. The component whose HTML has the tag must list the class in its own `imports`.
3. Custom tags are inline: add `display: block` before using margins.

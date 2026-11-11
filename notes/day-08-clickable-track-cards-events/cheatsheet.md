# Day 08 Cheatsheet

## Angular syntax
| Syntax | Meaning |
|---|---|
| `(click)="select(angularName)"` | run method `select` with the value of `angularName` on click |
| `(click)="a(); b($event)"` | two statements; `$event` is the event object |
| `[class.selected]="selectedTrack === angularName"` | add class `selected` when equal |
| `{{ selectedTrack }}` | show the property |
| `this.selectedTrack = track;` | change a property inside a method |

```ts
selectedTrack: string = 'Angular';

select(track: string): void {
  this.selectedTrack = track;
}
```

## Commands
| Command / key | Use |
|---|---|
| `ng serve` | run the app |
| F12, Console | see `console.log` output |
| Tab, Enter, Space | move focus; activate the focused button |

## HTML
| Code | Meaning |
|---|---|
| `<button type="button">` | button that only runs your code |
| `[disabled]="true"` | no focus, no click event |
| `aria-label="..."` | name for screen readers |

## CSS
| Rule | Effect |
|---|---|
| `outline: 3px solid var(--green)` | line outside the element, takes no space |
| `outline-offset: 2px` | gap between element and outline |
| `:focus-visible` | element focused in a way the browser shows (keyboard) |
| `.selected h3` | `h3` inside an element with class `selected` (score 0,1,1) |

## Memory rule
1. `[x]` sends a value to the page; `(x)` runs a method when the event happens.
2. In a method, change state with `this.property = value`; the screen updates by itself.
3. Compare with `===` to turn state into a class; style the class in CSS.

# Day 11 Cheatsheet: Filters with `@if` / `@else`

## Angular
| Syntax | Meaning |
|---|---|
| `@if (filter === 'All') { ... } @else { ... }` | Show the first piece when true, otherwise the second |
| `} @else if (condition) { ... }` | An extra check between `@if` and `@else` |
| `filter: string = 'All';` | Property that remembers the chosen filter |
| `setFilter(value: string): void { this.filter = value; }` | Method that changes it |
| `(click)="setFilter('Completed')"` | Call the method on click |
| `[class.on]="filter === 'Completed'"` | Class `on` only on the chosen chip |
| `@for (topic of visibleTopics(); track topic.no)` | Loop over the result of a method |
| `visibleTopics().length` | Number of rows after filtering |

## TypeScript
| Code | Meaning |
|---|---|
| `topic => topic.status === 'Completed'` | Arrow function: input `topic`, gives `true` or `false` |
| `this.topics.filter(arrow)` | New array with only the items where the arrow gives `true` |
| `return this.topics;` inside `if` | Leave the method early |
| `===` | Exactly equal |

## CLI / commands
| Command | Does |
|---|---|
| `ng serve` | Runs the app (keep it running) |

No new files today, so no `ng generate`.

## HTML
| Code | Meaning |
|---|---|
| `<button class="chip">All</button>` | A clickable chip |
| `<div class="chips"> ... </div>` | Holds the group of chips |
| `[attr.aria-pressed]="condition"` | (Challenge 1) says a toggle is on or off |

## CSS
| Code | Meaning |
|---|---|
| `display: flex; flex-wrap: wrap; gap: 8px;` | Row of chips that wraps to a new line |
| `border-radius: 20px; padding: 6px 14px;` | Pill shape |
| `.chip.on` | Element with both classes `chip` and `on` |
| `cursor: pointer;` | Hand cursor on hover |

## Memory rule
1. Keep the choice in a property, change it with a method called from `(click)`.
2. Let a method return the list to show, and loop over `visibleTopics()`.
3. `@if` removes a piece from the page, `.chip.on` only changes how the chosen chip looks.

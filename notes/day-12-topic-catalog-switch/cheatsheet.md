# Day 12 Cheatsheet: `@switch` and Loop Variables

## Angular
| Syntax | Meaning |
|---|---|
| `@switch (topic.status) { ... }` | Look at one value |
| `@case ('done') { ... }` | Shown when the value is exactly `'done'` |
| `@default { ... }` | Shown when no case matched (optional, no brackets) |
| `@for (x of xs; track x.no; let last = $last, odd = $odd) { ... }` | Save loop variables under your own names |
| `$index` `$count` `$first` `$last` `$even` `$odd` | Loop values (`$index` starts at 0; `$odd` is true for index 1, 3, 5, ...) |
| `[class.last]="last"` | Class `last` only on the final row |
| `setFilter('done')` | Filter codes: `'all'`, `'done'`, `'in-progress'`, `'not-started'` |

## TypeScript
| Code | Meaning |
|---|---|
| `status: 'done'` | A code in the data (lowercase, dashes) |
| `filter: string = 'all';` | Starting filter |
| `this.filter === 'all'` | Compare with the same code |

## CLI / commands
| Command | Does |
|---|---|
| `ng serve` | Runs the app (keep it running) |

No new files today, so no `ng generate`.

## HTML
| Code | Meaning |
|---|---|
| `<li class="topic-row odd last">` | One element, several classes |
| F12 -> Elements | Shows the classes an element has right now |
| `title="..."` | Tooltip text (Challenge 1) |

## CSS
| Code | Meaning |
|---|---|
| `.topic-row.odd { background: #fafcfc; }` | Faint stripe |
| `.topic-row.last { border-bottom: 0; }` | No line under the last row |
| Same specificity | The rule written later in the file wins |

## Memory rule
1. Data holds codes, the template turns a code into text with `@switch`.
2. Save loop variables with `let name = $variable` after `track ...;`.
3. Angular puts the classes on, CSS styles them; check the classes in F12.

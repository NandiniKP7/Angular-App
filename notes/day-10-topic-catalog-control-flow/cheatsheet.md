# Day 10 Cheatsheet: Template Control Flow

## Angular
| Syntax | Meaning |
|---|---|
| `@for (topic of topics; track topic.no) { ... }` | Repeat for each item; `track` is required |
| `} @empty { ... }` | Shown when the array has no items |
| `$index` | Position of the current item, starts at 0 |
| `topics.length` | Number of items |
| `[class.done]="topic.status === 'Completed'"` | Class per row |
| `topics = [...ANGULAR_TOPICS];` | New array with the same items |
| `this.topics = [];` | Empty the list |

## CLI / commands
| Command | Does |
|---|---|
| `ng generate component topic-catalog --skip-tests` | Creates `src/app/topic-catalog/` |
| `ng serve` | Runs the app (keep it running) |

## HTML
| Code | Meaning |
|---|---|
| `<ul>` | Unordered list; only `<li>` inside |
| `<li>` | One list item |
| `<ol>` | Ordered (numbered) list |

## CSS
| Code | Meaning |
|---|---|
| `list-style: none; margin: 0; padding: 0;` | List reset |
| `display: flex; align-items: center; gap: 10px;` | Row layout |
| `flex: 1` | Grow to fill the free space |
| `border-radius: 10px; padding: 2px 10px;` | Pill badge |
| `border-bottom: 1px solid #eef1f2;` | Line under a row |
| `.badge.done` | Element with both classes |
| `@media (max-width: 800px) { ... }` | Rules for windows 800px wide or narrower |

## Memory rule
1. `@for` always needs `track`, and `@empty` follows its closing brace.
2. Keep the full data in a `const`; give the class a copy with `[...]`.
3. Reset the list, then build each row with flex.

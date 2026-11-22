# Day 15 Cheatsheet: output() and Card Controls

## Angular
| Syntax | Meaning |
|---|---|
| `import { Component, booleanAttribute, input, output } from '@angular/core';` | Import `output` |
| `opened = output<number>();` | Child event that carries a number |
| `opened.emit(topic().no)` | Send the event (in the child template or class) |
| `(opened)="onOpen($event)"` | Parent listens; `$event` is the emitted value |
| `onOpen(no: number): void { ... }` | Parent handler; parameter type matches the output type |
| `this.topics.map((topic): Topic => cond ? { ...topic, status: 'done' } : topic)` | New array, one changed copy |
| `{ ...topic, status: 'done' }` | Copy of the object with one property replaced |
| `cond ? a : b` | Ternary: `a` if true, else `b` |
| `[disabled]="topic().status === 'done'"` | Disable a button by a condition |

## CLI / commands
| Command | Does |
|---|---|
| `ng serve` | Runs the app (keep it running; no new component today) |

## HTML
| Code | Meaning |
|---|---|
| `<div class="actions"> <button>...</button> </div>` | A group of buttons |
| `<button disabled>` | A button that cannot be clicked |
| `title="..."` | Tooltip text on hover |

## CSS
| Code | Meaning |
|---|---|
| `display: flex; flex-wrap: wrap; gap: 6px;` | Row of items that wraps to a new line |
| `.actions button` | Buttons inside `.actions` only |
| `.actions button:disabled` | Style of a disabled button |
| `cursor: not-allowed;` | "Not allowed" mouse pointer |

## Memory rule
1. Data goes down with `input()`; events go up with `output()` and `.emit()`.
2. The parent listens with `(name)="handler($event)"` and is the one that changes the data.
3. Change data by building a new array with `.map()` and a new object with `{ ...x }`.

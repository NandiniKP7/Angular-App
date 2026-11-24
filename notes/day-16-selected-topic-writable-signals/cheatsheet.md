# Day 16 Cheatsheet: Writable Signals

## Angular
| Syntax | Meaning |
|---|---|
| `import { Component, signal } from '@angular/core';` | Import `signal` |
| `filter = signal<string>('all');` | Create a writable signal with a type and a starting value |
| `selectedNo = signal<number \| null>(null);` | Holds a number or `null` |
| `this.filter()` / `{{ filter() }}` | Read the value (class and template) |
| `this.filter.set(value)` | Replace the value |
| `this.topics.set(this.topics().map(...))` | Read, build a new array, set it |
| `this.topics().find(topic => topic.no === n)` | First match, or `undefined` |
| `@if (selectedTopic(); as chosen) { ... } @else { ... }` | Name the found value; `@else` when none |

## CLI / commands
| Command | Does |
|---|---|
| `ng serve` | Runs the app (no new component today) |

## HTML
| Code | Meaning |
|---|---|
| `<div class="selected">Text <strong>bold</strong></div>` | Box with some bold text |
| `aria-live="polite"` | Screen readers announce changes in the element |

## CSS
| Code | Meaning |
|---|---|
| `margin-top: 12px;` | Space outside, above |
| `padding: 10px 14px;` | Space inside: top/bottom 10, left/right 14 |
| `background: var(--mint); border-radius: 10px;` | Light green rounded panel |
| `.selected` in two components | No clash: component CSS is scoped |

## Memory rule
1. A signal is read with `()` and changed with `.set()`; never assign it with `=`.
2. Store the small value (`selectedNo`), compute the object with `.find()`.
3. `Topic | undefined` means "check it first": use `@if (...; as name)`.

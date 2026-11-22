# Day 14 Cheatsheet: Typed Inputs and the Topic Model

## TypeScript
| Syntax | Meaning |
|---|---|
| `export interface Topic { no: number; ... }` | Shape of an object |
| `export type TopicStatus = 'done' \| 'in-progress' \| 'not-started';` | Only these texts are allowed |
| `export const ANGULAR_TOPICS: Topic[] = [ ... ];` | Typed array of topics |
| `import { Topic } from '../models/topic';` | Import (path without `.ts`) |
| `const topic = this.topic();` | Local name for a value inside a method |

## Angular
| Syntax | Meaning |
|---|---|
| `topic = input.required<Topic>();` | Required object input |
| `compact = input(false, { transform: booleanAttribute });` | Flag that can be written as just `compact` |
| `import { Component, booleanAttribute, input } from '@angular/core';` | Imports for the card |
| `topic().title` | Read a property of the input object |
| `<app-topic-card [topic]="topic" />` | Parent sends the whole object |
| `<app-topic-card [topic]="topic" compact />` | Flag on |
| `@if (!compact()) { ... }` | Show when `compact()` is false |
| `[class.compact]="compact()"` | Class when the flag is on |
| `percent()` | Method called in the template |

## CLI / commands
| Command | Does |
|---|---|
| `ng serve` | Runs the app (keep it running) |
| (no `ng generate` today) | `models/` and `data/` files are created by hand |

## HTML
| Code | Meaning |
|---|---|
| `<small>` | Side text, smaller |
| `<div class="bar"><div class="bar-fill"></div></div>` | Progress bar |
| `[attr.aria-label]="..."` | Text for screen readers |

## CSS
| Code | Meaning |
|---|---|
| `overflow: hidden;` | Cut the fill at rounded corners |
| `[style.width.%]="percent()"` | Fill width in percent (template) |
| `.compact { padding: 8px 12px; }` | Same specificity as `.topic-card`; the later rule wins |

## Memory rule
1. Describe data once: `interface`, union type, typed array in `models/` and `data/`.
2. One object input: `input.required<Topic>()`, read `topic().x`.
3. Flags use `booleanAttribute`, so `compact` alone means true.

# Day 13 Cheatsheet: input() and a reusable card

## Angular
| Syntax | Meaning |
|---|---|
| `import { Component, input } from '@angular/core';` | Bring in `input` |
| `title = input('Untitled topic');` | Optional input, default value, type inferred (string) |
| `no = input.required<number>();` | Required input, type in `<>` |
| `{{ no() }}` | Read an input: call it with `()` |
| `<app-topic-card [no]="topic.no" />` | Parent sets a child input from an expression |
| `<app-topic-card status="done" />` | No brackets: plain text value |
| `imports: [TopicCard]` | Parent must list the child component |
| `@for (...) { <app-topic-card ... /> }` | One card per item |

## CLI / commands
| Command | Does |
|---|---|
| `ng generate component topic-card --skip-tests` | Creates `src/app/topic-card/` |
| `ng serve` | Runs the app (keep it running) |

## HTML
| Code | Meaning |
|---|---|
| `<article>` | One self-contained item (a card) |
| `<small>` | Side text, shown smaller |
| `<div>` | Plain layout box |

## CSS
| Code | Meaning |
|---|---|
| `width: 36px; height: 36px; border-radius: 50%;` | Circle |
| `display: flex; align-items: center; justify-content: center;` | Center content inside a box |
| `flex: none;` | Do not shrink or grow |
| `display: grid; grid-template-columns: repeat(2, 1fr);` | 2 equal columns |
| `@media (max-width: 800px) { ... }` | Rules for narrow windows |

## Memory rule
1. Child declares inputs; read them with `()`.
2. Parent imports the child and binds with `[name]="value"`.
3. Required input: type in `<>`, no default; optional input: default, type inferred.

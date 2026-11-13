# Day 9 Cheatsheet: Two-Way Binding

## Angular
| Syntax | Meaning |
|---|---|
| `imports: [FormsModule]` | Needed in the component to use `ngModel` |
| `import { FormsModule } from '@angular/forms';` | Import line at the top of the `.ts` file |
| `[(ngModel)]="choice"` | Two-way binding: property <-> control |
| `[ngModel]="x" (ngModelChange)="x = $event"` | Long form of the line above |
| `[hidden]="saved === ''"` | Hide the element when true |
| `[disabled]="choice === ''"` | Disable the button when true |

Delete a component: tag, `imports` entry, import line, folder.

## CLI / commands
| Command | Does |
|---|---|
| `ng generate component today-choice --skip-tests` | Creates `src/app/today-choice/` |
| `ng serve` | Runs the app (keep it running) |

## HTML
| Code | Meaning |
|---|---|
| `<label>` | Text of a control; wrap the input or use `for="id"` |
| `<input type="radio" name="time" value="30 min">` | Radio; same `name` = one group; `value` = its option |
| `<div role="radiogroup" aria-label="Time today">` | Names the group for screen readers |
| `hidden` | Attribute that hides an element |

## CSS
| Code | Meaning |
|---|---|
| `position: relative` | Reference point for absolute children |
| `position: absolute; opacity: 0` | Hide an element, keep it clickable and focusable |
| `input:checked + span` | The `span` directly after a selected input |
| `grid-template-columns: 2fr 1fr` | Two columns, first twice as wide |
| `align-items: start` | Grid items keep their own height, aligned to the top |

## Memory rule
1. Brackets order: round inside square, `[( )]`.
2. No `FormsModule` in `imports`, no `ngModel`.
3. The `span` you style must come right after the `input` in the HTML.

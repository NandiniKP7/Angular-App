# Day 17 Cheatsheet: Favorites and Signal Updates

## Angular
| Syntax | Meaning |
|---|---|
| `favorite = input(false);` | Card input, default `false` (type boolean) |
| `favoriteToggled = output<number>();` | Card output that sends a number |
| `favoriteToggled.emit(topic().no)` | Send the number to the parent |
| `(favoriteToggled)="toggleFavorite($event)"` | Parent listens; `$event` is the number |
| `[favorite]="isFavorite(topic.no)"` | Parent sends true/false to the card |
| `favorites = signal<number[]>([]);` | Signal holding an array of numbers |
| `stats = signal({ opened: 0, completed: 0 });` | Signal holding an object |
| `this.x.set(value)` | Replace the value |
| `this.x.update(current => newValue)` | New value calculated from the old one |
| `list.includes(no)` | `true` if `no` is in the array |
| `list.filter(item => item !== no)` | New array without `no` |
| `[...list, no]` | New array with `no` added |
| `({ ...current, opened: current.opened + 1 })` | New object, one field changed |
| `{{ favorite() ? '★' : '☆' }}` | Ternary: pick one of two values |
| `favorites().length`, `stats().opened` | Reading signals needs `()` |

## CLI / commands
| Command | Does |
|---|---|
| `ng serve` | Runs the app (keep it running); no new command today |

## HTML
| Code | Meaning |
|---|---|
| `<button>★</button>` | A button that shows a symbol |
| `aria-label="Add to favorites"` | Name read by a screen reader |
| `[attr.aria-label]="cond ? 'A' : 'B'"` | Name that changes with state |
| `aria-pressed="true"` | Toggle button is on (Challenge 1) |

## CSS
| Code | Meaning |
|---|---|
| `background: none; border: 0;` | Button without its box |
| `float: right;` | Move to the right edge; following content wraps beside it |
| `color: #f0a500;` | Amber text (also colors a symbol) |
| `font-size: 18px; cursor: pointer;` | Bigger symbol, hand cursor |
| `transform: scale(1.25);` | Draw 25% larger |

## Memory rule
1. The parent owns the data; the child shows it with `input()` and reports with `output()`.
2. Never change a signal's array or object in place: build a new one (`filter`, `[...]`, `{ ... }`).
3. `.set()` replaces, `.update(current => ...)` calculates; read a signal with `()`.

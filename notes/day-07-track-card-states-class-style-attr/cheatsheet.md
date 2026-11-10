# Day 07 Cheatsheet

## Angular syntax
| Syntax | Meaning | Example result |
|---|---|---|
| `[style.width.%]="n"` | inline style, unit `%` | `style="width: 30%;"` |
| `[style.height.px]="n"` | inline style, unit `px` | `style="height: 14px;"` |
| `[class.locked]="flag"` | add class `locked` when `flag` is true | `class="track csharp locked"` |
| `[attr.aria-label]="'A ' + n"` | set an attribute | `aria-label="A 5"` |
| `[src]`, `[alt]`, `[disabled]`, `[title]` | set a property (Day 6) | |

## Commands
| Command | Use |
|---|---|
| `ng serve` | run the app (keep it running) |
| F12 | open DevTools: Elements shows attributes and styles |

## HTML
| Code | Meaning |
|---|---|
| `<div class="bar"><div class="bar-fill"></div></div>` | box inside box (parent, child) |
| `<span class="status">` | inline text |
| `aria-label="..."` | text name for screen readers |
| `role="progressbar"` | tells assistive software it is a progress bar |

## CSS
| Rule | Effect |
|---|---|
| `width: 25%` | 25% of the parent's width |
| `height: 100%` | parent's height (parent needs a fixed height) |
| `overflow: hidden` | cuts off content outside the box and at rounded corners |
| `opacity: 0.65` | 65% visible (element and children) |
| `display: inline-block` | sits in a line, but top/bottom margin works |

Specificity score (classes and pseudo-classes, element names): `button` 0,0,1; `.a button` 0,1,1; `.a button:hover` 0,2,1. Higher wins; equal: later wins; inline style beats all.

## Memory rule
1. `[style.x.unit]` sets one inline style; `[class.x]` toggles a class; `[attr.x]` sets an attribute.
2. A percent width is a percent of the parent.
3. Higher specificity wins; on a tie, the later rule wins.

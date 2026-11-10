# Day 6 Cheatsheet: property binding

## Angular
| Syntax | Meaning |
|---|---|
| `[src]="angularIcon"` | Set the `src` property from the class value |
| `[alt]="angularName"` | Set `alt` from the class |
| `[disabled]="csharpLocked"` | Boolean: `true` disables, `false` enables |
| `[title]="csharpHint"` | Tooltip text from the class |
| `{{ angularName }}` | Text between tags (interpolation) |
| `disabled="false"` | NOT a binding: attribute present, still disabled |

```ts
csharpLocked: boolean = true;
csharpHint: string = 'Coming later';
```

## Commands
```
ng serve              (restart it after adding files to public/ if they do not load)
```
Files in `public/angular.svg` are used as `src="angular.svg"` (address `/angular.svg`).

## HTML
| Element / attribute | Use |
|---|---|
| `<img src alt width height>` | Picture; no closing tag |
| `alt` | Text for screen readers and missing files |
| `disabled` | Boolean attribute: button cannot be clicked |
| `title` | Tooltip after about 1 second |

## CSS
| Rule | Meaning |
|---|---|
| `.track img { display: block; margin-bottom: 8px; }` | Image on its own line |
| `.track button:disabled { }` | Only disabled buttons |
| `cursor: not-allowed;` | Forbidden-sign cursor |
| `filter: none;` | Removes a filter (cancels the hover darkening) |
| Same specificity | The rule written later wins |

## Memory rule
1. Brackets `[ ]` set a property from a class value; no brackets means fixed text.
2. `{{ }}` for text between tags, `[ ]` for properties inside the tag.
3. For booleans always use `[disabled]="value"`, never `disabled="value"`.

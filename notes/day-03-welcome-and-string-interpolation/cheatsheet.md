# Day 03 Cheatsheet: Welcome and String Interpolation

## Angular
| Syntax | Meaning |
|---|---|
| `name: string = 'text';` | Class property, type string |
| `count: number = 2;` | Class property, type number |
| `{{ name }}` | Show the property `name` in the template |
| `{{ a }} of {{ b }}` | Several values in one element |
| `{{ a + 1 }}` | Expression: the result is shown |
| `{{ method() }}` | Call a method; the parentheses are required |
| `method(): number { return ...; }` | Method that returns a number |
| `this.name` | Property of the class, used inside methods only |
| `new Date().toLocaleDateString('en-US', { weekday: 'long' })` | Today's weekday, e.g. `Friday` |

```ts
export class App {
  topicsDone: number = 2;
  topicsTotal: number = 44;

  percentDone(): number {
    return Math.round((this.topicsDone / this.topicsTotal) * 100);
  }
}
```

## CLI / commands
| Command | Use |
|---|---|
| `ng serve` | Keep running; the browser reloads on save |
| F12 in browser, tab Console | Look for errors |

## HTML
| Element | Use |
|---|---|
| `<h1>` ... `<h6>` | Heading levels (structure, not size) |
| `<strong>` | Important text (bold) |
| `<small>` | Side text (smaller) |
| `<section>` | Group of related content |

## CSS
| Code | Meaning |
|---|---|
| `:root { --green: #15965f; }` | Define a custom property |
| `color: var(--green);` | Read it |
| `font-size: 11px;` `font-weight: bold;` | Size, thickness |
| `letter-spacing: 0.06em;` | Extra space between letters (em = times font size) |
| `display: block;` | Element takes its own line |
| `border: 1px solid var(--line);` | Width, style, color |
| `border-radius: 14px;` | Rounded corners |
| `flex-direction: column;` | Flex children top to bottom |
| `margin-top: auto;` | Take all free space above: item goes to the bottom |

## Memory rule
1. Data lives in the class; the template shows it with `{{ }}`.
2. Calculations live in methods; call them with `()`.
3. Colors live in `:root` as `--names`; use them with `var()`.

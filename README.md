# use-bg-cursor-pos

This library provides a custom React hook to add a highlight / spotlight type effect to the background of a DOM element that follows the cursor as it moves.

## Usage

Usage is simple:

```jsx
import useBackgroundCursorPosition from "use-bg-cursor-pos";

export default function MyComponent () {
  const [el, bg] = useBackgroundCursorPosition("#111", "#222", "200px");
  return (
    <div ref={el} style={{ background: bg }}>
      <p>Hover me!</p>
    </div>
  );
}
```

The `useBackgroundCursorPosition` hook takes 4 arguments:
* The background colour (any valid HTML colour string)
* The highlight colour (any valid HTML colour string)
* The highlight size (Either as `px` or `%`)
* A boolean which determines whether or not the effect is active (defaults to `true`)

## Demo

[CodeSandbox](https://codesandbox.io/s/sad-satoshi-75rbin)

## License

MIT

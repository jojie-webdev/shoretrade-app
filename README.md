### Installation

To ensure precommit hooks are running on your code editors as well as Git clients,
make `~/.huskyrc` and add this:

````
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

PATH="/usr/local/bin:$PATH"
````

## Coding Standards

### Components

The components are separated into these categories to further organize the project:

- **`layout`** - components that display or wrap `children` in a certain manner, e.g. Container, AuthGuard, Grid, Row

- **`module`** - components specific to a feature that can be reused on other places

- **`base`** - basic reusable components e.g. Typography

### Components structure

 - Use hooks: for state, lifecycle
 - Separate this complex/stateful logic into the 'MyComponent.container.tsx' file
 - Define template with minimal logic in 'MyComponent.view.tsx' file
 - Define the props in your 'MyComponent.props.ts' file
 - Put all styling on 'MyComponent.style.ts' file using styled components

### Making asynchronous requests

Single-purpose requests that will only be used on one screen should be stored along-side the component.

## React Grid

The grid system that we are using is [react-grid-system](https://sealninja.github.io/react-grid-system/).

## Routing

We are using [react-router](https://reactrouter.com/web/guides/quick-start) for routing and routes will be defined under [routes folder](src/routes).

## Theming
[Emotion](https://emotion.sh/docs/introduction) is our base styling tool.

```jsx
import React from 'react';
import {useTheme} from "src/utils/Theme";

export function MyComponent() {
  const theme = useTheme();
  // You can now access your theme and use it anywhere.

  return <div style={{backgroundColor: theme.color.primary}} />;
}
```

[Theme](src/utils/Theme.ts) is defined with its [types](src/types/Theme.ts).

## State Management

The base repo will not have a state management.
See tags for specific ones.

## Internationalization

See [locale.md](src/locales/i18n.md) for more.

## Custom Environment Variables
Environment files will be declared on their specific environment e.g. (.env for local).
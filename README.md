# Custom State Manager

This is a lightweight, framework-agnostic custom state manager with React hooks support. It provides a simple and efficient way to manage state in your applications, with the flexibility to use it across different frameworks or vanilla JavaScript projects.

## Features

- Framework-agnostic core (`Store` class)
- React hook support (`useStore`)
- TypeScript support for type-safe state management
- Ability to update state with a value or a function (similar to React's `setState`)
- Subscription system for state changes

## Components

### 1. Store Class (`index.ts`)

The `Store` class is the core of the state manager. It handles state storage, updates, and subscriptions.

Key features:
- Initialize with any type of state
- Get current state
- Set new state or update state using a function
- Subscribe to state changes

### 2. React Hook (`useStore.ts`)

The `useStore` hook provides an easy way to use the `Store` in React components.

Key features:
- Retrieve current state
- Update state
- Automatically re-render component on state changes

### 3. Global Store Instance (`global.ts`)

This file demonstrates how to create a global store instance that can be imported and used across your application.

## Usage

### Creating a Store

```typescript
import { Store } from './path-to-store';

const countStore = new Store(0);
```

### Raw Usage (Without React)

You can use the `Store` class directly without any framework:

```typescript
const store = new Store(0);

// Get the current state
const currentState = store.getState();

// Update the state
store.setState(5);

// Update the state using a function
store.setState(prevState => prevState + 1);

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  console.log('State changed:', store.getState());
});

// Later, when you want to unsubscribe
unsubscribe();
```

### Using Store in React Components

```typescript
import { useStore } from './path-to-useStore';
import { countStore } from './path-to-global';

function Counter() {
  const [count, setCount] = useStore(countStore);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>Decrement</button>
    </div>
  );
}
```

### Updating State

You can update the state in two ways:

1. Directly with a new value:
   ```typescript
   setCount(10);
   ```

2. Using a function that receives the previous state:
   ```typescript
   setCount((prevCount) => prevCount + 1);
   ```

## Benefits

1. **Simplicity**: Easy to understand and use, with a minimal API.
2. **Flexibility**: Can be used with React or any other framework, or even without a framework.
3. **Type Safety**: Built with TypeScript for improved developer experience and code reliability.
4. **Familiarity**: Similar API to React's useState, with conceptual similarities to atom-based libraries like Jotai, while maintaining a lightweight design.

## Framework Adapters

The `useStore` hook in `useStore.ts` serves as a React adapter for this state manager. It bridges the gap between the framework-agnostic `Store` class and React's component system. This adapter pattern allows for easy integration with React while keeping the core `Store` class framework-agnostic.

Each adapter would optimize the usage of the `Store` class for its specific framework.

## Potential Improvements

- Add middleware support for logging, persistence, etc.
- Implement devtools for better debugging
- Add support for derived states (computed values)
- Create adapters for other frameworks (Vue, Svelte, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms of the license specified in the LICENSE.md file in the root directory of this project.
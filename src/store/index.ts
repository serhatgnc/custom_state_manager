type Listener = () => void;

/**
 * A basic store that manages state and allows state updates with subscriptions for state changes.
 *
 * @template T - The type of the state.
 *
 * @param {T} initialState - The initial state of the store.
 *
 * @method getState - Returns the current state.
 * @method setState - Updates the state and notifies listeners.
 * @method subscribe - Registers a listener to be notified on state changes.
 *
 * @returns {Store<T>} A store instance that can manage and update state.
 */
export class Store<T> {
  protected state: T;
  protected listeners: Listener[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(newState: T | ((prevState: T) => T)): void {
    if (typeof newState === "function") {
      const updateFn = newState as (prevState: T) => T;
      this.state = updateFn(this.state);
    } else {
      if (typeof newState !== typeof this.state) {
        throw new TypeError(
          `Type mismatch: Expected ${typeof this.state}, got ${typeof newState}`
        );
      }
      this.state = newState;
    }
    this.notifyListeners();
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  protected notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  getStore(): [() => T, (newState: T | ((prevState: T) => T)) => void] {
    return [this.getState.bind(this), this.setState.bind(this)];
  }
}

/**
 * A store that derives its state from another store and automatically updates when the parent store's state changes.
 *
 * @template T - The type of the parent store's state.
 * @template U - The type of the derived state.
 * 
 * @param {(state: T) => U} deriveFn - Function to compute the derived state.
 * @param {Store<T>} parentStore - The store from which the state is derived.
 * 
 * @method setState - Throws an error as derived state cannot be set directly.
 * 
 * @returns {DerivedStore<T, U>} A derived store instance that syncs with the parent store.
 */
export class DerivedStore<T, U> extends Store<U> {
  private deriveFn: (state: T) => U;
  private parentStore: Store<T>;

  constructor(deriveFn: (state: T) => U, parentStore: Store<T>) {
    super(deriveFn(parentStore.getState()));

    this.deriveFn = deriveFn;
    this.parentStore = parentStore;

    this.parentStore.subscribe(() => {
      this.state = this.deriveFn(this.parentStore.getState());
      this.notifyListeners();
    });
  }

  setState(): void {
    throw new Error("Cannot set state of a derived store directly");
  }

  getStore(): [() => U, never] {
    return [
      this.getState.bind(this),
      (() => {
        throw new Error("Cannot set state of a derived store");
      }) as never,
    ];
  }
}

/**
 * Creates a `DerivedStore` that derives its state from a parent store.
 *
 * @param {(state: T) => U} deriveFn - Function to derive the new state.
 * @param {Store<T>} parentStore - The parent store.
 *
 * @returns {DerivedStore<T, U>} A derived store that updates automatically with the parent store.
 */
export function derived<T, U>(
  deriveFn: (state: T) => U,
  parentStore: Store<T>
): DerivedStore<T, U> {
  return new DerivedStore(deriveFn, parentStore);
}

/**
 * Checks if a given store is a `DerivedStore`.
 *
 * @param {Store<T> | DerivedStore<U, T>} store - The store to check.
 * 
 * @returns {store is DerivedStore<U, T>} `true` if the store is a `DerivedStore`, otherwise `false`.
 */
export function isDerivedStore<T, U>(
  store: Store<T> | DerivedStore<U, T>
): store is DerivedStore<U, T> {
  return store instanceof DerivedStore;
}

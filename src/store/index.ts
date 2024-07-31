type Listener = () => void;

export class Store<T> {
  private state: T;
  private listeners: Listener[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(newState: T | ((prevState: T) => T)): void {
    if (typeof newState !== typeof this.state) {
      throw new TypeError(
        `Type mismatch: Expected ${typeof this.state}, got ${typeof newState}`
      );
    }

    this.state =
      typeof newState === "function"
        ? (newState as (prevState: T) => T)(this.state)
        : newState;
    this.notifyListeners();
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  getStore(): [() => T, (newState: T) => void] {
    return [this.getState.bind(this), this.setState.bind(this)];
  }
}

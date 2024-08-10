/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Store, DerivedStore, isDerivedStore } from "..";

type SetState<T> = (newValue: T | ((prevState: T) => T)) => void;

/**
 * Determines the return type of the `useStore` hook.
 *
 * If the store is a `DerivedStore`, it returns a tuple with the state and a `never` type setter.
 * The `never` setter indicates that you cannot set the state of a derived store.
 *
 * @template S - The type of the store, either a `Store` or a `DerivedStore`.
 */
type StoreResponse<S> = S extends DerivedStore<any, infer T>
  ? [T, never]
  : S extends Store<infer T>
  ? [T, SetState<T>]
  : never;

/**
 * Hook to use the Store Class in a React component.
 *
 * Depending on the type of store, this hook returns either a state value
 * and a setter function (for regular stores), or just a state value with
 * no setter (for derived stores).
 *
 * @template S - The type of the store, either a `Store` or a `DerivedStore`.
 *
 * @param {S} store - The store instance from which to derive state.
 *
 * @returns {StoreResponse<S>} A tuple containing the current state and
 * a setter function if it's a regular store, or just the state if it's a derived store.
 */
export function useStore<S extends Store<any> | DerivedStore<any, any>>(
  store: S
): StoreResponse<S> {
  const [getState, setState] = store.getStore();
  const [state, setInternalState] = useState(getState());

  const getStateRef = useRef(getState);
  const storeRef = useRef(store);

  useEffect(() => {
    const unsubscribe = storeRef.current.subscribe(() => {
      setInternalState(getStateRef.current());
    });
    return unsubscribe;
  }, []);

  if (isDerivedStore(store)) {
    return [
      state,
      () => {
        throw new Error("Cannot set state of a derived store");
      },
    ] as StoreResponse<S>;
  }

  return [state, setState] as StoreResponse<S>;
}

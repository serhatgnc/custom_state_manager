import { useEffect, useRef, useState } from "react";
import { Store } from "..";

export const useStore = <T>(
  store: Store<T>
): [T, (newValue: T | ((prevState: T) => T)) => void] => {
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

  return [state, setState];
};

import { Store } from "./store";

type TextStoreType = { name: string; surname: string };

export const countStore = new Store(0);
export const textStore = new Store<TextStoreType>({
  name: "",
  surname: "",
});

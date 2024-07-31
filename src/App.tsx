import { countStore } from "./global";
import { useStore } from "./store/hooks/useStore";

function App() {
  const [count, setCount] = useStore(countStore);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <button onClick={() => setCount(count - 1)}>-</button>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default App;

import { countStore } from "./global";
import { derived } from "./store";
import { useStore } from "./store/hooks/useStore";

function App() {
  const [count, setCount] = useStore(countStore);
  const [countSquared] = useStore(
    derived((state) => state * state, countStore)
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "200px",
        }}
      >
        <h3>State Manager Demo</h3>
        <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
        <div>Count: {count}</div>
        <div>Count Squared: {countSquared}</div>
        <button onClick={() => setCount((prev) => prev - 1)}>Decrease</button>
      </div>
    </div>
  );
}

export default App;

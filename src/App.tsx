import { countStore } from "./global";
import { useStore } from "./store/hooks/useStore";

function App() {
  const [count, setCount] = useStore(countStore);

  console.log("hello");

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
        <input
          value={count.hello}
          type="text"
          onChange={(val) => setCount({ hello: val.currentTarget.value })}
        />
        {/* <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
        <div>{count}</div>
        <button onClick={() => setCount((prev) => prev - 1)}>Decrease</button> */}
      </div>
    </div>
  );
}

export default App;

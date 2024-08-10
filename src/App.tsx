import { countStore, textStore } from "./global";
import { derived } from "./store";
import { useStore } from "./store/hooks/useStore";

function App() {
  const [count, setCount] = useStore(countStore);
  const derivedCountStore = derived((state) => state * state, countStore);

  const [countSquared] = useStore(derivedCountStore);

  const [{ name, surname }, setText] = useStore(textStore);
  const derivedTextStore = derived(
    ({ name, surname }) => `${name}${surname}`.length,
    textStore
  );
  const [textLength] = useStore(derivedTextStore);

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
          <div>Count: {count}</div>
          <div>Count Squared: {countSquared}</div>
          <button onClick={() => setCount((prev) => prev - 1)}>Decrease</button>
        </div>
        <hr style={{ width: "100%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="name"
            onChange={(e) =>
              setText((prev) => ({ ...prev, name: e.target.value }))
            }
            maxLength={20}
          />
          <input
            type="text"
            maxLength={20}
            placeholder="surname"
            onChange={(e) =>
              setText((prev) => ({ ...prev, surname: e.target.value }))
            }
          />
          {textLength > 0 ? (
            <div>
              <p>
                Your name is: <b>{`${name} ${surname}`}</b>
              </p>
              <p>
                Name surname combined text length: <b>{textLength}</b>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;

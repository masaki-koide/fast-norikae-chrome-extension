import { useRef, useCallback, FormEvent } from "react";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const value = inputRef.current?.value;
      chrome.runtime.sendMessage({
        type: "save",
        data: { nearestStation: value },
      });
    },
    [inputRef]
  );

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label>
          最寄り駅を登録
          <input type="text" name="nearest_station" ref={inputRef} />
        </label>
        <button type="submit">登録</button>
      </form>
    </div>
  );
}

export default App;

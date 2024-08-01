"use client";
import { useReducer } from "react";
import { Hash } from "lucide-react";

// 🦁 Créer une méthode `reducer` qui prends en paramètre `state` et `action`

function reducer(state, action) {
  const REDUCER_ACTIONS = {
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT",
    RESET: "RESET",
    SET: "SET",
  };
  switch (action.type) {
    case "INCREMENT":
      if (action.value) {
        return { count: state.count + action.value };
      } else {
        return { count: state.count + 1 };
      }
    case "DECREMENT":
      if (action.value) {
        return { count: state.count - action.value };
      } else {
        return { count: state.count - 1 };
      }
    case "RESET":
      return { count: (state.count = 0) };
    case "SET":
      return { count: (state.count = action.value) };
  }
  throw Error("Unknown action");
}
// 🦁 Return le `state` + 1

export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="card m-auto w-full max-w-md bg-base-200 shadow-xl">
      <div className="card-body items-center text-center">
        <label className="input input-bordered flex  items-center gap-2">
          <Hash scale={16} />
          <input
            type="text"
            className="w-10 grow"
            placeholder="Count"
            value={state.count}
            onChange={(e) => {
              let value = parseInt(e.target.value);
              if (isNaN(value)) {
                value = 0;
              }
              dispatch({ type: "SET", value: value });
            }}
          />
        </label>
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch({ type: "INCREMENT" });
            }}
          >
            +
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch({ type: "DECREMENT" });
            }}
          >
            -
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch({ type: "RESET" });
            }}
          >
            RESET
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch({ type: "INCREMENT", value: 5 });
            }}
          >
            +5
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch({ type: "DECREMENT", value: 5 });
            }}
          >
            -5
          </button>
        </div>
      </div>
    </div>
  );
}

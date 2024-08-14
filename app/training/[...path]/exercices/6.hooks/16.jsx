"use client";
import { SlowComponent } from "@/src/utils/SlowComponents";
import { useState } from "react";
import { memo } from "react";
const SlowComponentMemo = memo(SlowComponent);

const Counter = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
        Click me
      </button>
      {children}
      <p>Count : {count}</p>
    </>
  );
};

export default function App() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-md border border-neutral bg-base-200 p-4 shadow-md">
      <Counter>
        <SlowComponentMemo width={150} />
      </Counter>
    </div>
  );
}

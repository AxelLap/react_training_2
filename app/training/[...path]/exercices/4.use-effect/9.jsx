"use client";

import { useRef } from "react";
import { useState, useEffect } from "react";

const handlerSet = new Set();

const useEventListener = ({
  eventName,
  handler,
  element = window,
  enabled = true,
}) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  handlerSet.add(handler);
  console.log(handlerSet);
  console.log(handlerSet.size);
  useEffect(() => {
    if (!enabled) return;
    const incrementCount = () => {
      handlerRef.current();
    };
    console.log("addEventListener");
    element.addEventListener(eventName, incrementCount);

    return () => {
      console.log("removeEventListener");

      element.removeEventListener(eventName, incrementCount);
    };
  }, [enabled, element, eventName]);
};

export default function App() {
  const [isCountingClick, setIsCountingClick] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);

  useEventListener({
    eventName: "click",
    handler: () => {
      setCount((curr) => curr + 1);
    },
    element: window,
    enabled: isCountingClick,
  });

  return (
    <div className="flex max-w-sm flex-col gap-8">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Is Counting Click</span>
          <input
            type="checkbox"
            className="toggle"
            checked={isCountingClick}
            onChange={(e) => setIsCountingClick(e.target.checked)}
          />
        </label>
      </div>
      <h2 className="text-2xl font-bold">Click count: {count}</h2>
    </div>
  );
}

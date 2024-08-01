"use client";

import { User2, X } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";
import { createContext, useContext, useState, cloneElement } from "react";

const DialogContext = createContext(null);

const Dialog = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

const DialogTrigger = ({ children }) => {
  const { setOpen } = useDialogContext();
  if (typeof children !== "string") {
    return cloneElement(children, {
      onClick: () => {
        setOpen(true);
      },
    });
  }
};

const useEventListener = ({
  eventName,
  handler,
  element = window,
  isEnabled = true,
}) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }
    if (!element) {
      return;
    }

    const onEvent = (e) => {
      handlerRef.current(e);
    };

    element.addEventListener(eventName, onEvent);

    return () => {
      window.removeEventListener(eventName, onEvent);
    };
  }, [isEnabled, eventName, element]);
};

const useClickOutside = (ref, handler) => {
  const listener = (event) => {
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    handler();
  };

  useEventListener({
    handler: listener,
    eventName: "mousedown",
  });

  useEventListener({
    handler: listener,
    eventName: "touchstart",
  });
};

const getFocusableElements = (ref) =>
  Array.from(
    ref.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    )
  );

const useFocusTrap = (ref, isEnabled) => {
  useEventListener({
    eventName: "keydown",
    isEnabled,
    handler: (e) => {
      if (e.key !== "Tab") {
        return;
      }
      const focusableElements = getFocusableElements(ref);

      const activeElement = document.activeElement;

      let nextActiveElementIndex = e.shiftKey
        ? focusableElements.indexOf(activeElement) - 1
        : focusableElements.indexOf(activeElement) + 1;

      const elementToFocus = focusableElements[nextActiveElementIndex];

      if (elementToFocus) {
        return;
      }

      nextActiveElementIndex =
        nextActiveElementIndex < 0 ? focusableElements.length - 1 : 0;

      focusableElements[nextActiveElementIndex].focus();
      e.preventDefault();
    },
  });
};

const DialogContent = ({ children }) => {
  const { open, setOpen } = useDialogContext();
  const ref = useRef(null);

  useEventListener({
    isEnabled: open,
    eventName: "keydown",
    handler: (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
  });

  useClickOutside(ref, () => setOpen(false));

  useFocusTrap(ref, open);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-50"
    >
      <div
        ref={ref}
        className="card w-96 bg-base-200 shadow-xl animate-in fade-in-50 slide-in-from-bottom-3"
      >
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

const DialogClose = ({ children }) => {
  const { setOpen } = useContext(DialogContext);
  if (typeof children !== "string") {
    return cloneElement(children, {
      onClick: () => {
        setOpen(false);
      },
    });
  }
};

export default function App() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="btn btn-primary btn-lg">Open Dialog Now!</button>
      </DialogTrigger>
      <DialogContent>
        <p>What is your name ?</p>

        <label className="input input-bordered flex items-center gap-2">
          <User2 scale={16} />
          <input type="text" className="grow" placeholder="Username" />
        </label>
        <div className="flex gap-2">
          <DialogClose>
            <button className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-lg bg-base-100">
              <X size={12} />
            </button>
          </DialogClose>
          <button className="btn btn-primary">Submit</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

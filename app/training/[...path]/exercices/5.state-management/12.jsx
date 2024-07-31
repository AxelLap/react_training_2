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

const useEventListener = (eventName, handler, element = window) => {
  useEffect(() => {
    // Créer le gestionnaire de l'eventListener
    const eventListener = (event) => {
      handler(event);
    };

    element.addEventListener(eventName, eventListener);

    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName, handler, element]);
};

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const DialogContent = ({ children }) => {
  const { open, setOpen } = useDialogContext();
  const ref = useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  useEventListener("keydown", handleKeyDown);
  useClickOutside(ref, () => setOpen(false));

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-50">
        <div
          ref={ref}
          className="card w-96 bg-base-200 shadow-xl animate-in fade-in-50 slide-in-from-bottom-3"
        >
          <div className="card-body">{children}</div>
        </div>
      </div>
    )
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
    <Dialog role="dialog" aria-modal="true">
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

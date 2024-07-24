// @ts-nocheck
"use client";

import clsx from "clsx";

const Button = ({ children, variant, id, onClick }) => {
  const buttonClass = clsx("btn ring-offset-2 ring-offset-base-100", {
    "btn-primary": variant === "primary",
    "btn-error": variant === "error",
    "btn-success": variant === "success",
    "btn-warning": variant === "warning",
  });

  return (
    <button className={buttonClass} id={id} onClick={() => onClick(id)}>
      {children}
    </button>
  );
};

export default function App() {
  const handleClick = (id) => {
    alert(`vous avez cliqué sur ${id}`);
  };
  return (
    <div className="flex flex-wrap gap-4 p-4">
      <Button variant={"primary"} id="eat-me" onClick={(id) => handleClick(id)}>
        Eat me
      </Button>
      <Button variant={"error"} id="love-me" onClick={(id) => handleClick(id)}>
        Love me
      </Button>
      <Button
        variant={"success"}
        id="drink-me"
        onClick={(id) => handleClick(id)}
      >
        Drink me
      </Button>
      <Button
        variant={"warning"}
        id="leave-me"
        onClick={(id) => handleClick(id)}
      >
        Eat me
      </Button>
    </div>
  );
}

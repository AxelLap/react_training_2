"use client";

import { User2 } from "lucide-react";
import { useState } from "react";

function NameForm({ initialName }) {
  const [name, setName] = useState(initialName);
  console.log(`[Rerender] name = ${name}`);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="card w-full max-w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Name :</h2>
          {name === "" ? <p className="text-error">No name</p> : <p>{name}</p>}
          {name !== initialName ? (
            <button
              className="bg-yellow-200 text-black rounded-md btn btn-warning btn-sm"
              onClick={(e) => {
                setName(initialName);
              }}
            >
              Reset
            </button>
          ) : null}
        </div>
      </div>
      <div className="divider">Form</div>
      <label className="input input-bordered flex items-center gap-2">
        <User2 size={16} />
        <input
          type="text"
          className="grow"
          placeholder="Melvynx"
          value={name}
          onChange={(e) => {
            const newName = e.target.value;
            setName(newName);
          }}
        />
      </label>
    </div>
  );
}
export default function App() {
  return (
    <div>
      <NameForm initialName="Axel" />
    </div>
  );
}

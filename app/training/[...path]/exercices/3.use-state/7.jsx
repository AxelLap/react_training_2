"use client";

import { Mail, User2 } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// eslint-disable-next-line no-unused-vars
export const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    // Ajoute la props `onSubmit`
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label className="input input-bordered flex items-center gap-2">
        <User2 size={16} />
        <input
          {...register("name", {
            required: true,
            maxLength: 30,
          })}
          type="text"
          className="grow"
          placeholder="user"
        />
      </label>
      {errors.name ? <p className="text-error">{errors.name.message}</p> : null}
      <label className="input input-bordered flex items-center gap-2">
        <Mail size={16} />
        <input
          {...register("mail", {
            required: "required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          type="text"
          className="grow"
          placeholder="email"
        />
      </label>
      {errors.mail ? <p className="text-error">{errors.mail.message}</p> : null}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  if (user) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Logged in !</h2>
          <p>Name : {user.name}</p>
          <p>Email : {user.mail}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                setUser(null);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <LoginForm
        onSubmit={(values) => {
          setUser(values);
        }}
      />
    </div>
  );
}

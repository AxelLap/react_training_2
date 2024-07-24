"use client";

import { ok } from "assert";

import { useEffect } from "react";
import { useState } from "react";

const Alert = () => {
  return (
    <div role="alert" className="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Erreur lors du chargement.</span>
    </div>
  );
};

const CatFact = () => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  const url = "https://catfact.ninja/fact";

  //permet de tester l'erreur
  const wrongUrl = "hgcjdshcgjzhzh";

  useEffect(() => {
    console.log("Calling");
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error : ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((jsonCatFact) => {
        setIsError(false);
        setData(jsonCatFact);
      })
      .catch(() => {
        setIsError(true);
        setData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="card card-compact w-96 max-w-sm bg-base-200 shadow-xl">
      <figure>
        <img
          src="https://cataas.com/cat"
          alt="Shoes"
          className="max-h-32 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Cat fact</h2>
        {data ? <p>{data.fact}</p> : null}
        {isError ? <Alert /> : null}
        {isloading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : null}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <CatFact />
    </div>
  );
}

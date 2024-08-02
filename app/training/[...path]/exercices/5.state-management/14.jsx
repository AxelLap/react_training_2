"use client";

import { cn } from "@/src/utils/cn";
import { create } from "zustand";
import { Check, ShoppingBasket } from "lucide-react";
import { useState, useContext, createContext } from "react";

const useBasketStore = create((set) => ({
  items: [],

  onAddItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  onDeleteItem: (item) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== item.id),
    })),
}));

const Header = () => {
  const { items, onAddItem, onDeleteItem } = useBasketStore();
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral/40 bg-base-200 px-8 py-4 shadow-lg">
      <h2 className="text-2xl font-bold">Shoes</h2>
      <BasketButton />
    </div>
  );
};

const BasketButton = () => {
  const items = useBasketStore((state) => state.items);
  const onDeleteItem = useBasketStore((state) => state.onDeleteItem);
  return (
    <div className="dropdown">
      <button tabIndex={0} className="btn btn-secondary m-1">
        <ShoppingBasket size={16} /> {items.length}
      </button>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-[1] w-64 bg-base-200 p-2 shadow"
      >
        <ul>
          {items.length === 0 ? (
            <li className="flex w-60 flex-row flex-nowrap items-center justify-between p-1">
              No items
            </li>
          ) : (
            items.map((item, index) => (
              <li
                key={index}
                className="flex w-60 flex-row flex-nowrap items-center justify-between p-1"
              >
                <img
                  src={item.cover}
                  alt={item.name}
                  className="m-0 size-8 rounded-full p-0"
                />
                <span>{item.name}</span>
                <button
                  onClick={() => {
                    onDeleteItem(item);
                  }}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default function App() {
  // 🦁 Déplace le state dans un context

  return (
    <div className="flex flex-col gap-8">
      <Header />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SHOES.map((shoe) => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
}

const ShoeCard = ({ shoe }) => {
  return (
    <div className="card flex w-full bg-base-300 shadow-xl">
      <figure>
        <img
          src={shoe.cover}
          className="h-32 w-full object-cover object-center"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{shoe.name}</h2>
        <div className="card-actions flex w-full items-end justify-end">
          <ShoeCardButtons shoe={shoe} />
        </div>
      </div>
    </div>
  );
};

const ShoeCardButtons = ({ shoe }) => {
  const onAddItem = useBasketStore((state) => state.onAddItem);
  const onDeleteItem = useBasketStore((state) => state.onDeleteItem);
  const isSelected = useBasketStore((state) =>
    state.items.some((item) => item.id === shoe.id)
  );

  const handleBasketClick = () => {
    if (!isSelected) {
      onAddItem(shoe);
    } else {
      onDeleteItem(shoe);
    }
  };

  return (
    <button
      // En fonction de `useSelected` on ajoutera ou supprimera du panier
      onClick={handleBasketClick}
      className={cn("btn", {
        "btn-outline": isSelected,
        "btn-primary": !isSelected,
      })}
    >
      <ShoppingBasket size={16} /> {isSelected ? <Check size={16} /> : null}
    </button>
  );
};

// *** Data ***
const SHOES = [
  {
    name: "Air Max Plus",
    id: 1,
    cover: "/nikes/air-max-plus.jpeg",
  },
  {
    name: "Air Force",
    id: 2,
    cover: "/nikes/air-force.png",
  },
  {
    name: "Dunk Retro",
    id: 3,
    cover: "/nikes/dunk-retro.png",
  },
  {
    name: "Air Max",
    id: 4,
    cover: "/nikes/air-max.png",
  },
];

"use client";

import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export const TodoItem = ({
  id,
  todoText,
  updateTodo,
  removeTodo,
  completed,
}) => {
  const [editingId, setEditingId] = useState(null);

  const handleParagraphClick = () => {
    setEditingId(id); // Définir l'id en édition au clic sur le paragraphe
  };

  const handleInputChange = (e) => {
    updateTodo(id, e.target.value); // Mettre à jour le texte du todo en temps réel
  };

  const handleInputBlur = () => {
    setEditingId(null); // Terminer l'édition lorsqu'on quitte l'input
  };

  return (
    <li className="flex w-full items-center gap-2">
      <div
        className={clsx("input flex flex-1 items-center gap-2", {
          "input-bordered": editingId === id,
        })}
      >
        <input
          type="checkbox"
          className={"checkbox checkbox-sm"}
          onChange={() => updateTodo(id)}
          checked={completed}
        />
        {editingId === id ? (
          <input
            type="text"
            value={todoText || ""} // Assurez-vous que `value` n'est jamais indéfini
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        ) : (
          <p
            className={completed ? "line-through" : ""}
            onClick={handleParagraphClick} // Passez la fonction au lieu de l'appeler
          >
            {todoText}
          </p>
        )}
      </div>
      <button className="btn btn-ghost" onClick={() => removeTodo(id)}>
        <Trash size={16} />
      </button>
    </li>
  );
};

const useTodo = () => {
  const [todo, setTodo] = useState({ id: "", text: "", completed: false });
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: todo.text, // Utilisez `todo.text` au lieu de `todo`
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodo({ id: "", text: "", completed: false }); // Réinitialisez `todo`
  };

  const updateTodo = (id, newText) => {
    if (newText === null || newText === undefined) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
    }
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todoToRemove) => todoToRemove.id !== id)
    );
  };

  return { todo, setTodo, todos, setTodos, addTodo, updateTodo, removeTodo };
};

export const TodoList = () => {
  const { todo, setTodo, todos, addTodo, updateTodo, removeTodo } = useTodo();
  // 🦁 Ajoute deux états :

  return (
    <div className="card w-full max-w-md border border-base-300 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Todos</h2>
        <div className="flex w-full items-center gap-2">
          <label className="input input-bordered flex flex-1 items-center gap-2">
            <input
              type="checkbox"
              checked={false}
              className="checkbox checkbox-sm"
            />
            {/* 🦁 Ajoute un état "Todo" et contrôle l'input */}
            <input
              type="text"
              className="grow"
              placeholder="Some task"
              onChange={(e) => setTodo({ ...todo, text: e.target.value })} // Assurez-vous que l'état est correctement mis à jour
              value={todo.text}
            />
          </label>
          {/* 🦁 Lors du clic sur le bouton, appelle la méthode "addTodo" */}
          <button className="btn btn-primary" onClick={addTodo}>
            <Plus size={22} />
          </button>
        </div>
        <div className="divider">List</div>
        <ul className="space-y-2">
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              todoText={item.text}
              completed={item.completed}
              updateTodo={updateTodo}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex w-full justify-center">
      <TodoList />
    </div>
  );
}

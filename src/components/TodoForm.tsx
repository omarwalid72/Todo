import React, { useState, useRef, useEffect } from "react";

const TodoForm = () => {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>(() => {
    // Load from localStorage on initial render
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const todoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Save todos to localStorage whenever it changes
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handelAddToDo = () => {
    const todo = todoRef.current?.value;
    if (!todo) return;

    const newItem = { completed: false, text: todo };
    setTodos([...todos, newItem]);
    if (todoRef.current) todoRef.current.value = "";
  };

  const handelTodoDone = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handelDleteItem = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-200 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {/* Input section */}
      <div className="flex gap-2 mb-2">
        <input
          ref={todoRef}
          type="text"
          placeholder="Enter a todo"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handelAddToDo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Todo list */}
      <ul>
        {todos.map(({ text, completed }, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded my-2 bg-white shadow-sm"
          >
            <li
              onClick={() => handelTodoDone(index)}
              className={`flex-1 cursor-pointer ${
                completed ? "bg-gray-200 line-through" : ""
              } p-2`}
            >
              {text}
            </li>
            <button
              onClick={() => handelDleteItem(index)}
              className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700 transition duration-300 ml-2"
            >
              X
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoForm;

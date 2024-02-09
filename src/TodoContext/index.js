import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

// Provider Component
function TodoProvider({ children }) {
  const {
    item: todos,
    saveItem,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter((t) => !!t.completed).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter((item) => {
    return item.text
      .toLocaleUpperCase()
      .includes(searchValue.toLocaleUpperCase());
  });

  const addTodo = (text) => {
    const nexTodos = [...todos];
    nexTodos.push({
      text,
      completed: false
    });
    saveItem(nexTodos);
  };

  const completeTodo=(text)=>{
    const nexTodos = [...todos];
    const todoIndex = nexTodos.findIndex(
      (t) => t.text.toLowerCase() === text.toLowerCase()
    );
    nexTodos[todoIndex].completed = true;
    saveItem(nexTodos);
    saveItem(text);

  }

  const nexTodos = [...todos];
  const deleteTodo = (text) => {
    const todoIndex = nexTodos.findIndex(
      (t) => t.text.toLowerCase() === text.toLowerCase()
    );
    nexTodos.splice(todoIndex, 1);
    saveItem(nexTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
export { TodoContext, TodoProvider };

// const defaultTodos = [
//   { text: "Hacer ejercicio", completed: false },
//   { text: "Estudiar programación en Platzi", completed: true },
//   { text: "Aprender a programar en JavaScript", completed: false },
//   { text: "Crear una aplicación de lista de tareas", completed: true },
// ];

// localStorage.setItem("TODOS_V1", JSON.stringify(defaultTodos));
// localStorage.removeItem("TODOS_V1"); //Borrar todo el almacenamiento
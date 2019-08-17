import React, { useState } from "react";

// todo in parameter is a map of arrays containing text as string and isCompleted as boolean 
// complete and remove in parameter are used to add functionality in ToDoList function
function ToDoList({ todo, index, complete, remove }) {
  var val = ""
  if(todo.isCompleted) val = "line-through"
  
  return (
    <div
      className="todo"
      style={
        { 
          textDecoration: todo.isCompleted ? val : ""
        }
      }

    >
      {todo.text}

      <div>
        <button onClick={() => complete(index)} style={{backgroundColor: "green", color: "white", onHover: "pink"}}>Complete</button>
        <button onClick={() => remove(index)} style={{backgroundColor: "red", color: "white"}}>x</button>
      </div>
    </div>
  );
}

//
function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = err => {
    err.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={err => setValue(err.target.value)}
      />
    </form>
  );
}


//coding starts from here using hooks instead of class component
//state is initialised and set first.
function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const complete = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const remove = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // todo is array of 2 elements, i.e. text as string and isCompleted as boolean, initially false.
  // todos is a map which contain multiple todo
  // todoList contains the logic and implementation of the app
  // todoForm contains the initial setup of the app
  return (
    <div className="app">
      <div className="todo-list"> 
        <h1 style={{color: "blue", display: "flex", justifyContent: "center", alignItems: "center"}}>My To-Do App
        </h1>
        <br/>
        {todos.map((todo, index) => (
          <ToDoList
            key={index}
            index={index}
            todo={todo}
            complete={complete}
            remove={remove}
          />
        ))}
        <TodoForm 
         addTodo={addTodo}>
           <br/>
         </TodoForm>
      </div>
    </div>
  );
}

export default App;
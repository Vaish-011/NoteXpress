// src/components/Todo/TodoList.js
import React, { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import TodoItem from "./TodoItem";
import "./style.css"; 

function TodoList() {
    const [newTodo, setNewTodo] = useState("");
    const { todos, addTodo } = useTodo();

    const handleAdd = () => {
        if (newTodo.trim() !== "") {
            addTodo(newTodo);
            setNewTodo("");
        }
    };

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <div className="todo-input">
                <input
                    type="text"
                    placeholder="Enter task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={handleAdd}>Add</button>
            </div>
            <div className="todo-list">
                {todos.length > 0 ? (
                    todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
                ) : (
                    <p>No tasks added</p>
                )}
            </div>
        </div>
    );
}

export default TodoList;

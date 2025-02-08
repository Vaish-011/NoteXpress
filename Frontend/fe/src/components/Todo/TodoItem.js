// src/components/Todo/TodoItem.js
import React, { useState } from "react";
import { useTodo } from "../../context/TodoContext";

function TodoItem({ todo }) {
    const [isEditable, setIsEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleTodo } = useTodo();

    const saveTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsEditable(false);
    };

    return (
        <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <input
                type="text"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isEditable}
            />
            <button onClick={() => (isEditable ? saveTodo() : setIsEditable(true))}>
                {isEditable ? "📁" : "✏️"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
        </div>
    );
}

export default TodoItem;

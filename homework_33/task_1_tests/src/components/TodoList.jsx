import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TodoList = () => {
    const [todoText, setTodoText] = useState('');
    const todos = useSelector((state) => state.todos.items);
    const error = useSelector((state) => state.todos.error);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'todos/addTodoRequest', payload: todoText });
        setTodoText('');
    };

    return (
        <div>
            <h1>TODO</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    placeholder="Enter todo"
                />
                <button type="submit">Add</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
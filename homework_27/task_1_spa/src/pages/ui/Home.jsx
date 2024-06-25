import React from 'react';
import { useTodo } from '../hooks/useTodo';

function Home() {
    const { todos, input, handleInputChange, handleFormSubmit } = useTodo();

    return (
        <>
            <h1>Home page</h1>
            <div className="todo">
                <form onSubmit={handleFormSubmit}>
                    <input type="text" value={input} onChange={handleInputChange}/>
                    <button type="submit">Add task</button>
                </form>
                <ul>
                    {todos.map((todo, index) => (
                        <li key={index}>{todo}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Home;
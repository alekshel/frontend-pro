import { useState, useEffect } from 'react';

export const useTodo = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        setTodos(['Learn React', 'Learn JS', 'Learn HTML', 'Learn CSS', 'Learn Redux'])
    }, []);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (input) {
            setTodos([...todos, input]);
            setInput('');
        }
    };

    return { todos, input, handleInputChange, handleFormSubmit };
};
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, TextField, Button, Paper } from '@mui/material';
import { addTodo, toggleTodo } from '../features/todo/todoSlice';

function TodoList() {
    const [newTodo, setNewTodo] = useState('');
    const todos = useSelector(state => state.todo.todos);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            dispatch(addTodo(newTodo));
            setNewTodo('');
        }
    };

    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <TextField
                fullWidth
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New task"
            />
            <Button onClick={handleAddTodo} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Add
            </Button>
            <List>
                {todos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        button
                        onClick={() => dispatch(toggleTodo(todo.id))}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    >
                        <ListItemText primary={todo.text} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default TodoList;
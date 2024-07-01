import {useState} from 'react'
import TodoForm from './components/TodoForm'

function App() {
    const [todos, setTodos] = useState([]);

    const handleSubmit = (values, { resetForm }) => {
        setTodos([...todos, values.task]);
        resetForm();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <TodoForm onSubmit={handleSubmit} />
            <ul className="list-disc pl-5">
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    );
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import store from './redux/store';
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>
)

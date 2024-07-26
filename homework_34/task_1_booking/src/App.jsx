import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import About from './pages/About'
import Hotels from './pages/Hotels'
import Layout from "./components/Layout.jsx";

function App() {
    return (
        <Router>
            <Header />
            <Layout>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/hotels" element={<Hotels />} />
                </Routes>
            </Layout>
            <Footer />
        </Router>
    )
}

export default App
import {useContext} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import routes from "../../shared/config/routes.js";
import NotFound from "../../pages/ui/NotFound.jsx";
import Header from "../../widjets/Header.jsx";
import ErrorBoundary from "../../feature/ErrorBoundary/ui/index.jsx";
import {ThemeContext, ThemeProvider} from "../../shared/model/ThemeContext.jsx";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <ErrorBoundary>
                    <AppContent />
                </ErrorBoundary>
            </BrowserRouter>
        </ThemeProvider>
    )
}

function AppContent() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`app-theme ${theme}`}>
            <Header/>
            <main>
                <Routes>
                    <Route path="*" element={<NotFound/>}/>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))}
                </Routes>
            </main>
        </div>
    );
}

export default App
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExamplePage from './pages/dev-examples/ExamplePage';
import Hello from "./pages/dev-examples/Hello";
import Home from "./pages/dev-examples/Home";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/hello"
                        element={<Hello />}
                    />
                    <Route
                        path="/example"
                        element={<ExamplePage />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

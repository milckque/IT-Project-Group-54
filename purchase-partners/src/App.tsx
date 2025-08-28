import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExamplePage from './ExamplePage';
import Hello from "./Hello";
import Home from "./Home";
import BackendTest from "./BackendTest";

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
                        path="/backend-test"
                        element={<BackendTest />}
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

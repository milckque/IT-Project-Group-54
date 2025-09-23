import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExamplePage from './pages/dev-examples/ExamplePage';
import Hello from "./pages/dev-examples/Hello";
import Home from "./pages/dev-examples/Home";
import BackendTest from "./BackendTest";
import Landing from "./pages/landing/landing";
import BuyingGroupDashboard from "./pages/buying-group-dashboard/buying-group-dashboard";
import CreateGroup from "./pages/create-group/create-group";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Landing />}
                    />
                    <Route
                        path="/dashboard"
                        element={<BuyingGroupDashboard />}
                    />
                    <Route
                        path="/create-group"
                        element={<CreateGroup />}
                    />
                    <Route
                        path="/home"
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

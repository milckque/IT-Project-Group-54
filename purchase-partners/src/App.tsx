import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExamplePage from "./pages/dev-examples/ExamplePage";
import Hello from "./pages/dev-examples/Hello";
import BuyerAccount from "./pages/login-signup/buyer-account";
import Landing from "./pages/landing/landing";
import BuyingGroupDashboard from "./pages/buying-group-dashboard/buying-group-dashboard";
import CreateGroup from "./pages/create-group/create-group";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<BuyingGroupDashboard />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/buyer-account" element={<BuyerAccount />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExamplePage from "./pages/dev-examples/ExamplePage";
import SellerAccount from "./pages/login-signup/seller-account";
import BuyerAccount from "./pages/login-signup/buyer-account";
import Landing from "./pages/landing/landing";
import BuyingGroupDashboard from "./pages/buying-group-dashboard/buying-group-dashboard";
import CreateGroup from "./pages/create-group/create-group";
import SellerDashboard from "./pages/seller-dashboard/seller-dashboard";
import JoinedGroups from "./pages/joined-created-groups/joined-groups";
import CreatedGroups from "./pages/joined-created-groups/created-groups";
import BuyingGroupPage from "./pages/buying-group-dashboard/buying-group-page";

function App() {
  // return (
  //     <>
  //         <BrowserRouter>
  //             <Routes>
  //                 <Route
  //                     path="/"
  //                     element={<Landing />}
  //                 />
  //                 <Route
  //                     path="/dashboard"
  //                     element={<BuyingGroupDashboard />}
  //                 />
  //                 <Route
  //                     path="/create-group"
  //                     element={<CreateGroup />}
  //                 />
  //                 <Route
  //                     path="/home"
  //                     element={<Home />}
  //                 />
  //                 <Route
  //                     path="/buyer-account"
  //                     element={<BuyerAccount />}
  //                 />
  //                 <Route
  //                     path="/seller-account"
  //                     element={<SellerAccount />}
  //                 />
  //                 <Route
  //                     path="/hello"
  //                     element={<Hello />}
  //                 />
  //                 <Route
  //                     path="/example"
  //                     element={<ExamplePage />}
  //                 />
  //                 <Route
  //                     path="/backend-test"
  //                     element={<BackendTest />}
  //                 />
  //                 <Route
  //                     path="*"
  //                     element={<Navigate to="/" />}
  //                 />
  //             </Routes>
  //         </BrowserRouter>
  //     </>
  // );
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<BuyerAccount />} />
          <Route path="/dashboard" element={<BuyingGroupDashboard />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/buyer-account" element={<BuyerAccount />} />
          <Route path="/seller-account" element={<SellerAccount />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/joined-groups" element={<JoinedGroups />} />
          <Route path="/created-groups" element={<CreatedGroups />} />
          <Route path="/group/:id" element={<BuyingGroupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

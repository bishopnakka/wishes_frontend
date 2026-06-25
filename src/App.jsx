import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loader from "./components/Loader"
const Login = React.lazy(()=> import("./pages/Login"))
// import Login from "./pages/Login";
const Dashboard =
React.lazy(() => import("./pages/Dashboard"));
// import Dashboard from "./pages/Dashboard";
const CreateWish = React.lazy(()=> import("./pages/CreateWish"))
// import CreateWish from "./pages/CreateWish";
const WishView = React.lazy(()=> import("./pages/WishView"))
// import WishView from "./pages/WishView";
const ProtectedRoute =React.lazy(()=> import("./components/ProtectedRoute"))
// import ProtectedRoute from "./components/ProtectedRoute";
const AdminPanel = React.lazy(()=> import("./pages/AdminPanel"))
// import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";
const EditWish = React.lazy(()=> import("./pages/EditWish"))
// import EditWish from "./pages/EditWish";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/create/:id"
          element={
            <ProtectedRoute>
              <CreateWish />
            </ProtectedRoute>
          }
        />
        <Route path="/wish/:id" element={<WishView />} />
        <Route
          path="/admin"
          element={
            localStorage.getItem("role") === "admin" ? <AdminPanel /> : <Home />
          }
        />
        <Route path="/edit/:id" element={<EditWish />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

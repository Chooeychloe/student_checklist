import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import CreateSubject from "./pages/Subjects/CreateSubject";

export default function App() {
  const { user } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={user ? <Home></Home> : <Register />}
          />
          <Route path="/login" element={user ? <Home></Home> : <Login />} />
          <Route path="/create" element={user ? <CreateSubject></CreateSubject> : <Login />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

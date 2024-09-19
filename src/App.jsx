import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import CreateSubject from "./pages/Subjects/CreateSubject";
import Show from "./pages/Subjects/Show";
import Update from "./pages/Subjects/Update";
import Welcome from "./pages/Welcome";

export default function App() {
  const { user } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={user ? <Home></Home>:<Welcome></Welcome>} />
          <Route
            path="/register"
            element={user ? <Welcome></Welcome> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Welcome></Welcome> : <Login />}
          />
          <Route
            path="/create"
            element={user ? <CreateSubject></CreateSubject> : <Login />}
          />
           <Route
            path="/home"
            element={user ? <Home></Home> : <Login />}
          />
          <Route
            path="/subjects/:id"
            element={user ? <Show></Show> : <Login />}
          />
          <Route
            path="/subjects/update/:id"
            element={user ? <Update></Update> : <Login />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

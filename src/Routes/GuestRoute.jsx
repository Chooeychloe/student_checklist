import { useContext } from "react"
import { AppContext } from "../Context/AppContext"
import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
    const {user} = useContext(AppContext);

    return !user.id ? <Outlet></Outlet> : <Navigate to='/home'></Navigate>;
};

export default GuestRoutes;
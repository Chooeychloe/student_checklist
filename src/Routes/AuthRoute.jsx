import { useContext } from "react"
import { AppContext } from "../Context/AppContext"
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
    
    const {user} = useContext(AppContext);

    return user.id ? <Outlet></Outlet> : <Navigate to='/login'></Navigate>;
};

export default AuthRoutes;
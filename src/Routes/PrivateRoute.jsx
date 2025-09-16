import { Children, useContext} from "react";
import { AuthContex } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContex);
    const location = useLocation();
    // console.log(user,loading)
    if(loading){
        return <progress className="progress w-56"></progress>
    }
    if(user){
         return children
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    

   

    
};

export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import {Outlet} from "react-router-dom";

interface AdminProtectedRoutesProps {
allowedRoles: string[];


}
const AdminProtectedRoutes: React.FC<AdminProtectedRoutesProps> = ({allowedRoles}) => {
const Role=localStorage.getItem("role");
const token = localStorage.getItem("token");
if(!Role || !token){
    return <Navigate to="/login" replace />;
}


if(allowedRoles.includes(Role)){
    return <><Outlet/></>;//here Ouytlet is used to render the childern routes of the protected routes
}
    return <Navigate to="/login" replace />
};

export default AdminProtectedRoutes;
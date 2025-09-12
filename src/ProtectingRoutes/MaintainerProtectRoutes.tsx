
import React from "react";
import { Navigate,Outlet} from "react-router-dom";
import {} from "react-router-dom";


interface MaintainerProtectRoutesProps {

allowableRoles:String[];
};

const MaintainerProtectRoutes:React.FC<MaintainerProtectRoutesProps>=({allowableRoles}) => {

const Role=localStorage.getItem("role");
const Token=localStorage.getItem("token");

if(!Role || !Token){
 return <Navigate to="/login" replace />;
  
}

if( allowableRoles.includes(Role)){
    return <><Outlet /></>;//here Ouytlet is used to render the childern routes of the protected routes
}
 return <Navigate to="/login" replace />
};
export default MaintainerProtectRoutes;
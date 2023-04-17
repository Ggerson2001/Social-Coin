import { Outlet, Navigate } from 'react-router-dom';
import AdminUserRoutes from './adminUserRoutes';
import ServiceUserRoutes from './serviceUserRoutes';


const PrivateRoutes = () => {
    const token = localStorage.getItem('access_token')
    const role = localStorage.getItem('role')

    if (token && role === 'admin' ) {
        return <Outlet />
    // } else if (token && role === 'service') {
    //     // render different set of routes for regular users
    //     return <ServiceUserRoutes />
    // } 
    }else if(token && role === 'client' ){
        return <Outlet />
    }
    else{
        return <Navigate to="/" />
    }
}

export default PrivateRoutes
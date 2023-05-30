import { Outlet, Navigate } from "react-router-dom";

/**
 * PrivateRoutes component determines the routes to render based on the user's role and authentication status.
 * If the user is authenticated with an "admin" role, it renders all routes.
 * If the user is authenticated with a "service" role, it renders a different set of routes.
 * If the user is authenticated with a "client" role, it renders a different set of routes.
 * If the user is not authenticated, it navigates to the "/" route.
 */
const PrivateRoutes = () => {
  // Retrieve token and role from local storage
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (token && role === "admin") {
    // Render all routes for an admin user
    return <Outlet />;
  } else if (token && role === "service") {
    // Render different set of routes for a service user
    return <Outlet />;
  } else if (token && role === "client") {
    // Render different set of routes for a client user
    return <Outlet />;
  } else {
    // Navigate to the "/" route if user is not authenticated
    return <Navigate to="/" />;
  }
};

export default PrivateRoutes;

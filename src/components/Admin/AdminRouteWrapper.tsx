import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import AdminPage from "../../pages/AdminPage";

export default function AdminRouteWrapper() {
  const { user } = useAuth();

  // Dumb fix for redirect...
  // ACL wont accept pats as input, Api wont work but the view will oterwise render
  if (!user || user.role !== 'admin') {
    return <Navigate to="/not-found" replace />;
  }

  return <AdminPage />;
}

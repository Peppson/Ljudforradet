import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import AdminPage from "../../pages/AdminPage";

export default function AdminPageWrapper() {
  const { user } = useAuth();

  // Dumb fix for redirect...
  // ACL wont accept paths as inputs... Api wont work but the view will render if we dont do this
  if (!user || user.role !== "admin") {
    return <Navigate to="/not-found" replace />;
  }

  return <AdminPage />;
}

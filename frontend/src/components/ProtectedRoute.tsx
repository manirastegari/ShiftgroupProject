import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export default function ProtectedRoute() {
  const token = useAuthStore((s) => s.token) || localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}



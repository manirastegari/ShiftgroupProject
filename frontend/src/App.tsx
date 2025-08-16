import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import { useAuthStore } from './store/auth';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <header className="border-b bg-white/90 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
            <Link to="/" className="text-lg font-semibold tracking-wide">Shift Group Project</Link>
            <div className="ml-auto flex items-center gap-3">
              <HeaderUserArea />
            </div>
          </div>
        </header>
        <main className="max-w-6xl w-full mx-auto px-4 py-6 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/contacts" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/new" element={<NewContact />} />
              <Route path="/contacts/:id" element={<EditContact />} />
            </Route>
          </Routes>
        </main>
        <footer className="border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-600">Developer: Mani Rastegari</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

function HeaderUserArea() {
  const { user, token, logout } = useAuthStore();
  if (!token || !user) {
    return (
      <nav className="space-x-4">
        <Link to="/login" className="text-sm">Login</Link>
        <Link to="/register" className="text-sm">Register</Link>
      </nav>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-gray-700">{user.name} <span className="text-xs text-gray-500">({user.role})</span></div>
      <Link to="/contacts/new" className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded">New Contact</Link>
      <button onClick={logout} className="text-sm border px-3 py-1.5 rounded">Logout</button>
    </div>
  );
}

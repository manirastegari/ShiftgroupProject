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
        <header className="border-b bg-white/90 backdrop-blur shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/" className="text-lg font-bold tracking-wide text-blue-600 hover:text-blue-700 transition-colors">
              Shift Group Project
            </Link>
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
        <footer className="border-t bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center">
            <div className="text-sm text-gray-600">
              <div className="mb-2">
                <span className="font-semibold text-gray-800">Shift Group Project</span>
              </div>
              <div>
                Developer: <span className="font-medium text-gray-800">Mani Rastegari</span>
              </div>
            </div>
          </div>
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
      <nav className="flex items-center gap-4">
        <Link 
          to="/login" 
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Register
        </Link>
      </nav>
    );
  }
  
  return (
    <div className="flex items-center gap-4">
      {/* User Info */}
      <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg">
        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-medium text-xs">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="text-sm min-w-0">
          <div className="font-medium text-gray-900 truncate">{user.name}</div>
          <div className="text-xs text-gray-500 capitalize">{user.role}</div>
        </div>
      </div>
      
      {/* Actions */}
      <Link 
        to="/contacts/new" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Add Contact
      </Link>
      <button 
        onClick={logout} 
        className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

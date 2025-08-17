import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import ThemeToggle from './components/ThemeToggle';
import { useAuthStore } from './store/auth';
import { useThemeStore, applyTheme } from './store/theme';
import { useEffect } from 'react';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900 text-gray-100' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <header className={`border-b backdrop-blur shadow-sm transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800/90 border-gray-700' 
            : 'bg-white/90 border-gray-200'
        }`}>
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/" className={`!text-5xl !font-black !tracking-wide !transition-all !duration-300 hover:!scale-105 !cursor-pointer ${
              theme === 'dark' 
                ? '!text-blue-400 hover:!text-blue-300' 
                : '!text-blue-700 hover:!text-blue-800'
            }`} style={{ fontSize: '3rem', fontWeight: '900' }}>
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
        <footer className={`border-t shadow-sm transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className={`text-sm transition-colors duration-300 text-center md:text-left ${
                theme === 'dark' 
                  ? 'text-gray-400' 
                  : 'text-gray-600'
              }`}>
                <div className="mb-2">
                  <span className={`font-semibold transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-gray-200' 
                      : 'text-gray-800'
                  }`}>
                    Shift Group Project
                  </span>
                </div>
                <div>
                  Developer: <span className={`font-medium transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-gray-200' 
                      : 'text-gray-800'
                  }`}>
                    Mani Rastegari
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center">
                <ThemeToggle />
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
  const { theme } = useThemeStore();
  
  if (!token || !user) {
    return (
      <nav className="flex items-center gap-4">
        <Link 
          to="/login" 
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            theme === 'dark'
              ? 'text-gray-300 hover:text-white hover:bg-gray-700'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
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
      <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-700' 
          : 'bg-gray-50'
      }`}>
        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-medium text-xs">
            {/* {user.name.charAt(0).toUpperCase()} */}
          </span>
        </div>
        <div className="text-sm min-w-0">
          <div className={`font-medium transition-colors duration-300 ${
            theme === 'dark' 
              ? 'text-gray-100' 
              : 'text-gray-900'
          } truncate`}>
            {/* {user.name} */}
          </div>
          <div className={`text-xs transition-colors duration-300 ${
            theme === 'dark' 
              ? 'text-gray-400' 
              : 'text-gray-500'
          } capitalize`}>
            {/* {user.role} */}
          </div>
        </div>
      </div>
      
      {/* Actions */}
      {/* <Link 
        to="/contacts/new" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Add Contact
      </Link> */}
      <button 
        onClick={logout} 
        className={`border px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          theme === 'dark'
            ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        Logout
      </button>
    </div>
  );
}

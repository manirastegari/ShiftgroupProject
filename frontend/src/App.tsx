import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="border-b bg-white">
          <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
            <Link to="/" className="font-semibold">Contacts</Link>
            <nav className="space-x-4">
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto p-4">
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
      </div>
    </BrowserRouter>
  );
}

export default App;

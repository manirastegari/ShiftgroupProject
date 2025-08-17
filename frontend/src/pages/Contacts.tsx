import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { useTheme } from '../hooks/useTheme';

type Contact = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  photo?: string;
  createdAt: string;
  ownerId?: string;
  ownerName?: string;
};

export default function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useAuthStore((s) => s.user);
  const { colors, components } = useTheme();

  // Filter contacts based on search term
  const filteredContacts = useMemo(() => {
    if (!search.trim()) return contacts;
    
    const searchLower = search.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchLower) ||
      (contact.email && contact.email.toLowerCase().includes(searchLower))
    );
  }, [contacts, search]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/contacts', { params: { page, limit, sortBy, sortOrder } });
      setContacts(data.data);
      setTotal(data.total);
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'response' in err && 
        err.response && typeof err.response === 'object' && 'data' in err.response &&
        err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data
        ? String(err.response.data.message)
        : 'Failed to fetch';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, sortBy, sortOrder]);

  const canEditContact = (contact: Contact) => {
    return currentUser?.role === 'admin' || currentUser?.id === contact.ownerId;
  };

  const handleDelete = async (contact: Contact) => {
    if (!confirm(`Are you sure you want to delete "${contact.name}"?`)) return;
    try {
      await api.delete(`/contacts/${contact.id}`);
      fetchData();
    } catch (err: unknown) {
      console.error('Failed to delete contact:', err);
      alert('Failed to delete contact');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  return (
    <div className="space-y-4">
      {/* User Info Header */}
      {currentUser && (
        <div className={`${colors.bg.secondary} ${colors.border.primary} border rounded-lg p-4 shadow-sm`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              {/* {currentUser.name.charAt(0).toUpperCase()} */}
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`font-semibold ${colors.text.primary} truncate`}>
                <span className="font-bold">Name:</span> {currentUser.name}
              </span>
              <span className={`text-sm ${colors.text.secondary}`}>
                <span className="font-bold">Email:</span> {currentUser.email}
              </span>
              <span className={`text-xs ${colors.text.muted} capitalize`}>
                <span className="font-bold">Role:</span> {currentUser.role === "admin" ? "Admin" : "User"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className={`${colors.bg.card} ${colors.border.primary} border rounded-lg shadow-sm p-6`}>
        <h1 className={`text-2xl font-bold ${colors.text.primary} mb-6`}>Contact Management</h1>
        
        {/* Search and Controls Row */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="w-full">
            <div className="relative">
              <input
                className={`w-full ${components.input} text-base pl-12 py-3 rounded-lg border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                placeholder="Search by name or email..."
                value={search}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {search && (
              <div className="mt-2 text-sm text-gray-500">
                Found {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Sort Controls */}
            <div className="flex gap-3">
              <select
                className={`${components.input} text-sm px-4 py-2 rounded-lg border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'createdAt')}
              >
                <option value="createdAt">Created Date</option>
                <option value="name">Name</option>
              </select>
              <select
                className={`${components.input} text-sm px-4 py-2 rounded-lg border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'ASC' | 'DESC')}
              >
                <option value="DESC">Descending</option>
                <option value="ASC">Ascending</option>
              </select>
            </div>

            {/* Add Contact Button */}
            <Link
              to="/contacts/new"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className={`bg-red-50 ${colors.border.primary} border rounded-lg p-3`}>
          <div className="text-red-800 text-xs">{error}</div>
        </div>
      )}

      {/* Contacts List */}
      {!loading && (
        <div>
          {filteredContacts.map((contact, index) => (
            <div
              key={contact.id}
              className={`${colors.bg.card} ${colors.border.primary} border rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200 ${
                index < filteredContacts.length - 1 ? 'mb-6' : ''
              }`}
            >
              {/* Profile Image and Info Row */}
              <div className="flex items-start">
                <div className="flex-shrink-0" style={{ margin: '32px' }}>
                  {contact.photo ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/uploads/${contact.photo}`}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center border border-gray-200">
                      <span className="text-gray-400 font-bold text-lg">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold ${colors.text.primary} text-sm mb-2`} style={{ marginTop: '32px' }}>
                    <span className="font-bold">Name:</span> {contact.name}
                  </div>
                  {/* Email */}
                  <div className="flex items-center mb-1">
                    {/* <span className="font-bold text-gray-400 mr-1.5 text-xs">📧</span> */}
                    <span className={`text-xs ${colors.text.secondary}`}>
                      <span className="font-bold">Email:</span> {contact.email || <span className="italic text-gray-400">No email</span>}
                    </span>
                  </div>
                  {/* Phone */}
                  <div className="flex items-center mb-1">
                    {/* <span className="font-bold text-gray-400 mr-1.5 text-xs">📱</span> */}
                    <span className={`text-xs ${colors.text.secondary}`}>
                      <span className="font-bold">Phone:</span> {contact.phone || <span className="italic text-gray-400">No phone</span>}
                    </span>
                  </div>
                  {/* Created and Owner - Owner on next line for admin view */}
                  <div className="flex flex-col gap-1 mt-2">
                    <span className={`text-xs ${colors.text.muted}`}>
                      <span className="font-bold">Created:</span> {format(new Date(contact.createdAt), 'MMM dd, yyyy')}
                    </span>
                    {currentUser?.role === 'admin' && contact.ownerName && (
                      <span className={`text-xs ${colors.text.muted}`}>
                        <span className="font-bold">Owner:</span> <span className="font-medium">{contact.ownerName}</span>
                      </span>
                    )}
                  </div>

                  {/* Actions - Now below the contact info */}
                  {canEditContact(contact) && (
                    <div className="flex gap-2" style={{ marginTop: '32px', paddingTop: '16px' }}>
                      <button
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        onClick={() => navigate(`/contacts/${contact.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        onClick={() => handleDelete(contact)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && total > 0 && (
        <div className={`${colors.bg.card} ${colors.border.primary} border rounded-lg shadow-sm p-4`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className={`text-xs ${colors.text.muted}`}>
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} contacts
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-1.5 ${colors.border.secondary} border rounded-md text-xs ${colors.hover.bg} disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${colors.text.secondary}`}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Previous
              </button>
              <span className={`px-3 py-1.5 text-xs font-medium ${colors.text.primary}`}>
                Page {page} of {totalPages}
              </span>
              <button
                className={`px-3 py-1.5 ${colors.border.secondary} border rounded-md text-xs ${colors.hover.bg} disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${colors.text.secondary}`}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredContacts.length === 0 && !error && (
        <div className="text-center py-8">
          <div className="mx-auto text-gray-400 mb-3 text-2xl font-bold">👥</div>
          <h3 className={`text-sm font-medium ${colors.text.primary} mb-1`}>No contacts found</h3>
          <p className={`text-xs ${colors.text.muted} mb-4`}>
            {search ? `No contacts match "${search}"` : 'Get started by creating your first contact.'}
          </p>
          {!search && (
            <div className="mt-4">
              <Link
                to="/contacts/new"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Contact
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
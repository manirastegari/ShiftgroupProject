// ... existing imports ...
import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

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

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/contacts', { params: { page, limit, search: search || undefined, sortBy, sortOrder } });
      setContacts(data.data);
      setTotal(data.total);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, search, sortBy, sortOrder]);

  const canEditContact = (contact: Contact) => {
    return currentUser?.role === 'admin' || currentUser?.id === contact.ownerId;
  };

  const handleDelete = async (contact: Contact) => {
    if (!confirm(`Are you sure you want to delete "${contact.name}"?`)) return;
    try {
      await api.delete(`/contacts/${contact.id}`);
      fetchData();
    } catch {
      alert('Failed to delete contact');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h1 className="text-lg font-bold text-gray-900 mb-3">Contact Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1 min-w-0">
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <select
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'createdAt')}
            >
              <option value="createdAt">Created Date</option>
              <option value="name">Name</option>
            </select>
            <select
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'ASC' | 'DESC')}
            >
              <option value="DESC">Descending</option>
              <option value="ASC">Ascending</option>
            </select>
            <Link
              to="/contacts/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="text-red-800 text-xs">{error}</div>
        </div>
      )}

      {/* Contacts List */}
      {!loading && (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow transition"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0">
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
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="ml-4 flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm truncate">{contact.name}</div>
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  {contact.email && (
                    <span className="flex items-center mr-3">
                      <svg className="w-3 h-3 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="truncate">{contact.email}</span>
                    </span>
                  )}
                  {contact.phone && (
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="truncate">{contact.phone}</span>
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Created: {format(new Date(contact.createdAt), 'MMM dd, yyyy')}
                </div>
                {currentUser?.role === 'admin' && contact.ownerName && (
                  <div className="text-xs text-gray-500 mt-1">
                    Owner: <span className="font-medium">{contact.ownerName}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              {canEditContact(contact) && (
                <div className="flex flex-col gap-1 ml-4">
                  <button
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium transition-colors"
                    onClick={() => navigate(`/contacts/${contact.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-medium transition-colors"
                    onClick={() => handleDelete(contact)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && total > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-xs text-gray-600">
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} contacts
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Previous
              </button>
              <span className="px-3 py-1.5 text-xs font-medium text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                className="px-3 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
      {!loading && contacts.length === 0 && !error && (
        <div className="text-center py-8">
          <svg className="mx-auto h-6 w-6 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-sm font-medium text-gray-900 mb-1">No contacts found</h3>
          <p className="text-xs text-gray-500 mb-4">
            {search ? `No contacts match "${search}"` : 'Get started by creating your first contact.'}
          </p>
          {!search && (
            <div className="mt-4">
              <Link
                to="/contacts/new"
                className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Contact
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import { format } from 'date-fns';

type Contact = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  photo?: string;
  createdAt: string;
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <div className="flex gap-2 items-center mb-4">
        <input className="border rounded p-2 flex-1" placeholder="Search name or email" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="border rounded p-2" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
          <option value="createdAt">Created</option>
          <option value="name">Name</option>
        </select>
        <select className="border rounded p-2" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)}>
          <option value="DESC">Desc</option>
          <option value="ASC">Asc</option>
        </select>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((c) => (
            <div key={c.id} className="bg-white rounded shadow p-4 flex gap-3">
              {c.photo ? (
                <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/uploads/${c.photo}`} alt={c.name} className="w-16 h-16 rounded object-cover" />
              ) : (
                <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center text-gray-500">NA</div>
              )}
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-600">{c.email || '-'}</div>
                <div className="text-sm text-gray-600">{c.phone || '-'}</div>
                <div className="text-xs text-gray-400 mt-1">{format(new Date(c.createdAt), 'PP p')}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">Total: {total}</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
          <div className="text-sm">{page} / {totalPages}</div>
          <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}



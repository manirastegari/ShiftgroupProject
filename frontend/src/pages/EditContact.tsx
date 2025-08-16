import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/contacts/${id}`).then(({ data }) => {
      setName(data.name);
      setEmail(data.email || '');
      setPhone(data.phone || '');
    });
  }, [id]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('name', name);
      if (email) form.append('email', email);
      if (phone) form.append('phone', phone);
      if (photoFile) form.append('photo', photoFile);
      if (id) await api.put(`/contacts/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/contacts');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Contact</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button disabled={loading} className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-60">{loading ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  );
}



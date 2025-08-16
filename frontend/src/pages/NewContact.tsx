import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function NewContact() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      await api.post('/contacts', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/contacts');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Create failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">New Contact</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button disabled={loading} className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-60">{loading ? 'Creating...' : 'Create'}</button>
      </form>
    </div>
  );
}



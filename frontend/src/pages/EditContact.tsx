import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';
import { useAuthStore } from '../store/auth';

type Contact = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
  ownerId?: string;
  ownerName?: string;
};

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.user);
  const [contact, setContact] = useState<Contact | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchContact = async () => {
      try {
        setFetching(true);
        const { data } = await api.get(`/contacts/${id}`);
        
        // Check if user can edit this contact
        if (currentUser?.role !== 'admin' && currentUser?.id !== data.ownerId) {
          setError('You are not authorized to edit this contact');
          return;
        }
        
        setContact(data);
        setName(data.name);
        setEmail(data.email || '');
        setPhone(data.phone || '');
        if (data.photo) {
          setPhotoPreview(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/uploads/${data.photo}`);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to fetch contact');
      } finally {
        setFetching(false);
      }
    };

    fetchContact();
  }, [id]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (contact?.photo) {
      // Reset to original photo
      setPhotoPreview(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/uploads/${contact.photo}`);
    } else {
      setPhotoPreview(null);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('name', name.trim());
      if (email.trim()) form.append('email', email.trim());
      if (phone.trim()) form.append('phone', phone.trim());
      if (photoFile) form.append('photo', photoFile);
      
      if (id) {
        await api.put(`/contacts/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      navigate('/contacts');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save contact');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto text-red-400 mb-4 text-3xl font-bold">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/contacts')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Back to Contacts
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Contact</h1>
        <p className="text-gray-600">Update contact information and photo</p>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input 
              id="name"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
              placeholder="Enter contact's full name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input 
              id="email"
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
              placeholder="Enter contact's email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input 
              id="phone"
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
              placeholder="Enter contact's phone number" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <div className="space-y-4">
              <input 
                id="photo"
                type="file" 
                accept="image/*" 
                onChange={handlePhotoChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              
              {/* Photo Preview */}
              {photoPreview && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                    <img 
                      src={photoPreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoFile(null);
                      setPhotoPreview(null);
                      if (contact?.photo) {
                        setPhotoPreview(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/uploads/${contact.photo}`);
                      } else {
                        setPhotoPreview(null);
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove photo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-red-400 mr-2 font-bold text-lg">⚠️</span>
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={() => navigate('/contacts')}
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading || !name.trim()} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



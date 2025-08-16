# 🔐 Admin Credentials

## Admin Login
**Email:** `admin@shiftgroup.com`  
**Password:** `123456`

## Test User Login
**Email:** `test@example.com`  
**Password:** `123456`

---

## 🎯 How the App Works

### **Regular Users (Role: user)**
- ✅ Register and login
- ✅ Add their own contacts
- ✅ Edit/delete their own contacts
- ❌ Cannot see other users' contacts
- ❌ Cannot manage users

### **Admin Users (Role: admin)**
- ✅ Login with admin credentials
- ✅ See ALL contacts from ALL users
- ✅ Add contacts (assigned to any user)
- ✅ Edit/delete ANY contact
- ✅ View all users
- ✅ Change user roles
- ✅ Delete users
- ✅ Full system access

---

## 🚀 Quick Start

1. **Frontend:** http://localhost:5173
2. **Backend:** http://localhost:3000
3. **Login as Admin:** Use `admin@shiftgroup.com` / `123456`
4. **Login as User:** Use `test@example.com` / `123456`

---

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Users can only access their own data
- Admins have full system access
- Protected API endpoints

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
# Shift Group Project - Contact Management Application

A full-stack Contact Management Application built with NestJS, React, and PostgreSQL, featuring user authentication, role-based access control, and full CRUD functionality for contacts.

## 🚀 Features

### Backend (NestJS)
- **Secure REST API** with JWT-based authentication
- **Role-based access control** (user/admin roles)
- **Contact management** with full CRUD operations
- **File upload** for contact photos
- **Advanced filtering, sorting, and pagination**
- **PostgreSQL database** with TypeORM and migrations
- **Input validation** using class-validator
- **Global error handling** and standardized API responses

### Frontend (React)
- **Modern, responsive UI** built with Tailwind CSS
- **Authentication flow** with protected routes
- **Contact management interface** with search and sorting
- **Photo upload and preview** functionality
- **State management** using Zustand
- **Mobile-responsive design**

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **PostgreSQL** - Relational database
- **TypeORM** - Object-relational mapping
- **JWT** - JSON Web Token authentication
- **Passport** - Authentication middleware
- **Multer** - File upload handling
- **Class-validator** - Input validation
- **bcrypt** - Password hashing

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Zustand** - State management
- **Vite** - Build tool

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Docker (optional, for database)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd ShiftgroupProject
```

### 2. Start the database
```bash
# Using Docker (recommended)
docker-compose up -d

# Or manually start PostgreSQL and create database 'shiftgroup_contacts'
```

### 3. Backend setup
```bash
cd backend
npm install

# Set environment variables (create .env file)
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run typeOrm:run

# Start the development server
npm run start:dev
```

### 4. Frontend setup
```bash
cd frontend
npm install

# Start the development server
npm run dev
```

### 5. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=shiftgroup_contacts
DB_LOGGING=false

# JWT
JWT_SECRET=your-secret-key-here

# Admin user (optional)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ADMIN_NAME=Admin User

# Server
PORT=3000
```

## 📚 API Documentation

### Authentication Endpoints

#### POST /auth/register
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /auth/login
Login with existing credentials
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Contact Endpoints

All contact endpoints require JWT authentication.

#### POST /contacts
Create a new contact
```json
{
  "name": "Contact Name",
  "email": "contact@example.com",
  "phone": "+1234567890"
}
```

#### GET /contacts
Get paginated contacts with optional search and sorting
```
GET /contacts?page=1&limit=10&search=john&sortBy=name&sortOrder=ASC
```

#### GET /contacts/:id
Get a specific contact

#### PUT /contacts/:id
Update a contact

#### DELETE /contacts/:id
Delete a contact

### User Management (Admin only)

#### GET /users
List all users (admin only)

#### PUT /users/:id/role
Update user role (admin only)

#### DELETE /users/:id
Delete user (admin only)

## 🔐 Role-Based Access Control

### User Role
- Can create, read, update, and delete their own contacts
- Cannot access other users' contacts
- Cannot manage users

### Admin Role
- Can access all contacts from all users
- Can manage all users (view, update roles, delete)
- Full system access

## 🎨 UI Features

- **Responsive design** that works on all devices
- **Dark/light mode** support (coming soon)
- **Search and filtering** for contacts
- **Sorting** by name or creation date
- **Pagination** for large contact lists
- **Photo upload** with preview
- **Form validation** with error messages
- **Loading states** and user feedback

## 🗄️ Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `passwordHash` (VARCHAR)
- `role` (VARCHAR, Default: 'user')
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### Contacts Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Nullable)
- `phone` (VARCHAR, Nullable)
- `photo` (VARCHAR, Nullable)
- `ownerId` (UUID, Foreign Key to Users)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the dist folder to your hosting service
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests (if configured)
cd frontend
npm run test
```

## 📁 Project Structure

```
ShiftgroupProject/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── contacts/       # Contacts module
│   │   ├── users/          # Users module
│   │   ├── entities/       # Database entities
│   │   ├── dto/            # Data transfer objects
│   │   └── migrations/     # Database migrations
│   └── uploads/            # File uploads
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # State management
│   │   └── api/            # API client
│   └── public/             # Static assets
└── docker-compose.yml      # Database setup
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Mani Rastegari**

---

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Review the API documentation above
3. Ensure all environment variables are set correctly
4. Verify database connection and migrations

## 🔄 Recent Updates

- Fixed JWT strategy token structure
- Added proper role-based access control
- Improved frontend authorization logic
- Enhanced responsive design and image handling
- Added comprehensive error handling
- Improved user experience with better loading states

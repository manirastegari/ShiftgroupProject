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
# ShiftgroupProject

Full-stack Contact Management app built with Nest.js, React, and PostgreSQL.

## Features
- JWT auth (register/login), role-based access (user/admin)
- Contacts CRUD with photo upload (disk), pagination, search, sorting
- Admin endpoints for users (list/get/update role/delete)
- TypeORM + migrations, global validation, static uploads
- React frontend with protected routes and Tailwind styling

## Local Development
### Prereqs
- Node 20+, PostgreSQL 16+

### Database
```bash
brew install postgresql@16
brew services start postgresql@16
createdb shiftgroup_contacts || true
```

### Backend
```bash
cd backend
export JWT_SECRET=dev_secret
export ADMIN_EMAIL=admin@example.com
export ADMIN_PASSWORD=StrongPassword123
npm i
npm run build
npm run typeOrm:run
npm run start:dev
# Health: http://localhost:3000/health
```

### Frontend
```bash
cd frontend
echo VITE_API_URL=http://localhost:3000 > .env.local
npm i
npm run dev
# Open the printed URL (http://localhost:5173 or 5174)
```

## API (summary)
- POST `/auth/register` { name, email, password }
- POST `/auth/login` { email, password }
- POST `/contacts` multipart: name, email?, phone?, photo?
- GET `/contacts` query: page, limit, search, sortBy, sortOrder
- GET `/contacts/:id`
- PUT `/contacts/:id` multipart
- DELETE `/contacts/:id`
- Admin (JWT with role=admin):
  - GET `/users`
  - GET `/users/:id`
  - PUT `/users/:id/role` { role }
  - DELETE `/users/:id`

## Production (GCP Cloud Run + Cloud SQL)
1. Create Cloud SQL (PostgreSQL) instance and DB `shiftgroup_contacts`
2. Build/push backend image to Artifact Registry:
```bash
cd backend
gcloud artifacts repositories create shiftgroup-repo --repository-format=docker --location=us-central1 || true
gcloud auth configure-docker us-central1-docker.pkg.dev
gcloud builds submit --tag us-central1-docker.pkg.dev/$(gcloud config get project)/shiftgroup-repo/backend:latest .
```
3. Deploy Cloud Run (connect to Cloud SQL):
```bash
INSTANCE=$(gcloud sql instances describe shiftgroup-pg --format='value(connectionName)')
gcloud run deploy shiftgroup-backend \
  --image us-central1-docker.pkg.dev/$(gcloud config get project)/shiftgroup-repo/backend:latest \
  --platform managed --region us-central1 --allow-unauthenticated \
  --add-cloudsql-instances $INSTANCE \
  --set-env-vars "DB_HOST=/cloudsql/$INSTANCE,DB_PORT=5432,DB_USER=postgres,DB_PASSWORD=<DB_PASSWORD>,DB_NAME=shiftgroup_contacts,JWT_SECRET=<RANDOM_SECRET>,DB_LOGGING=false,ADMIN_EMAIL=admin@example.com,ADMIN_PASSWORD=StrongPassword123,ADMIN_NAME=Admin" \
  --port 8080
```
4. Use the Cloud Run URL as `VITE_API_URL` for the frontend build/hosting.

## Data & uploads
- Data: stored in PostgreSQL database `shiftgroup_contacts` (local dev) or your Cloud SQL DB
- Images: saved under backend `uploads/` and served at `/uploads/<filename>`

## Tests & Stretch Goals
- Not yet included: CSV export, email notifications, PWA, full-text search, automated tests.
- These can be added on request.

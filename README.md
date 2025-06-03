
### 📘 API Documentation (Swagger)

After starting your backend server, visit:

```
http://localhost:3000/docs
```

This includes:

* All routes grouped by module
* Request & response schemas
* Role & auth requirements (via Bearer Auth)

#### 🔐 Authenticated Routes

To access protected routes:

1. Use `POST /auth/login` to get a token
2. Click `Authorize` in Swagger and paste the token:

   ```
   Bearer <your_token>
   ```

---

### 🚀 Getting Started

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Configure Environment

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:yourpass@localhost:5432/foodapp
JWT_SECRET=your-secret-key
```

#### 3. Run Migrations & Seed

```bash
npx prisma migrate dev --name init
npm run seed
```

#### 4. Start the Server

```bash
npm run start:dev
```

---

### 👥 Dummy Seed Users

The database comes preloaded with the following test users for convenience:

| Email                                               | Name            | Role    | Country | Password    |
| --------------------------------------------------- | --------------- | ------- | ------- | ----------- |
| [nick@avengers.com](mailto:nick@avengers.com)       | Nick Fury       | ADMIN   | INDIA   | password123 |
| [marvel@avengers.com](mailto:marvel@avengers.com)   | Captain Marvel  | MANAGER | INDIA   | password123 |
| [america@avengers.com](mailto:america@avengers.com) | Captain America | MANAGER | AMERICA | password123 |
| [thor@avengers.com](mailto:thor@avengers.com)       | Thor            | MEMBER  | INDIA   | password123 |
| [thanos@avengers.com](mailto:thanos@avengers.com)   | Thanos          | MEMBER  | INDIA   | password123 |
| [travis@avengers.com](mailto:travis@avengers.com)   | Travis          | MEMBER  | AMERICA | password123 |

Use these credentials to log in during development and testing.


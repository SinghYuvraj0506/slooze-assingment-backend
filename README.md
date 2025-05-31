
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


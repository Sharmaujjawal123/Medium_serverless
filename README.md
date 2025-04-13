# 📝 Medium-Style Blog Platform (Serverless)

This is a Medium-like blogging platform built using **Cloudflare Workers**, **Hono** (a fast web framework), **Prisma**, and **PostgreSQL**.  
It uses **serverless architecture**, making it highly scalable, fast, and easy to maintain — with no traditional backend servers!

---

## 🚀 Features

- ✍️ Create, update, and fetch blog posts
- 🔐 JWT-based authentication
- 🧑‍💻 User authorization middleware
- ⚡ Serverless deployment via Cloudflare
- 🔄 Prisma + Accelerate for database access

---

## 🛠️ Tech Stack

- [Hono](https://hono.dev/) – web framework for Cloudflare Workers
- [Cloudflare Workers](https://workers.cloudflare.com/) – serverless backend
- [Prisma Accelerate](https://www.prisma.io/docs/accelerate) – edge-optimized ORM(connection Pooling)
- [PostgreSQL](https://www.postgresql.org/) – relational database
- [JWT](https://jwt.io/) – authentication tokens
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) – CLI for deploying to Cloudflare

---

## 📁 Project Structure

```bash
/
├── src/
│   └── index.ts         # Entry point
│   └── routes/
│       └── blog.ts      # Blog routes (CRUD + auth middleware)
│
├── prisma/
│   └── schema.prisma    # Prisma schema for DB
├── wrangler.toml        # Cloudflare Worker config
├── package.json         # NPM scripts
└── README.md
```
Run locally (Cloudflare dev mode)
npx wrangler dev
or
npm run dev(only for this)

🚀 Deployment to Cloudflare
npx wrangler deploy
or
npm run deploy(only for this)


📌 Todos
 Add user registration/login route

 Pagination for blog posts

 Search blogs by title/content

 Categories/tags for blogs

 Public/private blog toggle

 Frontend

👨‍💻 Author
Made with ❤️ by Ujjawal Sharma



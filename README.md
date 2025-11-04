# 🚀 TypeScript Express Server Template

A clean, secure, and scalable **Express.js + TypeScript** starter project.  
Preconfigured with common middleware (CORS, Helmet, Rate-Limiter, Sanitization, etc.) and a simple structure to help you build robust APIs fast.

## ✨ Features

- Built with **TypeScript** for type safety and cleaner code
- Uses **Express.js** for a fast and minimal backend
- Security-focused middlewares:
    - `helmet` for HTTP headers
    - `hpp` to prevent HTTP parameter pollution
    - Rate limiting to prevent abuse
    - Input sanitization to avoid XSS attacks
- Configurable **CORS** for multiple origins
- **Cookie parsing** ready out of the box
- Modular folder structure for routes, middlewares, and DB connection
- Async **database connection** setup (`connectDB`)
- Easy to extend with new routes, controllers, or services

## ⚙️ Environment Variables

Create a `.env` file with these variables:

```env
PORT=8080                  # Port the server runs on
ORIGINS=http://localhost:3000   # Allowed frontend URLs (comma-separated)
DB=mongodb+srv://<your-db-connection-string>
```

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/mezbaur2004/typescript-express-structure.git
cd typescript-express-structure
```

2. Install dependencies:

```bash
npm install
```

3. Run the dev server:

```bash
npm run dev
```

The server will start on the port you set in `.env` (default is 8080).

To test if it's working, open your browser and visit `http://localhost:8080/api`.  
You should see a JSON response like:

```json
{
  "message": "API is working!"
}
```

*(Add new routes in `src/route/api.ts` and connect them to controllers as needed.)*

## 🧑‍💻 Author

**Mezbaur Are Rafi** – [GitHub](https://github.com/mezbaur2004)
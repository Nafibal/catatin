# Catatin

Todo Management System berbasis full-stack dengan NestJS backend dan React frontend.

## Cara Menjalankan

```bash
docker compose up -d
```

Aplikasi akan berjalan di:

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Versi Node

- Node.js: 22 (Alpine)

## Keputusan Teknis

1. **NestJS + TypeORM + PostgreSQL**: Backend menggunakan framework NestJS dengan TypeORM untuk ORM dan PostgreSQL sebagai database.
2. **React 19 + Vite + TanStack Query + React Compiler**: Frontend dengan React terbaru, Vite untuk build tool yang cepat, TanStack Query untuk state management data fetching, dan React Compiler untuk automatic performance optimization.
3. **Multi-stage Docker Build**: Containerized deployment dengan multi-stage build untuk mengurangi image size dan menjaga production environment tetap ringan.

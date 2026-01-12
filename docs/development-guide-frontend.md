# Development Guide - Frontend

## Prerequisites
- Node.js >= 20
- npm

## Install
```
cd frontend
npm install
```

## Local Development
```
npm run dev
```
- Vite dev server runs on http://localhost:5173

## Build
```
npm run build
```

## Preview
```
npm run preview
```

## Notes
- API base path is `/api/v1` (see `frontend/src/services/api.ts`).
- Auth uses cookie-based sessions and a refresh flow.

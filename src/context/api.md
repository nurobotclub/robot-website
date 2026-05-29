# API Routes

Routes:

GET /api/items
GET /api/items/[id]

POST /api/borrow
GET /api/borrow/[id]

POST /api/return

GET /api/users

POST /api/email

GET /api/content
POST /api/content

GET /api/announcements
POST /api/announcements

GET /api/locations

Rules:
- Use Route Handlers
- Use server-side only
- Never expose Google API keys
- Validate all input
- Use TypeScript types
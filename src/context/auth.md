# Authentication System

Authentication:
- Google Login only
- NextAuth.js

Roles:
- user
- admin

Admin Email:
robotclub64@gmail.com

Rules:
- Only admin email can access /admin
- Use protected routes
- Redirect unauthenticated users to /login
- Use callbackUrl redirects
- Use session based auth
- Redirect after login

Protected User Routes:
- /equipment
- /equipment/[id]
- /cart
- /borrow/history
- /borrow/[id]
- /profile

Admin Routes:
- /admin
- /admin/items
- /admin/borrow
- /admin/returns
- /admin/users
- /admin/content
- /admin/history

Admin Check Example:

```ts
const ADMIN_EMAIL = "robotclub64@gmail.com"

const isAdmin =
  session.user.email === ADMIN_EMAIL
```
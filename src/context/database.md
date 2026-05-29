# Google Sheets Database

Sheets:
- users
- items
- borrow_requests
- borrow_history
- site_content
- announcements

---

# users

Fields:
- id
- name
- email
- role
- status
- createdAt

---

# items

Fields:
- id
- name
- description
- category
- quantityTotal
- quantityAvailable
- room
- cabinet
- shelf
- box
- slot
- imageUrl
- status
- createdAt
- updatedAt

---

# borrow_requests

Fields:
- id
- userId
- userName
- userEmail
- borrowerName
- borrowerPhone
- items
- borrowDate
- dueDate
- returnDate
- note
- status
- adminNote
- createdAt
- updatedAt

---

# borrow_history

Fields:
- id
- requestId
- action
- by
- note
- createdAt

---

# site_content

Fields:
- key
- value
- type
- updatedAt

---

# announcements

Fields:
- id
- title
- content
- createdAt
- updatedAt
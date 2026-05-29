# Borrow System

Features:
- Cart system
- Borrow multiple items
- Borrow request
- Return system
- Borrow history
- Borrow detail page

Borrow Form Fields:
- borrowerName
- borrowerPhone
- dueDate
- note

Borrow Status:
- pending
- approved
- rejected
- returned
- overdue

Borrow Flow:
User
↓
Add items to cart
↓
Submit borrow request
↓
Save to Google Sheet
↓
Send email to admin
↓
Admin approve/reject

Pages:
- /cart
- /borrow/history
- /borrow/[id]

Email Notification:
Send to:
robotclub64@gmail.com

Email must include:
- Borrower name
- Phone number
- Email
- Items
- Due date
- Note
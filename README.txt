# robot-website

# Project Overview

ระบบเว็บไซต์ชมรมสำหรับจัดการอุปกรณ์ ยืมคืน และคลังอุปกรณ์  
พัฒนาด้วย Next.js + TypeScript โดยใช้ Google Sheet เป็น Database หลัก

ระบบนี้ออกแบบสำหรับใช้งานภายในชมรม/มหาวิทยาลัย  
เน้นความเรียบง่าย ใช้งานง่าย ดูเป็นระบบ และรองรับมือถือ

Deployment ใช้ Vercel

---

# Main Goals

- จัดการอุปกรณ์ภายในชมรม
- ระบบยืมคืนอุปกรณ์
- ระบบคลังและตำแหน่งจัดเก็บ
- รองรับสมาชิกและแอดมิน
- ใช้งานง่ายทั้งมือถือและคอม
- แจ้งเตือนแอดมินผ่าน Email
- UI ดูทันสมัย กึ่งทางการ
- ใช้ Google Sheet เป็น Database หลัก
- Admin สามารถอัปเดตข้อมูลหน้าเว็บผ่านหน้า Admin ได้

---

# Tech Stack

## Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- Next.js Route Handlers
- Server Actions

## Database

- Google Sheets API

## Authentication

- Google Login
- NextAuth.js

## Email Notification

- Nodemailer
- Gmail SMTP หรือ Resend

## Deployment

- Vercel

---

# Development Strategy

## Development Flow

1. สร้าง UI และระบบหลักก่อน
2. ใช้ mock data ระหว่างพัฒนา
3. สร้าง Google Sheets API ภายหลัง
4. เชื่อม Google Sheet ตอนระบบเริ่มนิ่ง

---

## Important Notes

- ห้าม expose Google API keys ฝั่ง frontend
- เชื่อม Google Sheets ผ่าน backend เท่านั้น
- ใช้ Route Handlers หรือ Server Actions
- Validate ข้อมูลก่อนเขียนลง Google Sheet
- ใช้ reusable components
- UI ต้อง responsive ทุกหน้า
- Admin ควรแก้ข้อมูลหน้าเว็บผ่านหน้า Admin ได้ ไม่ต้องแก้โค้ด

---

# Admin Configuration

## Primary Admin Email

```txt
robotclub64@gmail.com
```

ใช้สำหรับ:

- รับ Email แจ้งเตือน
- อนุมัติคำขอยืม
- จัดการระบบ
- รับแจ้งเตือนของใกล้หมด
- รับแจ้งเตือนของเกินกำหนดคืน

---

## Admin Rules

- เฉพาะ Email admin หลักเท่านั้นที่เข้าหน้า `/admin` ได้
- ระบบต้องตรวจสอบ role และ email ก่อนเข้าถึงระบบหลังบ้าน
- Admin มีสิทธิ์จัดการ stock และคำขอยืมทั้งหมด

---

# User Roles

## User

สมาชิกทั่วไปสามารถ:

- Login
- ดูอุปกรณ์
- ค้นหาอุปกรณ์
- ยืมอุปกรณ์
- ดูสถานะคำขอยืม
- ดูประวัติการยืม

---

## Admin

แอดมินสามารถ:

- จัดการอุปกรณ์
- เพิ่ม/แก้ไข/ลบอุปกรณ์
- จัดการ stock
- อนุมัติการยืม
- ปฏิเสธการยืม
- ยืนยันคืนอุปกรณ์
- จัดการตำแหน่งจัดเก็บ
- ดู Dashboard
- ดูของที่ยังไม่คืน
- ดูสมาชิก
- ดูประวัติการยืมคืน
- แก้ไขข้อมูลหน้า Home
- แก้ไขข้อมูลหน้า About
- แก้ไขประกาศหน้าเว็บ
- แก้ไขข้อมูลติดต่อ

---

# User Visible Pages

## Public Pages

### `/`

# Home Page

หน้าแรกของเว็บ

User เห็น:

- Hero Section
- ข้อความแนะนำชมรม
- ประกาศล่าสุด
- กิจกรรมล่าสุดแบบสั้น
- อุปกรณ์ล่าสุด
- จำนวนอุปกรณ์ในระบบ
- ปุ่ม Login
- ปุ่มดูอุปกรณ์ทั้งหมด

Admin สามารถแก้ผ่านเว็บได้:

- Hero title
- Hero subtitle
- Hero image/banner
- Announcement
- Club short description
- Contact button text

---

### `/about`

# About Page

หน้าข้อมูลชมรม

User เห็น:

- ประวัติชมรม
- เป้าหมายของชมรม
- รายละเอียดเกี่ยวกับชมรม
- ช่องทางติดต่อ
- รูปภาพประกอบ

Admin สามารถแก้ผ่านเว็บได้:

- About title
- About description
- Club history
- Club mission
- Contact email
- Contact social links
- About image

---

### `/equipment`

# Equipment List Page

User เห็น:

- รายการอุปกรณ์ทั้งหมด
- ค้นหาอุปกรณ์
- Filter หมวดหมู่
- จำนวนคงเหลือ
- สถานะอุปกรณ์
- ปุ่มดูรายละเอียด
- ปุ่มเพิ่มลงตะกร้า

ไม่มีระบบ News Page

---

### `/equipment/[id]`

# Equipment Detail Page

User เห็น:

- รูปภาพอุปกรณ์
- ชื่ออุปกรณ์
- หมวดหมู่
- รายละเอียด
- จำนวนทั้งหมด
- จำนวนคงเหลือ
- สถานะ
- ตำแหน่งจัดเก็บ
- ปุ่มเพิ่มลงตะกร้า

ตัวอย่างตำแหน่ง:

```txt
Lab 1 / Cabinet A / Shelf 2 / Box Sensor / Slot A-2-03
```

---

### `/login`

# Login Page

User เห็น:

- ปุ่ม Login ด้วย Google
- ข้อความอธิบายการเข้าสู่ระบบ
- Redirect หลัง login

---

# Logged-in User Pages

### `/dashboard`

# User Dashboard

User เห็น:

- ข้อมูลผู้ใช้
- ของที่กำลังยืม
- สถานะคำขอยืมล่าสุด
- การยืมล่าสุด
- ปุ่มไปหน้าตะกร้า
- ปุ่มดูประวัติการยืม

---

### `/cart`

# Borrow Cart Page

User เห็น:

- รายการอุปกรณ์ที่เลือก
- จำนวนที่ต้องการยืม
- ปุ่มเพิ่ม/ลดจำนวน
- ปุ่มลบรายการ
- ช่องกรอกชื่อผู้ยืม
- ช่องกรอกเบอร์โทรติดต่อ
- ช่องเลือกวันคืน
- ช่องหมายเหตุเพิ่มเติม
- ปุ่มส่งคำขอยืม

เมื่อส่งคำขอยืม:

- บันทึกลง Google Sheet
- สถานะเริ่มต้นเป็น `pending`
- ส่ง Email แจ้ง Admin

---

### `/borrow/history`

# Borrow History Page

User เห็น:

- ประวัติการยืมทั้งหมด
- วันที่ยืม
- วันที่กำหนดคืน
- วันที่คืนจริง
- สถานะ
- รายการอุปกรณ์

---

### `/borrow/[id]`

# Borrow Detail Page

User เห็น:

- ชื่อผู้ยืม
- เบอร์โทร
- รายการอุปกรณ์
- จำนวน
- สถานะ
- วันยืม
- วันกำหนดคืน
- Admin note

---

### `/profile`

# User Profile Page

User เห็น:

- ชื่อผู้ใช้
- Email
- Role
- สถานะบัญชี
- ประวัติการใช้งานแบบสั้น

---

# Admin Pages

### `/admin`

# Admin Dashboard

Admin เห็น:

- จำนวนอุปกรณ์ทั้งหมด
- จำนวนอุปกรณ์ที่ถูกยืม
- ของใกล้หมด
- ของยังไม่คืน
- คำขอยืมล่าสุด
- จำนวนสมาชิก
- สรุปสถานะอุปกรณ์

---

### `/admin/items`

# Manage Equipment Page

Admin ใช้จัดการอุปกรณ์

มี:

- ตารางอุปกรณ์
- ค้นหา
- Filter หมวดหมู่
- เพิ่มอุปกรณ์
- แก้ไขอุปกรณ์
- ลบอุปกรณ์
- ดูตำแหน่งจัดเก็บ
- ดูจำนวนคงเหลือ

---

### `/admin/items/new`

# Add Equipment Page

Form มี:

- ชื่ออุปกรณ์
- รายละเอียด
- หมวดหมู่
- จำนวนทั้งหมด
- จำนวนคงเหลือ
- รูปภาพ
- ห้อง
- ตู้
- ชั้น
- กล่อง
- ช่องเก็บ
- สถานะ

---

### `/admin/items/[id]/edit`

# Edit Equipment Page

Admin สามารถแก้:

- ชื่อ
- รายละเอียด
- หมวดหมู่
- จำนวน
- รูปภาพ
- สถานะ
- ตำแหน่งจัดเก็บ

---

### `/admin/borrow`

# Borrow Management Page

Admin ใช้จัดการคำขอยืม

มี:

- รายการคำขอยืมทั้งหมด
- Filter ตามสถานะ
- ดูคำขอ pending
- อนุมัติ
- ปฏิเสธ
- ดูรายละเอียด

---

### `/admin/borrow/[id]`

# Borrow Request Detail Page

Admin เห็น:

- ผู้ยืม
- Email ผู้ยืม
- เบอร์โทรติดต่อ
- รายการอุปกรณ์
- จำนวน
- วันยืม
- วันกำหนดคืน
- สถานะ
- ช่องใส่ Admin note
- ปุ่ม Approve
- ปุ่ม Reject

---

### `/admin/returns`

# Return Management Page

มี:

- รายการที่ยังไม่คืน
- รายการที่เกินกำหนดคืน
- ปุ่ม Confirm Return

เมื่อคืนแล้ว:

- stock เพิ่มกลับ
- สถานะเปลี่ยนเป็น `returned`

---

### `/admin/users`

# User Management Page

มี:

- รายชื่อสมาชิก
- Email
- Role
- Status
- วันที่สมัคร
- เปลี่ยน role
- ระงับบัญชี

---

### `/admin/locations`

# Storage Location Management Page

มี:

- ห้อง
- ตู้
- ชั้น
- กล่อง
- ช่องเก็บ
- ดูของในแต่ละตำแหน่ง
- ย้ายตำแหน่งเก็บของ

---

### `/admin/content`

# Site Content Management Page

Admin ใช้แก้ข้อมูลหน้าเว็บโดยไม่ต้องแก้โค้ด

แก้ได้:

- Home hero title
- Home hero subtitle
- Home banner image
- Home announcement
- About title
- About description
- Club history
- Club mission
- Contact email
- Contact social links

ข้อมูลเก็บใน Google Sheet ชื่อ `site_content`

---

### `/admin/history`

# System History Page

มี:

- ใครทำอะไร
- เวลา
- Action logs
- การแก้ไข stock
- การอนุมัติ/ปฏิเสธ
- การคืนอุปกรณ์

---

# Main Features

## Authentication System

- Google Login
- Session Management
- Protected Routes
- Role-based Access
- Admin email check

---

## Equipment System

- เพิ่มอุปกรณ์
- แก้ไขอุปกรณ์
- ลบอุปกรณ์
- เพิ่มรูปภาพ
- ค้นหาอุปกรณ์
- แยกหมวดหมู่
- ดูจำนวนคงเหลือ
- ดูตำแหน่งจัดเก็บ

## Equipment Categories Example

- Board
- Sensor
- Tool
- Audio
- Cable
- Power Supply
- Robot
- Display

---

## Borrow System

- เพิ่มของลงตะกร้า
- ยืมหลายรายการพร้อมกัน
- ส่งคำขอยืม
- กรอกชื่อผู้ยืม
- กรอกเบอร์โทรติดต่อ
- เลือกวันกำหนดคืน
- เพิ่มหมายเหตุ
- อนุมัติ / ปฏิเสธ
- คืนอุปกรณ์
- ดูสถานะการยืม
- ดูประวัติการยืม

## Borrow Status

```txt
pending
approved
rejected
returned
overdue
```

---

## Storage Location System

- ระบุห้อง
- ระบุตู้
- ระบุชั้น
- ระบุกล่อง
- ระบุช่องเก็บ
- ค้นหาตำแหน่งจัดเก็บ
- ย้ายตำแหน่งเก็บ
- ดูของในแต่ละตู้
- ดูของในแต่ละชั้น

---

## Email Notification System

แจ้งเตือนผ่าน Email ไปยัง Admin เมื่อ:

- มีคำขอยืมใหม่
- มีการคืนอุปกรณ์
- ของใกล้หมด
- เกินกำหนดคืน

Admin Email:

```txt
robotclub64@gmail.com
```

Email ต้องมี:

- ชื่อผู้ยืม
- เบอร์โทร
- Email
- รายการอุปกรณ์
- วันกำหนดคืน
- หมายเหตุ

---

# Google Sheet Database Structure

## `users`

| field | type |
|---|---|
| id | string |
| name | string |
| email | string |
| role | string |
| status | string |
| createdAt | string |

---

## `items`

| field | type |
|---|---|
| id | string |
| name | string |
| description | string |
| category | string |
| quantityTotal | number |
| quantityAvailable | number |
| room | string |
| cabinet | string |
| shelf | string |
| box | string |
| slot | string |
| imageUrl | string |
| status | string |
| createdAt | string |
| updatedAt | string |

---

## `borrow_requests`

| field | type |
|---|---|
| id | string |
| userId | string |
| userName | string |
| userEmail | string |
| borrowerName | string |
| borrowerPhone | string |
| items | json |
| borrowDate | string |
| dueDate | string |
| returnDate | string |
| note | string |
| status | string |
| adminNote | string |
| createdAt | string |
| updatedAt | string |

---

## `borrow_history`

| field | type |
|---|---|
| id | string |
| requestId | string |
| action | string |
| by | string |
| note | string |
| createdAt | string |

---

## `site_content`

| field | type |
|---|---|
| key | string |
| value | string |
| type | string |
| updatedAt | string |

Example:

| key | value |
|---|---|
| hero_title | Robot Club Inventory System |
| hero_subtitle | ระบบยืมคืนอุปกรณ์ชมรมหุ่นยนต์ |
| home_announcement | เปิดให้ยืมอุปกรณ์แล้ว |
| about_description | ชมรมหุ่นยนต์... |
| contact_email | robotclub64@gmail.com |

---

# Recommended Folder Structure

```txt
src/
│
├── app/
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── items/
│   │   ├── borrow/
│   │   ├── returns/
│   │   ├── users/
│   │   ├── locations/
│   │   ├── content/
│   │   └── history/
│   │
│   ├── dashboard/
│   ├── equipment/
│   ├── borrow/
│   ├── cart/
│   ├── profile/
│   ├── login/
│   ├── api/
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── equipment/
│   ├── borrow/
│   ├── dashboard/
│   ├── admin/
│   └── content/
│
├── lib/
│   ├── googleSheets.ts
│   ├── auth.ts
│   ├── email.ts
│   └── utils.ts
│
├── hooks/
├── types/
├── constants/
└── styles/
```

---

# API Routes Example

```txt
/api/items
/api/items/[id]
/api/borrow
/api/borrow/[id]
/api/return
/api/users
/api/auth
/api/email
/api/content
/api/locations
```

---

# UI Style Guide

## Design Direction

เว็บไซต์ควรมีสไตล์แบบ:

- Clean
- Modern
- Semi-formal
- University Dashboard Style
- Inventory Management Style
- Naresuan University Inspired Theme

UI ต้องให้ความรู้สึก:

- เรียบง่าย
- เป็นระเบียบ
- น่าเชื่อถือ
- ใช้งานง่าย
- ดูเป็นระบบมหาวิทยาลัย
- Mobile Friendly

---

# Theme Identity

ใช้ธีมสีตามเอกลักษณ์มหาวิทยาลัยนเรศวร

ใช้สีหลัก:

- Orange
- Gray
- White

Mood:

- Professional
- Organized
- Reliable
- Modern University System

---

# Theme Colors

## Primary Orange

```txt
Primary: #F58220
Hover: #E56F0F
Light Background: #FFF7ED
```

## Gray Palette

```txt
Primary Gray: #A7A9AC
Dark Gray: #6B7280
Light Gray: #F3F4F6
Border Gray: #E5E7EB
```

## Base Colors

```txt
Page Background: #F9FAFB
Card Background: #FFFFFF
Primary Text: #111827
Secondary Text: #6B7280
Muted Text: #9CA3AF
```

---

# Color Usage Rules

- ใช้สีขาวเป็นพื้นหลัก
- ใช้สีเทาอ่อนเป็นพื้นหลัง
- ใช้สีส้มเป็น accent color
- หลีกเลี่ยงสีสดหลายสี
- ใช้สีส้มเฉพาะส่วนสำคัญ
- Dashboard ต้องโปร่ง อ่านง่าย

---

# Component Style

## Cards

```txt
Background: White
Border Radius: 16px
Border: Light Gray
Shadow: Soft/Subtle
Padding: 20-24px
```

## Buttons

### Primary Button

```txt
Background: #F58220
Text: White
Hover: #E56F0F
Border Radius: 12px
```

### Secondary Button

```txt
Background: White
Border: Light Gray
Text: Dark Gray
Hover Background: #F3F4F6
```

---

# Typography

## Font Family

```txt
Inter
Noto Sans Thai
sans-serif
```

---

# Layout Rules

- ใช้ spacing เยอะ
- ใช้ card layout
- ใช้ grid ที่เป็นระเบียบ
- รองรับ mobile-first
- ใช้ sidebar แบบ minimal
- ใช้ table ที่อ่านง่าย

---

# Status Colors

```txt
Available: Green
Pending: Orange
Approved: Blue
Rejected: Red
Returned: Gray
Overdue: Red
Low Stock: Amber
```

---

# Do

- ใช้พื้นขาว/เทาอ่อน
- ใช้สีส้มเป็น accent
- ใช้ icon minimal
- ใช้ rounded corner
- ใช้ subtle shadow
- ใช้ spacing สม่ำเสมอ

---

# Don't

- ห้ามใช้ neon colors
- ห้ามใช้ gradient แรง
- ห้ามใช้ animation เยอะ
- ห้ามใช้ UI แนวเกม
- ห้ามใช้สีเกิน 3–4 สีหลัก
- ห้ามใช้ shadow หนัก

---

# Recommended Packages

## Core

- next
- react
- typescript

## Styling

- tailwindcss
- clsx

## Authentication

- next-auth

## Forms & Validation

- react-hook-form
- zod

## Google Sheets

- googleapis

## Email

- nodemailer

## UI

- lucide-react
- sonner
- shadcn/ui

---

# Future Improvements

- QR Code System
- Barcode Scanner
- Analytics Dashboard
- Discord Notification
- LINE Notification
- Export PDF
- PostgreSQL Migration

---

# Example UI Description

The website should look like a modern university inventory management dashboard inspired by Naresuan University branding. Use a clean white and light gray foundation with Naresuan orange as the primary accent color. The interface should feel organized, reliable, semi-formal, modern, and mobile-friendly with rounded cards, subtle shadows, clean tables, and professional typography.

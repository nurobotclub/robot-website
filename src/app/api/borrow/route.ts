import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { appendBorrowRequest, getSheetBorrowRequestsByUser, updateSheetBorrowRequestStatus, BorrowRequest } from "@/lib/googleSheets";
import { sendNewBorrowNotification, sendReturnRequestNotification } from "@/lib/email";

/**
 * Handle Borrow Request Creation (Authenticated Members Only)
 */
export async function POST(request: Request) {
  // 1. Verify User Credentials
  const token = await getToken({
    req: request as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || !token.email) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { borrowerName, borrowerPhone, dueDate, note, items } = data;

    // 2. Validate Required Fields
    if (!borrowerName || !borrowerPhone || !dueDate || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน และเลือกของอย่างน้อย 1 ชิ้น" },
        { status: 400 }
      );
    }

    // 3. Format Date of Borrow (Today's local date)
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const borrowDate = `${yyyy}-${mm}-${dd}`;

    // 4. Construct Request Record with RB-XXXX style Request ID
    const requestId = `REQ-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Format selected items list for easy storage
    const formattedItems = items.map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      location: item.location,
      quantity: Number(item.quantity || 1),
    }));

    const newRequest: BorrowRequest = {
      id: requestId,
      userId: String(token.sub || token.email),
      userName: String(token.name || "Unknown"),
      userEmail: String(token.email),
      borrowerName: String(borrowerName).trim(),
      borrowerPhone: String(borrowerPhone).trim(),
      items: JSON.stringify(formattedItems),
      borrowDate,
      dueDate: String(dueDate).trim(),
      returnDate: "",
      note: String(note || "").trim(),
      status: "pending",
      adminNote: "",
      createdAt: "", // Managed inside sheets append
      updatedAt: "", // Managed inside sheets append
    };

    // 5. Append to Google Sheets
    const success = await appendBorrowRequest(newRequest);
    if (!success) {
      return NextResponse.json({ error: "ล้มเหลวในการบันทึกข้อมูลยื่นยืมลงฐานข้อมูล Google Sheets" }, { status: 500 });
    }

    // Trigger Email Notification in background (non-blocking)
    sendNewBorrowNotification(newRequest).catch((err) =>
      console.error("Failed to send new borrow email in background:", err)
    );

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/borrow:", error);
    return NextResponse.json({ error: "รูปแบบ JSON ผิดพลาดหรือไม่ถูกต้อง" }, { status: 400 });
  }
}

/**
 * Handle Fetching Requests (Authenticated Only)
 */
export async function GET(request: Request) {
  // Authenticated safety check
  const token = await getToken({
    req: request as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || !token.email) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const requests = await getSheetBorrowRequestsByUser(token.email);
    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error in GET /api/borrow:", error);
    return NextResponse.json({ error: "Failed to fetch borrow history" }, { status: 500 });
  }
}

/**
 * PATCH Handler: Member requests a return on their approved borrow request.
 * Transitions status from 'approved' → 'return_pending'.
 */
export async function PATCH(request: Request) {
  const token = await getToken({
    req: request as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || !token.email) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, action } = data;

    if (!id) {
      return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
    }

    // Verify the request belongs to this user
    const userRequests = await getSheetBorrowRequestsByUser(token.email);
    const targetRequest = userRequests.find((r) => r.id === id);

    if (!targetRequest) {
      return NextResponse.json({ error: "ไม่พบใบยืมที่ระบุในบัญชีของคุณ" }, { status: 404 });
    }

    const currentStatus = targetRequest.status.toLowerCase();

    // ── 1. Handle Cancellation Action ──
    if (action === "cancel") {
      if (currentStatus !== "pending") {
        return NextResponse.json(
          { error: "สามารถยกเลิกได้เฉพาะคำขอยืมที่ยังรอดำเนินการอนุมัติ (pending) เท่านั้น" },
          { status: 400 }
        );
      }

      // Transition to 'rejected' status with a custom user-action note
      const success = await updateSheetBorrowRequestStatus(id, "rejected", "ยกเลิกคำขอยืมโดยผู้ใช้งาน");

      if (!success) {
        return NextResponse.json({ error: "ล้มเหลวในการยกเลิกคำขอยืมใน Google Sheets" }, { status: 500 });
      }

      return NextResponse.json({
        message: "ยกเลิกคำขอยืมสำเร็จ",
        id,
        status: "rejected",
      });
    }

    // ── 2. Handle Return Request (Default Action) ──
    if (currentStatus !== "approved" && currentStatus !== "overdue") {
      return NextResponse.json(
        { error: "สามารถยื่นคำขอคืนอุปกรณ์ได้เฉพาะใบยืมที่ได้รับการอนุมัติ (approved) หรือเกินกำหนดส่ง (overdue) เท่านั้น" },
        { status: 400 }
      );
    }

    // Update status to return_pending
    const success = await updateSheetBorrowRequestStatus(id, "return_pending");

    if (!success) {
      return NextResponse.json({ error: "ล้มเหลวในการอัปเดตสถานะขอคืนใน Google Sheets" }, { status: 500 });
    }

    // Trigger Email Notification in background
    const updatedRequest = { ...targetRequest, status: "return_pending" };
    sendReturnRequestNotification(updatedRequest).catch((err) =>
      console.error("Failed to send return request email in background:", err)
    );

    return NextResponse.json({
      message: "ส่งคำขอคืนอุปกรณ์สำเร็จ รอผู้ดูแลระบบยืนยันรับคืน",
      id,
      status: "return_pending",
    });
  } catch (error) {
    console.error("Error in PATCH /api/borrow:", error);
    return NextResponse.json({ error: "Malformed request payload" }, { status: 400 });
  }
}


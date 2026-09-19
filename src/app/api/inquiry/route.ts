import { checkRateLimit } from "@/lib/security/rate-limit";
import { inquirySchema } from "@/lib/validation/inquiry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting (5 requests per 10 minutes per IP)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(`inquiry:${ip}`, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many inquiries submitted from this connection. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Request Payload
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const parseResult = inquirySchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || "Validation failed";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 422 }
      );
    }

    const data = parseResult.data;

    // 3. Honeypot check (Silently discard spam bots)
    if (data.websiteHoneypot && data.websiteHoneypot.length > 0) {
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 4. Secure Transactional Notification Dispatch
    // (Integrates with environment SMTP or logging without exposing secrets)
    const recipient = process.env.INQUIRY_RECIPIENT_EMAIL || "studio@aura-atelier.com";

    console.log(`[New Lead Inquiry] To: ${recipient}`);
    console.log(`Client: ${data.name} <${data.email}> | Phone: ${data.phone}`);
    console.log(`Service: ${data.service} | Date: ${data.eventDate || "TBD"} | Location: ${data.location || "TBD"}`);
    console.log(`Budget: ${data.budgetRange || "Unspecified"}`);
    console.log(`Message: ${data.message}`);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you — your inquiry has been securely received.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[API Inquiry] Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}

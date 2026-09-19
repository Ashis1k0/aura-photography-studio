import { syncGoogleDriveContent } from "@/lib/google-drive/sync";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Optional secret key authorization if configured in environment
    const authHeader = req.headers.get("x-sync-secret");
    const configuredSecret = process.env.DRIVE_SYNC_SECRET;

    if (configuredSecret && authHeader !== configuredSecret) {
      return NextResponse.json(
        { success: false, error: "Unauthorized sync request" },
        { status: 401 }
      );
    }

    const result = await syncGoogleDriveContent();

    return NextResponse.json({
      success: true,
      message: "Google Drive synchronization completed",
      data: result,
    });
  } catch (err) {
    console.error("[API Drive Sync] Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to synchronize Google Drive content" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Allow health/status check of current sync status
  return NextResponse.json({
    status: "ok",
    service: "google-drive-sync",
    endpoint: "POST /api/drive/sync",
  });
}

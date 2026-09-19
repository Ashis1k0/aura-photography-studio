# Production Deployment & Google Cloud Setup Guide

This architecture is optimized for zero-cost / low-cost deployment on modern edge and serverless platforms (such as **Vercel Hobby**, **Netlify Free Tier**, or **Railway**).

---

## 1. Google Cloud Platform (GCP) Configuration

To connect live Google Drive folders:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project: `Photographer-Portfolio`.
3. Navigate to **APIs & Services** &rarr; **Library** and enable the **Google Drive API**.
4. Go to **APIs & Services** &rarr; **Credentials** &rarr; **Create Credentials** &rarr; **Service Account**.
5. Give it a name (e.g. `drive-portfolio-reader`) and grant no special project roles (it only needs folder access).
6. Click the newly created Service Account &rarr; **Keys** &rarr; **Add Key** &rarr; **Create new key** &rarr; **JSON**.
7. Copy the `client_email` and `private_key` from the downloaded JSON.
8. In your Google Drive, share your root or category folders with the Service Account email address (`client_email`) with **Viewer** permissions.
9. Copy each folder's ID from the URL (the string after `/folders/`) into your environment variables.

---

## 2. Environment Variables Summary

Set these in your deployment platform's Environment Variables dashboard:

```env
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_NAME="Aura Atelier | Cinematic Photography"
NEXT_PUBLIC_PHOTOGRAPHER_NAME="Aura & Light"

GOOGLE_DRIVE_ROOT_FOLDER_ID="your_root_folder_id"
GOOGLE_DRIVE_WEDDING_FOLDER_ID="your_wedding_folder_id"
GOOGLE_DRIVE_PREWEDDING_FOLDER_ID="your_prewedding_folder_id"
GOOGLE_DRIVE_BIRTHDAY_FOLDER_ID="your_birthday_folder_id"
GOOGLE_DRIVE_PORTRAIT_FOLDER_ID="your_portrait_folder_id"
GOOGLE_DRIVE_FASHION_FOLDER_ID="your_fashion_folder_id"
GOOGLE_DRIVE_EVENTS_FOLDER_ID="your_events_folder_id"
GOOGLE_DRIVE_COMMERCIAL_FOLDER_ID="your_commercial_folder_id"

GOOGLE_SERVICE_ACCOUNT_EMAIL="service-account@project.iam.gserviceaccount.com"
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

GOOGLE_DRIVE_CACHE_TTL="3600"
INQUIRY_RECIPIENT_EMAIL="inquiries@yourdomain.com"
```

*Note: If no Google credentials are set, the website automatically runs in zero-error Curated Seed Fallback mode.*

---

## 3. Deployment Commands

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install --legacy-peer-deps`
- **Node.js Version**: 20.x, 22.x, or 24.x.

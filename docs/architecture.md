# Technical Architecture

## 1. System Overview

The Photography Portfolio & Client Acquisition Platform is architected as a modern Next.js App Router application optimized for editorial storytelling, subtle 3D spatial depth, and client-controlled photography asset synchronization via Google Drive.

```
+-------------------------------------------------------------------------+
|                              Browser (Client)                           |
|  - Server Component Shells + Targeted Client Interactivity              |
|  - Accessible Lightbox & Keyboard Navigation                            |
|  - Three.js / React Three Fiber Floating Depth (Progressive Fallback)   |
|  - Accessible Inquiry Funnel (Zod + React Hook Form)                    |
+-------------------------------------------------------------------------+
                                    |
                            HTTP / Server Actions
                                    v
+-------------------------------------------------------------------------+
|                        Next.js Server Runtime (Node.js)                 |
|  - Content Security Policy & Security Headers (Strict HSTS, X-Frame)   |
|  - Rate Limiting & Input Sanitization                                   |
|  - Server-Side Portfolio Provider Layer                                |
+-------------------------------------------------------------------------+
                                    |
          +-------------------------+-------------------------+
          |                                                   |
          v                                                   v
+----------------------------------+       +----------------------------------+
|      Google Drive Integration    |       |      Curated Fallback Engine     |
|  - Service Account JWT / API Key |       |  - Editorial Seed Data Provider  |
|  - Folder Tree & MIME Filter     |       |  - Zero-credential local dev     |
|  - In-Memory / Disk TTL Cache    |       |  - Instant offline demo mode     |
+----------------------------------+       +----------------------------------+
```

## 2. Core Architectural Pillars

### A. Provider-Independent Normalized Content Model
The UI components never consume Google Drive responses directly. All photography entities are normalized into:
- `PortfolioImage`: Normalized image entity with dimensions, category, project link, and CDN/Drive URLs.
- `PortfolioProject`: Normalized project entity with concept story, metadata, and image arrays.

### B. Two-Tier Content Resolution
1. **Google Drive Mode**: Activated when `GOOGLE_SERVICE_ACCOUNT_EMAIL` or `GOOGLE_API_KEY` are configured. Fetches folder hierarchies and files, filters for approved image MIME types (`image/jpeg`, `image/png`, `image/webp`, `image/avif`), ignores trashed files, and caches normalized responses.
2. **Offline / Fallback Mode**: When Google Drive credentials are absent or during network timeouts, gracefully serves a curated editorial seed dataset featuring 7 categories with real high-resolution photography.

### C. 3D WebGL Progressive Enhancement
- Dynamically imported with `next/dynamic` (`ssr: false`).
- Detects WebGL availability and `prefers-reduced-motion`.
- If WebGL is unavailable or reduced motion is requested, renders an elegant static editorial hero composition.
- Automatic resource disposal (geometries, textures, materials) on unmount prevents memory leaks.

### D. Security Architecture
- Server-side credentials only (`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` is never bundled client-side).
- Inquiry submission protected with rate limiting, honeypot fields, and strict Zod validation.
- Production security headers including strict Content Security Policy, Permissions Policy, and Referrer Policy.

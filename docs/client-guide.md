# Photographer Client Manual: Managing Website Photos via Google Drive

Welcome to your visual brand website. 
You can update, add, or organize photographs directly from Google Drive without touching any code, Git, or server deployments.

---

## 1. Quick Step-by-Step Guide

1. Open your **Google Drive** folder: `Photography Portfolio`.
2. Open the category folder you want to update:
   - **Wedding**
   - **Pre-Wedding**
   - **Birthday**
   - **Portrait**
   - **Fashion**
   - **Events**
   - **Commercial**
3. Drag and drop your new images into the category folder (or delete outdated images).
4. That's it! The website automatically synchronizes the changes.

---

## 2. Creating Project Stories (Optional Nested Subfolders)

To showcase a multi-photograph wedding or campaign as a dedicated project story, simply create a subfolder inside the category folder:

Example:
```
Photography Portfolio/
├── Wedding/
│   ├── Aarav & Priya/
│   │   ├── 01-vows.jpg
│   │   ├── 02-mandap.jpg
│   │   └── 03-palace.jpg
│   └── Kabir & Meera/
│       ├── 01-lake-como.jpg
│       └── 02-boat.jpg
└── Pre-Wedding/
    └── Thar Desert Session/
        ├── 01-dunes.jpg
        └── 02-sunset.jpg
```

The website will automatically create a dedicated editorial project page (`/portfolio/project/aarav-and-priya`) with the folder title as the project heading!

---

## 3. Best Practices for Best Visual Quality

- **Supported Formats**: JPEG, JPG, PNG, WebP, AVIF.
- **Recommended Resolution**: 2000px to 3000px on the longest edge (3MB - 6MB each).
- **Naming Tip**: Name your files meaningfully (e.g. `udaipur-sunset-vows.jpg` rather than `IMG_9381.jpg`) for optimal Google Image SEO.
- **Moving Photos**: If you move a photo from `Birthday/` to `Wedding/`, the website automatically updates its category.
- **Trashing Photos**: When you move a photo to the Google Drive Trash, it will automatically disappear from the public portfolio upon the next sync.

---

## 4. Manual Instant Sync (Optional)

If you need your newly uploaded photos to appear on the live website immediately without waiting for the scheduled cache revalidation, make a simple request to your sync webhook or refresh via the API endpoint:
`POST https://yourdomain.com/api/drive/sync` (with your secret key).

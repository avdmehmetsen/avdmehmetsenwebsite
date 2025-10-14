# Environment Variables Template

⚠️ **IMPORTANT:** Create a `.env.local` file in the project root and copy this content.

```bash
# ===========================================
# AV. DURDU MEHMET ŞEN - HUKUK BÜROSU
# Environment Variables
# ===========================================

# ===========================================
# WhatsApp Configuration
# ===========================================
NEXT_PUBLIC_WHATSAPP_PHONE=905077368251
NEXT_PUBLIC_WHATSAPP_PREFILL=Merhaba, uygun olduğunuz bir zamanda görüşme talep ediyorum.

# ===========================================
# Firebase Configuration
# ===========================================
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# ===========================================
# SMTP Email Configuration (Contact Form)
# ===========================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dmehmetsen@gmail.com
SMTP_PASS=your-gmail-app-password-here
SMTP_FROM=dmehmetsen@gmail.com
SMTP_TO=dmehmetsen@gmail.com

# ===========================================
# Vercel Blob Storage (Image Uploads)
# ===========================================
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
```

## Setup Instructions

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Go to **Project Settings > General**
4. Under **"Your apps"** section, create a new **Web App**
5. Copy the `firebaseConfig` values to your `.env.local` file
6. Enable **Firestore Database** in Firebase Console
7. Enable **Authentication > Email/Password**
8. Deploy Firestore security rules: `firebase deploy --only firestore:rules`

### 2. SMTP Configuration (Gmail)

1. Go to your **Google Account > Security**
2. Enable **2-Step Verification**
3. Create an **App Password**:
   - Select app: Mail
   - Select device: Other (Custom name)
   - Copy the generated password
4. Use this password as `SMTP_PASS` in `.env.local`

### 3. Vercel Blob Configuration

1. Go to Vercel Dashboard > Your Project
2. Go to **Storage** tab
3. Create a new **Blob Store** (if not already created)
4. Copy the `BLOB_READ_WRITE_TOKEN` from the Blob Store settings
5. Add it to your `.env.local` file

### 4. Vercel Deployment

When deploying to Vercel:

1. Go to **Project Settings > Environment Variables**
2. Add **all** variables from `.env.local` (including `BLOB_READ_WRITE_TOKEN`)
3. Set for **Production, Preview, and Development** environments
4. Redeploy after adding variables

**Note:** If you created a Blob Store in Vercel, the `BLOB_READ_WRITE_TOKEN` will automatically be added to your project's environment variables. You only need to add it manually to your `.env.local` for local development.

## Security Notes

- ❌ **NEVER** commit `.env.local` to git
- ✅ `.env.local` is in `.gitignore` by default
- ✅ Use different, strong passwords in production
- ✅ Keep API keys private

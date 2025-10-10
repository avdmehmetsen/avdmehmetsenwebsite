# Environment Variables Template

Copy this content to your `.env.local` file in the project root.

```env
# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_PHONE=905077368255
NEXT_PUBLIC_WHATSAPP_PREFILL=Merhaba, uygun olduğunuz bir zamanda görüşme talep ediyorum.

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## How to Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Go to Project Settings > General
4. Under "Your apps" section, create a new Web App
5. Copy the firebaseConfig values to your `.env.local` file
6. Enable Firestore Database in Firebase Console
7. Set up Firestore security rules as needed

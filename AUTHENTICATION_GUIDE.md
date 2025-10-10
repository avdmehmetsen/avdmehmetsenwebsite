# Firebase Authentication Kurulum Rehberi

Bu proje Firebase Authentication kullanarak admin paneline erişimi kontrol etmektedir.

## 🔐 Firebase Authentication Kurulumu

### 1. Firebase Console'da Authentication'ı Aktifleştirme

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. Projenizi seçin
3. Sol menüden **"Build" → "Authentication"** seçin
4. **"Get started"** butonuna tıklayın
5. **"Sign-in method"** sekmesine gidin
6. **"Email/Password"** seçeneğini seçin ve **"Enable"** yapın
7. **"Save"** butonuna tıklayın

### 2. İlk Admin Kullanıcısını Oluşturma

#### Yöntem 1: Firebase Console'dan (ÖNERİLEN)

1. Firebase Console'da **"Authentication" → "Users"** sekmesine gidin
2. **"Add user"** butonuna tıklayın
3. E-posta ve şifre girin:
   - Email: `admin@avdurdumehmetsen.com` (veya istediğiniz email)
   - Password: Güçlü bir şifre belirleyin (min 6 karakter)
4. **"Add user"** butonuna tıklayın

#### Yöntem 2: Geçici Kayıt Sayfası (Geliştirme için)

Geliştirme aşamasında geçici bir kayıt sayfası oluşturabilirsiniz:

```tsx
// src/app/admin/register/page.tsx (GEÇİCİ - PRODUCTION'DA SİLİN!)
"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Kullanıcı oluşturuldu! Şimdi bu sayfayı silebilirsiniz.");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="space-y-4 p-8 bg-white rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold">Admin Kaydı (GEÇİCİ)</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre (min 6 karakter)"
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
```

**ÖNEMLİ:** İlk kullanıcıyı oluşturduktan sonra bu sayfayı silin!

### 3. Firestore Security Rules'ı Güncelleme

1. Firebase Console'da **"Firestore Database" → "Rules"** sekmesine gidin
2. Proje kök dizinindeki `firestore.rules` dosyasının içeriğini kopyalayın
3. Firebase Console'a yapıştırın
4. **"Publish"** butonuna tıklayın

## 🎯 Nasıl Çalışır?

### Authentication Akışı

1. **Giriş Yapmadan:**

   - `/admin/*` sayfalarına erişim yok
   - Otomatik olarak `/admin/login` sayfasına yönlendirilir

2. **Giriş Yaptıktan Sonra:**

   - Admin paneline erişim sağlanır
   - Navbar'da "Admin" ve "Çıkış" butonları görünür
   - Firestore'a yazma yetkisi kazanılır

3. **Çıkış Yaptıktan Sonra:**
   - Admin paneli erişimi kapatılır
   - Ana sayfaya yönlendirilir

### Kullanılan Teknolojiler

- **Firebase Authentication:** Kullanıcı girişi
- **Context API:** Global user state yönetimi
- **AdminGuard Component:** Route protection
- **Firestore Security Rules:** Database güvenliği

## 📁 Dosya Yapısı

```
src/
├── contexts/
│   └── AuthContext.tsx          # Auth state management
├── components/
│   ├── AdminGuard.tsx          # Route protection component
│   ├── ClientProvider.tsx      # Client-side provider wrapper
│   └── Navbar.tsx              # Admin/Logout buttons
├── app/
│   └── admin/
│       ├── login/
│       │   └── page.tsx        # Login sayfası
│       ├── page.tsx            # Admin ana sayfa (protected)
│       ├── articles/           # Makale yönetimi (protected)
│       └── lawyer/             # Avukat bilgileri (protected)
└── lib/
    └── firebase.ts             # Firebase config
```

## 🔒 Güvenlik Seviyeleri

### Şu Anki Durum (Level 1)

- ✅ Email/Password authentication
- ✅ Route protection (client-side)
- ✅ Firestore rules (server-side)
- ⚠️ Tüm authenticated userlar admin

### Gelecek İyileştirmeler (Level 2)

#### Custom Claims ile Admin Kontrolü

Firebase Admin SDK kullanarak custom claims ekleyebilirsiniz:

```javascript
// Firebase Functions ile
const admin = require("firebase-admin");

async function setAdminClaim(uid) {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
}
```

Security rules'ı güncelleyin:

```javascript
function isAdmin() {
  return request.auth != null && request.auth.token.admin == true;
}
```

#### Email Bazlı Kontrol (Level 2.5)

Sadece belirli email'lere izin verin:

```javascript
function isAdmin() {
  return (
    request.auth != null &&
    request.auth.token.email == "admin@avdurdumehmetsen.com"
  );
}
```

#### Multi-Factor Authentication (Level 3)

Ekstra güvenlik katmanı:

1. Firebase Console'da MFA'yı aktifleştirin
2. Login sayfasında MFA desteği ekleyin

## 🚨 Önemli Güvenlik Notları

1. **Environment Variables:**

   - `.env.local` dosyasını asla commit etmeyin
   - `.gitignore` dosyasında olduğundan emin olun

2. **Firebase API Key:**

   - Public olması normal (Firebase tarafından tasarlanmış)
   - Güvenlik Firestore Rules ile sağlanır

3. **Şifre Güvenliği:**

   - Minimum 8 karakter kullanın
   - Büyük/küçük harf, rakam ve özel karakter ekleyin
   - Şifre yöneticisi kullanın

4. **Production Checklist:**
   - [ ] Geçici kayıt sayfası silindi
   - [ ] Firestore rules yayınlandı
   - [ ] Test kullanıcısı silindi
   - [ ] Production email kullanıldı
   - [ ] Güçlü şifre belirlendi

## 📖 Kullanım

### Giriş Yapma

1. Tarayıcıda `/admin/login` adresine gidin
2. Email ve şifrenizi girin
3. "Giriş Yap" butonuna tıklayın
4. Başarılı giriş sonrası `/admin` sayfasına yönlendirileceksiniz

### Çıkış Yapma

- Navbar'daki "Çıkış" butonuna tıklayın
- Ana sayfaya yönlendirileceksiniz

### Şifre Sıfırlama (Gelecekte)

Password reset fonksiyonu eklemek için:

```tsx
import { sendPasswordResetEmail } from "firebase/auth";

async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
  alert("Şifre sıfırlama linki email adresinize gönderildi.");
}
```

## 🔧 Troubleshooting

### "auth/network-request-failed"

- İnternet bağlantınızı kontrol edin
- Firebase config'in doğru olduğundan emin olun

### "auth/invalid-credential"

- Email veya şifre yanlış
- Kullanıcı Firebase'de kayıtlı mı kontrol edin

### "auth/too-many-requests"

- Çok fazla başarısız deneme
- 15-30 dakika bekleyin veya şifreyi sıfırlayın

### Admin paneline erişilemiyor

- Browser console'da hata var mı kontrol edin
- Giriş yapıldığından emin olun
- Cache'i temizleyin

## 📚 Daha Fazla Bilgi

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Next.js + Firebase](https://firebase.google.com/docs/web/setup)

# Firebase Setup Guide

Bu proje Firebase Firestore kullanarak makale ve avukat bilgilerini yönetmektedir.

## 🚀 Firebase Kurulumu

### 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" butonuna tıklayın
3. Proje adını girin (örn: avmehmetdurdusen-website)
4. Google Analytics'i istediğiniz gibi yapılandırın
5. "Create project" butonuna tıklayın

### 2. Web App Oluşturma

1. Firebase Console'da projenize gidin
2. Proje ayarlarından "Add app" → "Web" seçin
3. App nickname girin (örn: avmehmetdurdusen-web)
4. Firebase Hosting'i şimdilik işaretlemeyin
5. "Register app" butonuna tıklayın
6. Firebase SDK yapılandırma bilgilerini kopyalayın

### 3. Firestore Database Oluşturma

1. Firebase Console'da "Build" → "Firestore Database" seçin
2. "Create database" butonuna tıklayın
3. Production mode veya Test mode seçin (başlangıç için Test mode önerilir)
4. Location seçin (Europe (west) önerilir)
5. "Enable" butonuna tıklayın

### 4. Environment Variables Ayarlama

Proje kök dizininde `.env.local` dosyası oluşturun:

\`\`\`env

# WhatsApp Configuration

NEXT_PUBLIC_WHATSAPP_PHONE=905077368255
NEXT_PUBLIC_WHATSAPP_PREFILL=Merhaba, uygun olduğunuz bir zamanda görüşme talep ediyorum.

# Firebase Configuration (Firebase Console'dan alın)

NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
\`\`\`

## 📊 Firestore Collections Yapısı

### `lawyer-info` Collection

Tek bir document içerir (ID: "main"):

\`\`\`typescript
{
name: string; // Örn: "Av. Mehmet Durdu Şen"
bio: string; // HTML formatında avukat hakkında bilgi
updatedAt: Timestamp; // Son güncelleme tarihi
}
\`\`\`

### `articles` Collection

Her makale için bir document:

\`\`\`typescript
{
slug: string; // URL-friendly başlık (otomatik oluşturulur)
title: string; // Makale başlığı
category: string; // Kategori (Örn: "Ceza Hukuku")
excerpt: string; // Makale özeti
content: string; // HTML formatında makale içeriği
author: string; // Yazar adı
date: string; // Tarih (Turkish format)
tags: string[]; // Etiketler dizisi
imageUrl: string | null; // Kapak görseli URL (opsiyonel)
published: boolean; // Yayın durumu
createdAt: Timestamp; // Oluşturulma tarihi
updatedAt: Timestamp; // Son güncelleme tarihi
}
\`\`\`

## 🔒 Firestore Security Rules

Test modunda başlarsanız, production için aşağıdaki kuralları kullanın:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
// Lawyer info - herkes okuyabilir
match /lawyer-info/{document} {
allow read: if true;
allow write: if false; // Admin panelinden güncellenir
}

    // Articles - herkes yayındakileri okuyabilir
    match /articles/{document} {
      allow read: if resource.data.published == true || request.auth != null;
      allow write: if false; // Admin panelinden güncellenir
    }

}
}
\`\`\`

**Not:** Güvenlik için Firebase Authentication eklenebilir. Şimdilik admin paneli frontend'den erişilebilir durumda.

## 🎨 Admin Paneli Kullanımı

### Admin Panel Sayfaları

- **Ana Panel:** `/admin`
- **Makale Yönetimi:** `/admin/articles`
- **Yeni Makale:** `/admin/articles/new`
- **Makale Düzenle:** `/admin/articles/edit/[id]`
- **Avukat Bilgileri:** `/admin/lawyer`

### Makale Ekleme

1. `/admin/articles` sayfasına gidin
2. "Yeni Makale" butonuna tıklayın
3. Formu doldurun:
   - Başlık (zorunlu)
   - Kategori (zorunlu)
   - Yazar (zorunlu)
   - Özet (zorunlu)
   - İçerik (zorunlu, HTML destekler)
   - Kapak görseli URL (opsiyonel)
   - Etiketler (opsiyonel)
   - "Hemen yayınla" checkbox'ı (opsiyonel)
4. "Makaleyi Kaydet" butonuna tıklayın

### Avukat Bilgilerini Güncelleme

1. `/admin/lawyer` sayfasına gidin
2. İsim ve hakkında alanlarını düzenleyin
3. HTML etiketleri kullanabilirsiniz (örn: `<p>`, `<br>`, `<strong>`)
4. Önizleme bölümünden görünümü kontrol edin
5. "Değişiklikleri Kaydet" butonuna tıklayın

## 🧪 Test Verisi Ekleme

Firebase Console'dan manuel olarak test verisi ekleyebilirsiniz:

1. Firestore Database'e gidin
2. "Start collection" butonuna tıklayın
3. Collection ID olarak `lawyer-info` yazın
4. Document ID olarak `main` yazın
5. Alanları ekleyin:
   - `name` (string): "Av. Mehmet Durdu Şen"
   - `bio` (string): "<p>Test bio metni</p>"
   - `updatedAt` (timestamp): Şimdi

## 📝 Notlar

- Slug otomatik olarak başlıktan oluşturulur (Türkçe karakterler dönüştürülür)
- Tarih otomatik olarak Türkçe formatında oluşturulur
- Makaleler "published" false ise sadece admin panelinde görünür
- HTML içerik `dangerouslySetInnerHTML` ile render edilir, güvenlik için dikkatli olun

## 🔐 Güvenlik Önerileri

1. **Firebase Authentication Ekleyin:** Admin paneline erişimi kısıtlamak için
2. **Security Rules Güncelleyin:** Write işlemlerini sadece auth kullanıcılara açın
3. **Environment Variables:** `.env.local` dosyasını asla commit etmeyin
4. **HTTPS Kullanın:** Production'da mutlaka HTTPS kullanın
5. **Input Validation:** Admin panelindeki formlara XSS koruması ekleyin

## 📚 Daha Fazla Bilgi

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Next.js + Firebase](https://firebase.google.com/docs/web/setup)

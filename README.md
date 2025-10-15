# 👨‍⚖️ Av. Mehmet Durdu Şen - Hukuk Bürosu Web Sitesi

Modern, performanslı ve SEO-uyumlu avukatlık bürosu web sitesi. Next.js 15, TypeScript, Firebase ve Tailwind CSS ile geliştirilmiştir.

## 📋 İçindekiler

- [Teknoloji Stack](#-teknoloji-stack)
- [Özellikler](#-özellikler)
- [Proje Yapısı](#-proje-yapısı)
- [Kurulum](#-kurulum)
- [Geliştirme](#-geliştirme)
- [Deployment](#-deployment)
- [Admin Panel](#-admin-panel)
- [Dokümantasyon](#-dokümantasyon)

---

## 🚀 Teknoloji Stack

### Frontend Framework

- **[Next.js 15.5.4](https://nextjs.org/)** - React tabanlı full-stack framework
  - App Router (yeni routing sistemi)
  - Server Components
  - API Routes
  - Automatic Code Splitting
  - Image Optimization
  - SEO Optimizations

### Programlama Dili

- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
  - Strict mode etkin
  - Path aliases (`@/*`)
  - ES2017+ syntax

### UI & Styling

- **[React 19.1.0](https://react.dev/)** - UI kütüphanesi
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animasyon kütüphanesi
- **[Lucide React](https://lucide.dev/)** - Icon kütüphanesi

### Backend & Database

- **[Firebase 12.4.0](https://firebase.google.com/)**
  - **Firestore** - NoSQL veritabanı
  - **Authentication** - Kullanıcı doğrulama (Email/Password)
  - **Storage Rules** - Güvenlik kuralları

### Rich Text Editor

- **[Lexical](https://lexical.dev/)** - Meta tarafından geliştirilen modern text editor
  - HTML desteği
  - Zengin metin editörü
  - Plugin mimarisi

### File Upload

- **[Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)** - Dosya yükleme ve barındırma
  - Görsel yükleme
  - Otomatik CDN optimizasyonu

### Email

- **[Nodemailer](https://nodemailer.com/)** - Email gönderimi
  - SMTP entegrasyonu (Gmail)
  - Contact form mesajları

### Utilities

- **[clsx](https://github.com/lukeed/clsx)** - Class name utility
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Tailwind class birleştirme
- **[class-variance-authority](https://cva.style/)** - Component variants

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

---

## ✨ Özellikler

### 🎨 Kullanıcı Arayüzü

- ✅ Modern ve responsive tasarım
- ✅ Smooth animasyonlar (Framer Motion)
- ✅ Hero slider (otomatik geçişli)
- ✅ Floating WhatsApp butonu
- ✅ Sticky navbar
- ✅ Dark mode hazır altyapı

### 📝 İçerik Yönetimi

- ✅ Makale sistemi (CRUD)
- ✅ Duyuru sistemi
- ✅ Zengin metin editörü (Lexical)
- ✅ Görsel yükleme (Vercel Blob)
- ✅ SEO-friendly URL'ler (slug sistemi)

### 👨‍💼 Admin Panel

- ✅ Makale yönetimi
- ✅ Duyuru yönetimi
- ✅ Avukat bilgileri düzenleme
- ✅ İletişim bilgileri düzenleme
- ✅ Hakkımızda sayfası düzenleme
- ✅ Site ayarları (bakım modu)
- ✅ Mesaj yönetimi

### 🔒 Güvenlik

- ✅ Firebase Authentication
- ✅ Protected admin routes
- ✅ Firestore security rules
- ✅ Environment variables
- ✅ CSRF koruması
- ✅ XSS sanitization

### 📧 İletişim

- ✅ Contact form
- ✅ Email gönderimi (Nodemailer)
- ✅ WhatsApp entegrasyonu
- ✅ Form validasyonu

### 🔍 SEO & Performance

- ✅ Server-side rendering (SSR)
- ✅ Static generation (SSG)
- ✅ Dynamic sitemap
- ✅ Structured data (JSON-LD)
- ✅ Meta tags optimization
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Image optimization
- ✅ Lazy loading

### 📱 Sayfalar

- ✅ Ana sayfa
- ✅ Hakkımızda
- ✅ Uzmanlık Alanları
- ✅ Makaleler (liste ve detay)
- ✅ Duyurular
- ✅ İletişim
- ✅ KVKK, Gizlilik, Çerezler
- ✅ Bakım modu
- ✅ Admin paneli

---

## 📁 Proje Yapısı

```
avmehmetdurdusenwebsite/
├── public/                          # Statik dosyalar
│   ├── images/                      # Görseller
│   │   ├── logo.png
│   │   ├── article-placeholder.jpg
│   │   └── column.svg
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── admin/                   # Admin panel sayfaları
│   │   │   ├── about/              # Hakkımızda düzenleme
│   │   │   ├── announcements/      # Duyuru yönetimi
│   │   │   ├── articles/           # Makale yönetimi
│   │   │   ├── contact-info/       # İletişim bilgileri
│   │   │   ├── init/               # Sistem başlatma
│   │   │   ├── lawyer/             # Avukat bilgileri
│   │   │   ├── login/              # Admin girişi
│   │   │   ├── messages/           # Mesaj yönetimi
│   │   │   ├── layout.tsx          # Admin layout
│   │   │   └── page.tsx            # Admin dashboard
│   │   │
│   │   ├── api/                    # API routes
│   │   │   ├── contact/           # İletişim formu
│   │   │   └── upload/            # Dosya yükleme
│   │   │
│   │   ├── makaleler/             # Makale sayfaları
│   │   │   ├── [slug]/           # Dinamik makale detay
│   │   │   └── page.tsx          # Makale listesi
│   │   │
│   │   ├── duyurular/            # Duyuru sayfası
│   │   ├── hakkimizda/           # Hakkımızda sayfası
│   │   ├── iletisim/             # İletişim sayfası
│   │   ├── uzmanlik-alanlari/    # Uzmanlık alanları
│   │   ├── kvkk/                 # KVKK sayfası
│   │   ├── gizlilik/             # Gizlilik politikası
│   │   ├── cerezler/             # Çerez politikası
│   │   ├── maintenance/          # Bakım modu sayfası
│   │   │
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Ana sayfa
│   │   ├── globals.css           # Global CSS
│   │   └── sitemap.ts            # Dinamik sitemap
│   │
│   ├── components/                # React bileşenleri
│   │   ├── ui/                   # UI bileşenleri
│   │   │   └── card.tsx
│   │   ├── AdminGuard.tsx        # Admin route guard
│   │   ├── ArticleCard.tsx       # Makale kartı
│   │   ├── ClientProvider.tsx    # Client-side provider
│   │   ├── ConditionalLayout.tsx # Conditional layout wrapper
│   │   ├── ContactForm.tsx       # İletişim formu
│   │   ├── ExpertiseAreas.tsx    # Uzmanlık alanları
│   │   ├── FloatingWhatsAppButton.tsx # WhatsApp butonu
│   │   ├── Footer.tsx            # Footer
│   │   ├── HeroSlider.tsx        # Hero slider
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── PlaceButton.tsx       # Yer butonu
│   │   ├── RichTextEditor.tsx    # Zengin metin editörü
│   │   ├── RichTextToolbar.tsx   # Editor toolbar
│   │   └── StructuredData.tsx    # SEO structured data
│   │
│   ├── services/                 # Firebase servis katmanı
│   │   ├── aboutService.ts       # Hakkımızda servisi
│   │   ├── announcementService.ts # Duyuru servisi
│   │   ├── articleService.ts     # Makale servisi
│   │   ├── contactInfoService.ts # İletişim servisi
│   │   ├── contactService.ts     # Mesaj servisi
│   │   ├── lawyerService.ts      # Avukat servisi
│   │   └── siteSettingsService.ts # Site ayarları
│   │
│   ├── contexts/                 # React contexts
│   │   └── AuthContext.tsx       # Authentication context
│   │
│   ├── hooks/                    # Custom hooks
│   │   └── useScrollPosition.ts  # Scroll position hook
│   │
│   ├── lib/                      # Utility kütüphaneleri
│   │   ├── firebase.ts          # Firebase yapılandırması
│   │   ├── security.ts          # Güvenlik utilities
│   │   └── utils.ts             # Genel utilities
│   │
│   ├── types/                    # TypeScript type tanımları
│   │   └── index.ts
│   │
│   ├── constants/                # Sabitler
│   │   ├── colors.ts            # Renk sabitleri
│   │   └── README.md
│   │
│   └── assets/                   # Asset dosyaları
│       └── hero/                # Hero görselleri
│           ├── hero1.jpg
│           ├── hero2.jpg
│           └── hero3.jpg
│
├── firestore.rules               # Firestore güvenlik kuralları
├── firestore.indexes.json        # Firestore indeksler
├── next.config.ts                # Next.js yapılandırması
├── tailwind.config.js            # Tailwind yapılandırması
├── tsconfig.json                 # TypeScript yapılandırması
├── eslint.config.mjs             # ESLint yapılandırması
├── package.json                  # Bağımlılıklar
│
├── FIREBASE_SETUP.md             # Firebase kurulum rehberi
├── ENV_TEMPLATE.md               # Environment variables
├── AUTHENTICATION_GUIDE.md       # Auth dokümantasyonu
├── ABOUT_PAGE_GUIDE.md           # Hakkımızda rehberi
├── CONTACT_INFO_GUIDE.md         # İletişim bilgileri rehberi
├── SEO_GUIDE.md                  # SEO rehberi
├── SECURITY_INFO.md              # Güvenlik bilgileri
└── README.md                     # Bu dosya
```

---

## 🛠 Kurulum

### Gereksinimler

- **Node.js** 20+ (LTS önerilir)
- **npm** veya **yarn** veya **pnpm**
- **Firebase** projesi
- **Vercel** hesabı (deployment için)

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd avmehmetdurdusenwebsite
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 3. Environment Variables Ayarlayın

Proje kök dizininde `.env.local` dosyası oluşturun:

```bash
# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_PHONE=905077368251
NEXT_PUBLIC_WHATSAPP_PREFILL=Merhaba, uygun olduğunuz bir zamanda görüşme talep ediyorum.

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dmehmetsen@gmail.com
SMTP_PASS=your-gmail-app-password-here
SMTP_FROM=dmehmetsen@gmail.com
SMTP_TO=dmehmetsen@gmail.com

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
```

> 📖 **Detaylı bilgi için:** [ENV_TEMPLATE.md](./ENV_TEMPLATE.md)

### 4. Firebase Kurulumu

1. [Firebase Console](https://console.firebase.google.com/) üzerinden yeni proje oluşturun
2. Firestore Database'i etkinleştirin
3. Authentication > Email/Password'ü etkinleştirin
4. Web App oluşturun ve config bilgilerini `.env.local`'e ekleyin
5. Firestore güvenlik kurallarını deploy edin

> 📖 **Detaylı bilgi için:** [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### 5. İlk Admin Kullanıcısını Oluşturun

```bash
npm run dev
```

Tarayıcınızda `http://localhost:3000/admin/init` adresine gidin ve ilk admin kullanıcısını oluşturun.

> ⚠️ **ÖNEMLİ:** Bu sayfayı production'da devre dışı bırakın veya silin!

---

## 💻 Geliştirme

### Development Server Başlatma

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

### Build Alma

```bash
npm run build
```

Production build'i oluşturur.

### Production Build'i Test Etme

```bash
npm run start
```

Build alındıktan sonra production modunda test eder.

### Linting

```bash
npm run lint
```

ESLint ile kod kalitesi kontrolü yapar.

### Proje Yapılandırmaları

#### TypeScript

- **Strict mode** aktif
- **Path aliases:** `@/*` → `./src/*`
- **Target:** ES2017

#### Next.js

- **App Router** kullanımı
- **Turbopack** dev server (hızlı HMR)
- **Image domains:** Pexels, Unsplash, Pixabay, Vercel Blob

#### Tailwind CSS

- **v4** (son sürüm)
- **PostCSS** entegrasyonu
- Custom color palette (`src/constants/colors.ts`)

---

## 🚀 Deployment

### Vercel (Önerilen)

1. [Vercel](https://vercel.com) hesabınızla login olun
2. "Import Project" seçeneğini kullanın
3. Git repository'nizi bağlayın
4. Environment variables'ları ekleyin:
   - Firebase credentials
   - SMTP credentials
   - BLOB_READ_WRITE_TOKEN (Vercel Blob oluşturduktan sonra)
5. Deploy butonuna tıklayın

> 📖 **Detaylı bilgi için:** [Vercel Deployment Docs](https://nextjs.org/docs/deployment)

### Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Environment Variables (Production)

Tüm environment variables'ları Vercel dashboard'dan ekleyin:

- **Settings > Environment Variables**
- Production, Preview ve Development ortamları için ayrı ayrı ekleyin

### Post-Deployment

1. ✅ SSL sertifikasının aktif olduğunu kontrol edin
2. ✅ Custom domain bağlayın (opsiyonel)
3. ✅ Firebase'de authorized domains'e production domain'i ekleyin
4. ✅ Firestore security rules'ları production ortamına uygun güncelleyin
5. ✅ `/admin/init` route'unu devre dışı bırakın veya silin

---

## 👨‍💼 Admin Panel

### Erişim

- **URL:** `https://yourdomain.com/admin/login`
- **Email:** Firebase'de oluşturduğunuz admin email
- **Password:** Firebase'de belirlediğiniz şifre

### Admin Panel Özellikleri

#### Dashboard (`/admin`)

- Hızlı istatistikler
- Son makaleler
- Son mesajlar

#### Makale Yönetimi (`/admin/articles`)

- Makale listesi
- Yeni makale ekleme
- Makale düzenleme
- Makale silme
- Yayın durumu değiştirme

#### Duyuru Yönetimi (`/admin/announcements`)

- Duyuru ekleme/düzenleme/silme
- Öncelik sıralaması
- Aktif/pasif durumu

#### Avukat Bilgileri (`/admin/lawyer`)

- İsim ve bio düzenleme
- Zengin metin editörü

#### Hakkımızda (`/admin/about`)

- Sayfa içeriği düzenleme
- Zengin metin editörü

#### İletişim Bilgileri (`/admin/contact-info`)

- Adres, telefon, email
- Çalışma saatleri
- Sosyal medya linkleri

#### Mesajlar (`/admin/messages`)

- Gelen mesajları görüntüleme
- Mesaj detayları
- Silme

### Admin Guard

Tüm admin route'ları `AdminGuard` component'i ile korunmaktadır:

- Authentication kontrolü
- Otomatik redirect
- Loading states

---

## 📚 Dokümantasyon

Proje içerisinde detaylı dokümantasyon dosyaları bulunmaktadır:

- 📄 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Firebase kurulum ve yapılandırma
- 📄 [ENV_TEMPLATE.md](./ENV_TEMPLATE.md) - Environment variables detayları
- 📄 [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md) - Authentication sistemi
- 📄 [ABOUT_PAGE_GUIDE.md](./ABOUT_PAGE_GUIDE.md) - Hakkımızda sayfası yönetimi
- 📄 [CONTACT_INFO_GUIDE.md](./CONTACT_INFO_GUIDE.md) - İletişim bilgileri yönetimi
- 📄 [SEO_GUIDE.md](./SEO_GUIDE.md) - SEO optimizasyonları
- 📄 [SECURITY_INFO.md](./SECURITY_INFO.md) - Güvenlik bilgileri

---

## 🗄️ Veritabanı Yapısı (Firestore)

### Collections

#### `articles`

```typescript
{
  id: string;
  slug: string;              // URL-friendly başlık
  title: string;             // Makale başlığı
  category: string;          // Kategori
  excerpt: string;           // Özet
  content: string;           // HTML içerik
  author: string;            // Yazar
  date: string;              // Tarih (TR format)
  tags: string[];            // Etiketler
  imageUrl: string | null;   // Kapak görseli
  published: boolean;        // Yayın durumu
  createdAt: Timestamp;      // Oluşturulma
  updatedAt: Timestamp;      // Güncellenme
}
```

#### `announcements`

```typescript
{
  id: string;
  title: string; // Başlık
  content: string; // İçerik
  priority: number; // Öncelik (1-5)
  active: boolean; // Aktif/pasif
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### `lawyer-info`

```typescript
{
  id: "main";
  name: string; // Avukat adı
  bio: string; // HTML bio
  updatedAt: Timestamp;
}
```

#### `about-content`

```typescript
{
  id: "main";
  content: string; // HTML içerik
  updatedAt: Timestamp;
}
```

#### `contact-info`

```typescript
{
  id: "main";
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  mapUrl: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  updatedAt: Timestamp;
}
```

#### `site-settings`

```typescript
{
  id: "main";
  maintenanceMode: boolean; // Bakım modu
  maintenanceMessage: string;
  updatedAt: Timestamp;
}
```

#### `contact-messages`

```typescript
{
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Timestamp;
  read: boolean; // Okundu mu?
}
```

---

## 🔐 Güvenlik

### Firebase Security Rules

Firestore güvenlik kuralları `firestore.rules` dosyasında tanımlanmıştır:

- ✅ Makaleler: Herkes yayındakileri okuyabilir
- ✅ Duyurular: Herkes aktif olanları okuyabilir
- ✅ Write işlemleri: Sadece authenticated kullanıcılar
- ✅ Admin paneli: Protected routes

### Environment Variables

- ❌ **ASLA** `.env.local` dosyasını commit etmeyin
- ✅ `.env.local` zaten `.gitignore`'da
- ✅ Production'da Vercel environment variables kullanın

### Best Practices

- ✅ Input validation
- ✅ XSS sanitization
- ✅ CSRF protection
- ✅ Rate limiting (API routes)
- ✅ Secure headers

---

## 🎨 Tasarım Sistemi

### Renk Paleti

Proje renkleri `src/constants/colors.ts` dosyasında tanımlanmıştır:

```typescript
export const colors = {
  primary: "#1a1a2e", // Koyu lacivert
  secondary: "#eaeaea", // Açık gri
  accent: "#d4af37", // Altın
  text: "#333333", // Koyu gri
  background: "#ffffff", // Beyaz
};
```

### Typography

- **Font Family:** System fonts (Apple System, Segoe UI, etc.)
- **Geist Sans** (Next.js font optimization ile yüklenir)

### Responsive Breakpoints

Tailwind CSS default breakpoints kullanılmaktadır:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 🧪 Testing (Gelecek Geliştirmeler)

Şu anda test infrastructure'ı yoktur. Gelecek versiyonlarda eklenebilir:

- [ ] Jest + React Testing Library
- [ ] Cypress (E2E)
- [ ] Firebase Emulator Suite
- [ ] Unit tests
- [ ] Integration tests

---

## 📈 Performance

### Optimizasyonlar

- ✅ Next.js Image Optimization
- ✅ Automatic Code Splitting
- ✅ Server Components (RSC)
- ✅ Static Generation (SSG) where possible
- ✅ Dynamic imports
- ✅ Lazy loading
- ✅ CDN (Vercel Edge Network)

### Lighthouse Scores

Target scores:

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

---

## 🤝 Katkıda Bulunma

### Development Workflow

1. Yeni bir branch oluşturun: `git checkout -b feature/amazing-feature`
2. Değişikliklerinizi commit edin: `git commit -m 'feat: Add amazing feature'`
3. Branch'i push edin: `git push origin feature/amazing-feature`
4. Pull Request açın

### Commit Convention

Semantic commit messages kullanın:

- `feat:` Yeni özellik
- `fix:` Bug fix
- `docs:` Dokümantasyon
- `style:` Code style (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test ekleme/güncelleme
- `chore:` Build, dependencies, etc.

---

## 📞 İletişim & Destek

- **Website:** [avmehmetdurdusen.com](https://avmehmetdurdusen.com)
- **Email:** dmehmetsen@gmail.com
- **WhatsApp:** +90 507 736 82 51

---

## 📝 Lisans

Bu proje özel bir projedir ve telif hakları saklıdır.

---

## 👥 Geliştirici Notları

### Yeni Geliştirici Onboarding

Projeye yeni katılan geliştiriciler için adım adım rehber:

1. ✅ Bu README'yi baştan sona okuyun
2. ✅ [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) dosyasını okuyun ve Firebase kurulumunu yapın
3. ✅ `.env.local` dosyasını oluşturun ([ENV_TEMPLATE.md](./ENV_TEMPLATE.md))
4. ✅ `npm install` ile bağımlılıkları yükleyin
5. ✅ `npm run dev` ile development server'ı başlatın
6. ✅ `http://localhost:3000/admin/init` ile admin kullanıcısı oluşturun
7. ✅ Admin paneline giriş yapın ve özellikleri test edin
8. ✅ Diğer dokümantasyon dosyalarını inceleyin

### Kod Yapısı Kuralları

- 🎯 Her component kendi dosyasında
- 🎯 Service katmanı ile Firebase etkileşimi
- 🎯 TypeScript strict mode
- 🎯 Functional components + hooks
- 🎯 Server Components öncelikli
- 🎯 "use client" directive sadece gerektiğinde

### Yeni Özellik Eklerken

1. Service katmanını güncelleyin (`src/services/`)
2. Type definitions ekleyin (`src/types/`)
3. Component oluşturun (`src/components/`)
4. Route/page ekleyin (`src/app/`)
5. Dokümantasyonu güncelleyin

---

## 🙏 Teşekkürler

Bu projeyi geliştirirken kullanılan açık kaynak projelere teşekkürler:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lexical](https://lexical.dev/)
- [Vercel](https://vercel.com/)

---

**Son Güncelleme:** Ekim 2025

**Proje Versiyonu:** 0.1.0

**Next.js Versiyonu:** 15.5.4

**Node.js Minimum Versiyonu:** 20+

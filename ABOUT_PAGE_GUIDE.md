# Hakkımızda Sayfası Yönetimi Rehberi

## 📋 Genel Bakış

Hakkımızda sayfası artık tamamen dinamik! Müşteriniz admin panelinden:

- ✅ Ofis açıklamalarını düzenleyebilir
- ✅ Ofis fotoğrafını değiştirebilir
- ✅ Avukat bilgilerini güncelleyebilir
- ✅ Avukat fotoğrafını yükleyebilir

Tüm bu işlemler **Vercel Blob Storage** kullanılarak yapılır (Firebase Storage kullanılmaz).

---

## 🚀 Kurulum

### 1. Vercel Blob Store Oluşturma

1. Vercel Dashboard'a gidin: https://vercel.com/dashboard
2. Projenizi seçin
3. **Storage** sekmesine tıklayın
4. **Create Database** > **Blob** seçin
5. Blob store'a bir isim verin (örn: `avmehmetdurdusen-images`)
6. **Create** butonuna tıklayın

✅ Vercel otomatik olarak `BLOB_READ_WRITE_TOKEN` environment variable'ını projenize ekleyecektir.

### 2. Local Development için Token Alma

1. Vercel Dashboard > Storage > Blob Store sekmesinde
2. Az önce oluşturduğunuz blob store'a tıklayın
3. **Settings** veya **Tokens** bölümünden `BLOB_READ_WRITE_TOKEN`'ı kopyalayın
4. `.env.local` dosyanıza ekleyin:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

5. **Development server'ı yeniden başlatın:**

```bash
# Terminal'de Ctrl+C yapın, sonra:
npm run dev
```

⚠️ **Önemli:** `next.config.ts` dosyasında Vercel Blob hostname'i zaten yapılandırılmıştır. Server'ı yeniden başlatmadan fotoğraflar görünmeyecektir.

### 3. İlk Veri Yükleme

Proje ilk deploy edildiğinde, hakkımızda sayfası default verilerle gelir. Ancak fotoğraflar `/public/images/hakkimizda/` klasöründeki placeholder fotoğrafları kullanır.

**Admin panelinden ilk kurulum:**

1. `/admin` sayfasına gidin
2. **Hakkımızda Sayfası** kartına tıklayın
3. Tüm metinleri ve fotoğrafları güncelleyin
4. **Değişiklikleri Kaydet** butonuna tıklayın

---

## 📝 Kullanım

### Admin Panelinden Erişim

1. `/admin/login` sayfasından giriş yapın
2. Ana admin sayfasında **"Hakkımızda Sayfası"** kartına tıklayın
3. Yönlendirilen sayfada (`/admin/about`) tüm bilgileri düzenleyebilirsiniz

⚠️ **Not:** Eski "Avukat Bilgileri" sayfası kaldırıldı. Artık tüm ofis ve avukat bilgileri "Hakkımızda Sayfası"ndan yönetiliyor.

### Düzenlenebilir Alanlar

#### 📌 Ofis Bilgileri

- **Ofis Başlığı**: Hakkımızda sayfasının hero bölümünde görünür
- **Açıklama 1-3**: Üç ayrı paragraf (isteğe bağlı)
- **Ofis Fotoğrafı**: Max 5MB, JPEG/PNG/WebP

#### 👨‍💼 Avukat Bilgileri

- **Avukat Adı**: Örn: "Av. Mehmet Durdu Şen"
- **Avukat Biyografisi**: Gelişmiş metin editörü ile formatlama
- **Avukat Fotoğrafı**: Max 5MB, JPEG/PNG/WebP

#### 🎨 Rich Text Editor Özellikleri

Avukat biyografisi için profesyonel bir metin editörü kullanabilirsiniz:

**Metin Formatı:**

- ✅ Kalın (Bold)
- ✅ İtalik (Italic)
- ✅ Altı Çizili (Underline)

**Başlıklar:**

- ✅ H2 Başlık (Büyük)
- ✅ H3 Başlık (Orta)

**Listeler:**

- ✅ Madde İşaretli Liste
- ✅ Numaralı Liste

**Diğer:**

- ✅ Alıntı Blokları
- ✅ Metin Hizalama (Sol, Orta, Sağ)
- ✅ Metin Rengi
- ✅ Arka Plan Rengi

**Kullanım:** Metni seçin ve toolbar'daki butonlara tıklayın.

### Fotoğraf Yükleme

1. **"Fotoğraf Yükle"** butonuna tıklayın
2. Bilgisayarınızdan bir fotoğraf seçin
3. Yükleme otomatik olarak başlar
4. ✅ Başarılı yüklendikten sonra fotoğraf önizlemesi gösterilir
5. **"Değişiklikleri Kaydet"** butonuna tıklayarak kaydedin

**Desteklenen Formatlar:**

- JPEG / JPG
- PNG
- WebP

**Maksimum Boyut:** 5MB

---

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler

- **Vercel Blob Storage**: Fotoğraf depolama
- **Firestore**: Metin verileri (başlık, açıklamalar, biyografi)
- **Next.js API Routes**: Upload endpoint (`/api/upload`)

### Dosya Yapısı

```
src/
├── app/
│   ├── admin/
│   │   └── about/
│   │       └── page.tsx          # Admin yönetim sayfası
│   ├── api/
│   │   └── upload/
│   │       └── route.ts          # Blob upload API
│   └── hakkimizda/
│       └── page.tsx              # Public hakkımızda sayfası (dinamik)
├── services/
│   └── aboutService.ts           # Firestore CRUD işlemleri
└── types/
    └── index.ts                  # AboutPage & AboutPageFormData types
```

### Firestore Koleksiyonu

**Koleksiyon:** `aboutPage`
**Document ID:** `main` (tek döküman)

**Veri Yapısı:**

```typescript
{
  officeTitle: string;
  officeDescription1: string;
  officeDescription2: string;
  officeDescription3: string;
  officeImageUrl: string; // Vercel Blob URL
  lawyerName: string;
  lawyerBio: string; // HTML (RichTextEditor output)
  lawyerImageUrl: string; // Vercel Blob URL
  editorStateJSON: string | null; // Lexical editor state (for lossless editing)
  updatedAt: Timestamp;
}
```

**Not:** `editorStateJSON` RichTextEditor'ün tam state'ini saklar. Bu sayede renk, format gibi özellikler kaybolmadan yeniden düzenlenebilir.

---

## 🛡️ Güvenlik

- ✅ Sadece admin kullanıcıları bu sayfaya erişebilir (`AdminGuard`)
- ✅ Dosya boyutu kontrolü (max 5MB)
- ✅ Dosya tipi validasyonu (sadece JPEG, PNG, WebP)
- ✅ Blob URL'leri public ama tahmin edilemez (random suffix)

---

## 🐛 Sorun Giderme

### Fotoğraf Yüklenmiyor

**1. Blob Token Kontrolü**

```bash
# .env.local dosyasını kontrol edin
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
```

**2. Vercel Dashboard'da Token Kontrolü**

- Vercel Dashboard > Project > Settings > Environment Variables
- `BLOB_READ_WRITE_TOKEN` olduğundan emin olun

**3. Local Development**

```bash
# Development server'ı yeniden başlatın
npm run dev
```

### Fotoğraf Görünmüyor

**1. Browser Cache**

- Hard refresh yapın: `Cmd+Shift+R` (Mac) veya `Ctrl+Shift+R` (Windows)

**2. Blob URL Kontrolü**

- Admin panelden fotoğrafın URL'sini kontrol edin
- URL şu formatta olmalı: `https://xxxxx.public.blob.vercel-storage.com/...`

**3. Firestore Kontrolü**

- Firebase Console > Firestore > `aboutPage` koleksiyonu
- `officeImageUrl` ve `lawyerImageUrl` alanlarını kontrol edin

### "Veri Yüklenirken Hata"

**1. Firestore Kuralları**

```javascript
// firestore.rules
match /aboutPage/{document=**} {
  allow read: if true;  // Public read
  allow write: if request.auth != null;  // Authenticated write
}
```

**2. Firebase Init**

- Firebase kurallarını deploy edin:

```bash
firebase deploy --only firestore:rules
```

---

## 📱 Responsive Davranış

- **Desktop**: Grid layout (2 sütun: metin + fotoğraf)
- **Tablet**: Grid devam eder ama küçük gap
- **Mobile**: Stack layout (metin üstte, fotoğraf altta)

---

## 🔄 Veri Yönetimi

### Default Data

İlk kurulumda, sistem otomatik olarak default veriler yükler. Admin panelden `/admin/about` sayfasına ilk girişinizde bu veriler yüklenir.

### Veri Güncelleme

Her güncelleme `updatedAt` timestamp'i ile kaydedilir. Bu sayede son güncelleme tarihini takip edebilirsiniz.

### Veri Silme

Şu an silme özelliği yok. Ancak isterseniz Firebase Console'dan manuel olarak silebilirsiniz:

1. Firebase Console > Firestore
2. `aboutPage` > `main` dokümanı
3. Sil butonuna tıklayın

Sonraki admin paneli açılışında default veriler tekrar yüklenir.

---

## 📊 İzleme ve Analytics

### Console Logs

Development'ta tüm işlemler console'a loglanır:

- ✅ Data fetch
- ✅ Data update
- ✅ Image upload
- ❌ Errors

### Production

Production'da sadece kritik hatalar loglanır. Vercel Dashboard'dan logları kontrol edebilirsiniz:

- Vercel Dashboard > Project > Logs

---

## 🎨 Özelleştirme

### Fotoğraf Boyutu Limiti Değiştirme

`src/app/api/upload/route.ts`:

```typescript
const maxSize = 5 * 1024 * 1024; // 5MB
// Değiştirin:
const maxSize = 10 * 1024 * 1024; // 10MB
```

### Desteklenen Formatları Değiştirme

`src/app/api/upload/route.ts`:

```typescript
const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// GIF ekleyin:
const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
```

### Paragraf Sayısını Artırma

`src/types/index.ts` ve `aboutService.ts` dosyalarını güncelleyin:

```typescript
officeDescription4: string;
officeDescription5: string;
```

---

## 💡 İpuçları

1. **Fotoğraf Optimizasyonu**: Yüklemeden önce fotoğrafları optimize edin (örn: TinyPNG kullanın)
2. **Professional Photos**: Profesyonel fotoğraflar kullanın (bulanık veya düşük çözünürlüklü fotoğraflardan kaçının)
3. **Consistent Aspect Ratio**: Tüm fotoğraflar için aynı en-boy oranını kullanın (örn: 4:3)
4. **Alt Text**: Fotoğraflar otomatik olarak uygun alt text ile yüklenir (SEO için iyi)
5. **Regular Backups**: Önemli değişikliklerden önce Firebase'den backup alın
6. **Rich Text Editor**: Biyografi yazarken önce metni yazın, sonra formatı ekleyin
7. **Renk Kullanımı**: Metin renkleri dikkatli kullanın, okunabilirliği koruyun
8. **Preview**: Kaydettikten sonra public `/hakkimizda` sayfasından kontrol edin

---

## 📞 Destek

Herhangi bir sorunla karşılaşırsanız:

1. Bu rehberi kontrol edin
2. Console loglarını inceleyin
3. Vercel Dashboard'dan deployment loglarını kontrol edin
4. Firebase Console'dan Firestore verilerini kontrol edin

---

## ✅ Checklist - İlk Kurulum

- [ ] Vercel Blob Store oluşturuldu
- [ ] `BLOB_READ_WRITE_TOKEN` environment variable'ına eklendi
- [ ] Local `.env.local` dosyasına token eklendi
- [ ] Admin panelinden `/admin/about` sayfasına gidildi
- [ ] Tüm metinler güncellendi
- [ ] İki fotoğraf yüklendi (ofis + avukat)
- [ ] Değişiklikler kaydedildi
- [ ] Public `/hakkimizda` sayfasında kontrol edildi
- [ ] Mobile responsive kontrol edildi

---

**Son Güncelleme:** 14 Ekim 2025
**Versiyon:** 1.0.0

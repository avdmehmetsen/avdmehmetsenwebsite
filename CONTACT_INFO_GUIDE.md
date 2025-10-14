# İletişim Bilgileri Yönetim Sistemi

## 📋 Genel Bakış

Bu sistem, web sitenizdeki tüm iletişim bilgilerini (telefon, email, adres, Google Maps) tek bir yerden yönetmenizi sağlar. Bilgileri güncelledığinizde, sitenin her yerinde otomatik olarak değişir.

## 🚀 İlk Kurulum

### Adım 1: Firebase'de Başlangıç Verilerini Oluşturun

1. Admin paneline giriş yapın: `/admin/login`
2. Şu sayfaya gidin: `/admin/init`
3. "İletişim Bilgilerini Oluştur" butonuna tıklayın
4. Başarılı mesajı aldıktan sonra, varsayılan bilgiler Firebase'e kaydedilmiş olacak

### Adım 2: Firestore Rules'u Deploy Edin

Firebase Console'dan veya Firebase CLI ile Firestore rules'u deploy edin:

```bash
firebase deploy --only firestore:rules
```

## 📝 İletişim Bilgilerini Güncelleme

### Yönetim Panelinden Güncelleme

1. Admin paneline gidin: `/admin`
2. "İletişim Bilgileri" kartına tıklayın
3. İlgili alanları doldurun:

   - **Telefon**: Format: `+90 (507) 736 82 51`
   - **E-posta**: Geçerli email adresi
   - **Tam Adres**: Footer ve iletişim sayfasında gösterilir
   - **Kısa Adres**: Navbar'da mobil görünümde gösterilir
   - **Enlem (Latitude)**: Google Maps koordinatı
   - **Boylam (Longitude)**: Google Maps koordinatı
   - **Google Maps Embed URL**: iframe src URL'si

4. "Kaydet" butonuna tıklayın

### Google Maps Embed URL Nasıl Alınır?

1. [Google Maps](https://www.google.com/maps)'te konumunuzu bulun
2. "Paylaş" butonuna tıklayın
3. "Harita ekle" sekmesine geçin
4. Görünen iframe kodundaki `src="..."` kısmındaki URL'yi kopyalayın
5. Sadece URL'yi (iframe kodunun tamamını değil) yapıştırın

**Örnek:**

```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3123...
```

## 🌍 Bilgilerin Kullanıldığı Yerler

İletişim bilgileri sisteminizde şu yerlerde dinamik olarak gösterilir:

### 1. **Navbar** (`/components/Navbar.tsx`)

- ✅ Telefon numarası (desktop + mobil)
- ✅ Email adresi (desktop + mobil)
- ✅ Tam adres (desktop)
- ✅ Kısa adres (mobil)

### 2. **Footer** (`/components/Footer.tsx`)

- ✅ Email adresi
- ✅ Telefon numarası + "Hemen Ara" butonu
- ✅ Tam adres + "Yol Tarifi" butonu

### 3. **İletişim Sayfası** (`/app/iletisim/page.tsx`)

- ✅ Adres
- ✅ Telefon + "Hemen Ara" butonu
- ✅ Email
- ✅ Google Maps iframe (harita)

### 4. **SEO - Structured Data** (`/components/StructuredData.tsx`)

- ✅ Adres
- ✅ Telefon
- ✅ Email
- ✅ GPS koordinatları (latitude/longitude)

### 5. **WhatsApp Butonu** (`/components/FloatingWhatsAppButton.tsx`)

- ✅ Telefon numarası (WhatsApp linki için)

### 6. **Yol Tarifi Butonu** (`/components/PlaceButton.tsx`)

- ✅ GPS koordinatları (Google Maps yol tarifi için)

## 🔒 Güvenlik

- ✅ Sadece admin kullanıcılar iletişim bilgilerini düzenleyebilir
- ✅ Herkes iletişim bilgilerini okuyabilir (public bilgi)
- ✅ Firebase Firestore Rules ile korunmaktadır

## 📦 Teknik Detaylar

### Firebase Collection

- **Collection Name**: `contactInfo`
- **Document ID**: `main` (tek bir döküman)

### Type Definition

```typescript
interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  address: string;
  addressShort: string;
  googleMapsIframe: string;
  latitude: string;
  longitude: string;
  updatedAt: Date;
}
```

### Service Fonksiyonları

- `getContactInfo()`: İletişim bilgilerini getirir
- `updateContactInfo(data)`: İletişim bilgilerini günceller
- `initializeContactInfo()`: Varsayılan bilgileri oluşturur (ilk kurulum için)

## 🎯 En İyi Uygulamalar

1. **Telefon Formatı**: Tutarlı format kullanın: `+90 (507) 736 82 51`
2. **Koordinatlar**: Hassas koordinatlar için Google Maps'ten alın
3. **Test Edin**: Güncellemeden sonra tüm sayfaları kontrol edin
4. **SEO**: Structured Data'nın güncellenmesi SEO için çok önemlidir

## 🆘 Sorun Giderme

### Değişiklikler Görünmüyor

- Sayfayı yenileyin (Ctrl+F5 / Cmd+Shift+R)
- Browser cache'ini temizleyin
- Firebase Console'dan verinin güncellendiğini kontrol edin

### Google Maps Gösterilmiyor

- Embed URL'nin doğru olduğundan emin olun
- URL'nin `https://www.google.com/maps/embed?pb=` ile başladığını kontrol edin
- Tarayıcı konsolunda hata olup olmadığına bakın

### Telefon Numarası Çalışmıyor

- Formatın doğru olduğundan emin olun
- Özel karakterlerin (parantez, boşluk) tutarlı olduğunu kontrol edin
- WhatsApp için: Telefon uluslararası formatta olmalı (+90...)

## 📞 Destek

Herhangi bir sorun yaşarsanız:

1. Firebase Console'dan verileri kontrol edin
2. Browser console'da JavaScript hataları olup olmadığına bakın
3. Firestore Rules'un doğru deploy edildiğini kontrol edin

---

**Not:** İlk kurulumda `/admin/init` sayfasını mutlaka ziyaret edin!

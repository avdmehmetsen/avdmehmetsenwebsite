# Vercel Analytics & Speed Insights Kılavuzu

## 📊 Genel Bakış

Projenize Vercel Web Analytics ve Speed Insights entegre edilmiştir. Bu özellikler sayesinde:

- **Web Analytics**: Ziyaretçi istatistiklerini, sayfa görüntülemelerini ve kullanıcı davranışlarını takip edebilirsiniz
- **Speed Insights**: Web sitesi performans metriklerini ve Core Web Vitals'ı izleyebilirsiniz

## 🚀 Yapılan Değişiklikler

### Yüklenen Paketler

```bash
npm install @vercel/analytics @vercel/speed-insights
```

### Entegre Edilen Dosyalar

**`src/app/layout.tsx`**

- `Analytics` komponenti eklendi (Web Analytics için)
- `SpeedInsights` komponenti eklendi (Performance monitoring için)

Her iki komponent de `<body>` tagının sonuna eklenmiştir.

## 📈 Vercel Dashboard'da Görüntüleme

### Web Analytics

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. **Analytics** sekmesine tıklayın
4. Aşağıdaki metrikleri görebilirsiniz:
   - Sayfa görüntülemeleri
   - Ziyaretçi sayısı
   - En çok ziyaret edilen sayfalar
   - Coğrafi konum dağılımı
   - Referans kaynakları
   - Cihaz ve tarayıcı bilgileri

### Speed Insights

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. **Speed Insights** sekmesine tıklayın
4. Aşağıdaki metrikleri görebilirsiniz:
   - **LCP** (Largest Contentful Paint)
   - **FID** (First Input Delay)
   - **CLS** (Cumulative Layout Shift)
   - **TTFB** (Time to First Byte)
   - **FCP** (First Contentful Paint)
   - Sayfa bazında performans skorları

## 🔧 Konfigürasyon

### Temel Kullanım

Mevcut entegrasyon temel kullanım için yeterlidir. Ekstra konfigürasyon gerekmez.

### Gelişmiş Kullanım (Opsiyonel)

#### Özel Etkinlik Takibi

Analytics'e özel etkinlikler eklemek isterseniz:

```tsx
import { track } from "@vercel/analytics";

// Örnek: Form gönderimi takibi
track("form_submission", {
  form_name: "contact_form",
  success: true,
});
```

#### Debug Modu

Geliştirme sırasında analytics'i test etmek için:

```tsx
<Analytics debug={true} />
```

#### Belli Sayfalarda Devre Dışı Bırakma

Gerekirse belli sayfalarda analytics'i devre dışı bırakabilirsiniz:

```tsx
// Belirli bir sayfada
<Analytics
  beforeSend={(event) => {
    if (window.location.pathname === "/admin") {
      return null; // Admin sayfalarında takip yapma
    }
    return event;
  }}
/>
```

## 📊 Metrics Açıklamaları

### Core Web Vitals

- **LCP** (Largest Contentful Paint): Sayfadaki en büyük içeriğin yüklenme süresi

  - İyi: < 2.5s
  - Orta: 2.5s - 4s
  - Kötü: > 4s

- **FID** (First Input Delay): Kullanıcının ilk etkileşiminden tarayıcının cevap verdiği süre

  - İyi: < 100ms
  - Orta: 100ms - 300ms
  - Kötü: > 300ms

- **CLS** (Cumulative Layout Shift): Sayfa yüklenirken görsel kayma miktarı
  - İyi: < 0.1
  - Orta: 0.1 - 0.25
  - Kötü: > 0.25

## 🎯 En İyi Uygulamalar

1. **Düzenli İzleme**: Analytics'i haftalık olarak kontrol edin
2. **Performance Optimizasyonu**: Speed Insights skorlarını iyileştirmek için:
   - Görselleri optimize edin
   - Lazy loading kullanın
   - Code splitting uygulayın
   - CDN kullanın
3. **Kullanıcı Deneyimi**: Analytics verilerini kullanarak:
   - En popüler sayfaları belirleyin
   - Bounce rate'i düşürün
   - Conversion funnel'ı optimize edin

## 🔒 Gizlilik

Vercel Analytics:

- Cookie kullanmaz
- GDPR uyumludur
- Kullanıcı gizliliğini korur
- Kişisel veri toplamaz

## 🚨 Sorun Giderme

### Analytics Verisi Görünmüyorsa

1. Projenin production'da deploy edildiğinden emin olun
2. Vercel Dashboard'da Analytics'in enable olduğunu kontrol edin
3. 24 saat bekleyin (ilk verilerin toplanması zaman alabilir)
4. Browser cache'ini temizleyin

### Geliştirme Ortamında Test

Geliştirme ortamında analytics otomatik olarak devre dışıdır. Test etmek için:

```bash
npm run build
npm start
```

Production build ile test edebilirsiniz.

## 📚 Ek Kaynaklar

- [Vercel Analytics Dokümantasyonu](https://vercel.com/docs/analytics)
- [Speed Insights Dokümantasyonu](https://vercel.com/docs/speed-insights)
- [Web Vitals Hakkında](https://web.dev/vitals/)

## 🔄 Güncelleme

Paketleri güncel tutmak için:

```bash
npm update @vercel/analytics @vercel/speed-insights
```

---

**Not**: Analytics verileri sadece production ortamında toplanır. Local development sırasında veri toplanmaz.

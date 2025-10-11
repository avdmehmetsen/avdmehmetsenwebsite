# 🛡️ Güvenlik Özellikleri - İletişim Formu

## ✅ Aktif Güvenlik Katmanları

### 1. **Rate Limiting (Hız Sınırlama)**

```typescript
// 15 dakikada maksimum 3 mesaj
checkRateLimit(clientIP, 3, 15 * 60 * 1000);
```

**Nasıl Çalışır:**

- Her IP adresi için 15 dakikalık bir pencere açılır
- Bu süre içinde maksimum 3 mesaj gönderilebilir
- 4. mesaj denemesinde "429 Too Many Requests" hatası döner
- Kullanıcıya "Çok fazla mesaj gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin." mesajı gösterilir

**Test:**

```bash
# 1. Mesaj: ✅ Başarılı (Kalan: 2)
# 2. Mesaj: ✅ Başarılı (Kalan: 1)
# 3. Mesaj: ✅ Başarılı (Kalan: 0)
# 4. Mesaj: ❌ Rate limit aşıldı (15 dakika bekle)
```

---

### 2. **IP Adresi Kontrolü**

```typescript
isSuspiciousIP(clientIP);
```

**Kontroller:**

- Bilinen kötü IP listeleri (şimdilik pasif)
- Private/Local IP'ler (development'ta izin verilir)
- VPN/Proxy algılama (gelecekte eklenebilir)

**Bloklanırsa:** Sessizce başarı mesajı döner (spam botlarını kandırır)

---

### 3. **User-Agent Kontrolü**

```typescript
isSuspiciousUserAgent(userAgent);
```

**Bloklar:**

- `bot`, `crawler`, `spider`, `scraper` içeren user-agent'ler
- `python`, `curl`, `wget` gibi script araçları
- Boş user-agent'ler

**Development'ta:** Tüm kontroller devre dışı (test için)

---

### 4. **Form Validasyonu**

```typescript
validateAndSanitizeFormData(body);
```

**Kontroller:**

- **Ad Soyad:** 2-100 karakter, zorunlu
- **Email:** Geçerli format, minimum 5 karakter
- **Telefon:** 10-20 karakter (opsiyonel)
- **Konu:** Zorunlu, dropdown'dan seçilmeli
- **Mesaj:** 5-2000 karakter, zorunlu

**Sanitizasyon:**

- `.trim()` ile boşluklar temizlenir
- Email küçük harfe çevrilir
- XSS koruması (HTML encoding)

---

### 5. **KVKK Onay Kontrolü**

```typescript
if (!body.kvkkConsent) {
  return NextResponse.json(
    { error: "KVKK onayı gereklidir." },
    { status: 400 }
  );
}
```

**Yasal Gereklilik:** Her mesaj için KVKK aydınlatma metni onayı zorunlu

---

### 6. **Input Sanitization (XSS Koruması)**

- Tüm string inputlar `.trim()` ile temizlenir
- Özel karakterler kontrol edilir
- SQL Injection riski yok (Firebase kullanıyoruz)

---

### 7. **Error Handling (Bilgi Sızıntısı Koruması)**

```typescript
// Kullanıcıya genel hata mesajı
return NextResponse.json({ error: "Sunucu hatası oluştu" }, { status: 500 });

// Detaylı hata sadece server loglarında
console.error("Actual error:", err.message);
```

**Güvenlik İlkesi:** Kullanıcıya sistem detayları verilmez

---

## 📊 Güvenlik Seviyeleri

| Katman          | Durum    | Seviye |
| --------------- | -------- | ------ |
| Rate Limiting   | ✅ Aktif | Yüksek |
| IP Kontrolü     | ⚠️ Pasif | Orta   |
| User-Agent      | ✅ Aktif | Orta   |
| Form Validation | ✅ Aktif | Yüksek |
| KVKK Onay       | ✅ Aktif | Yüksek |
| XSS Koruması    | ✅ Aktif | Yüksek |
| Error Handling  | ✅ Aktif | Yüksek |

---

## 🚀 Ek Güvenlik Önerileri

### Gelecekte Eklenebilir:

1. **Honeypot Field:**

   ```typescript
   // Gizli input field (botlar doldurur, insanlar görmez)
   if (body.honeypot) {
     return NextResponse.json({ ok: true }); // Bot tespit edildi
   }
   ```

2. **reCAPTCHA v3:**

   ```typescript
   // Google reCAPTCHA ile bot koruması
   const score = await verifyRecaptcha(body.token);
   if (score < 0.5) block();
   ```

3. **IP Reputation Service:**

   ```typescript
   // AbuseIPDB, IPQualityScore gibi servisler
   const isVPN = await checkIPReputation(clientIP);
   ```

4. **Email Verification:**

   ```typescript
   // Tek kullanımlık email adresleri engelle
   const isTempEmail = await checkTempEmail(email);
   ```

5. **Geographic Filtering:**
   ```typescript
   // Sadece Türkiye'den gelen isteklere izin ver
   if (country !== "TR") block();
   ```

---

## 📈 Monitoring ve Logging

### Loglanıyor:

- ✅ Her form gönderimi (IP, timestamp)
- ✅ Rate limit aşımları
- ✅ Validation hataları
- ✅ Bloklanmış IP/User-Agent'ler

### Log Örneği:

```bash
✅ Contact form submitted from IP: 192.168.1.1, remaining: 2
⚠️ Rate limit exceeded for IP: 192.168.1.1
🚫 Suspicious User-Agent blocked: python-requests/2.28.0
```

---

## 🔒 Firestore Security Rules

```javascript
// Contacts Collection
match /contacts/{contact} {
  // Okuma: Sadece admin
  allow read: if isAdmin();

  // Yazma: Herkes (rate limiting API'de kontrol edilir)
  allow create: if true;

  // Güncelleme/Silme: Sadece admin
  allow update, delete: if isAdmin();
}
```

---

## ⚡ Performans ve Güvenlik Dengesi

**Hız:**

- In-memory rate limiting (çok hızlı)
- Minimal validation (gereksiz kontrol yok)
- Async operations (bloklamaz)

**Güvenlik:**

- Multi-layer protection
- Fail-safe defaults
- Comprehensive logging

**Sonuç:** ~1-2 saniye response time (email gönderimi dahil)

---

## 🧪 Test Senaryoları

### 1. Normal Kullanıcı:

```
✅ 1. Mesaj → Başarılı
✅ 2. Mesaj (10 dk sonra) → Başarılı
✅ 3. Mesaj (20 dk sonra) → Başarılı
```

### 2. Spam Denemesi:

```
✅ 1. Mesaj → Başarılı
✅ 2. Mesaj → Başarılı
✅ 3. Mesaj → Başarılı
❌ 4. Mesaj → Rate limit! (429)
❌ 5. Mesaj → Rate limit! (429)
⏰ 15 dakika sonra reset
```

### 3. Bot Denemesi:

```
❌ User-Agent: "python-requests" → Bloklandı
❌ User-Agent: "curl/7.68.0" → Bloklandı
❌ Validation hatası → 400 error
```

---

## 🎯 Öneriler

**Production Ortamında:**

1. ✅ Rate limiting aktif (3/15min) - **Yeterli**
2. ✅ Form validation aktif - **Yeterli**
3. ✅ KVKK kontrolü aktif - **Gerekli**
4. ⚠️ reCAPTCHA eklenebilir - **İsteğe bağlı**
5. ⚠️ IP reputation servisi - **İsteğe bağlı**

**Şu Anki Koruma Seviyesi:** ⭐⭐⭐⭐☆ (4/5)

- Orta-büyük ölçekli siteler için yeterli
- Çok yüksek trafikli siteler için reCAPTCHA eklenebilir

---

**Son Güncelleme:** 2024
**Durum:** ✅ Production Ready

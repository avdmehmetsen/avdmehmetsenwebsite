import { NextResponse } from "next/server";
import { createContactMessage } from "@/services/contactService";
import {
  getClientIP,
  getUserAgent,
  isSuspiciousIP,
  isSuspiciousUserAgent,
  checkRateLimit,
  validateAndSanitizeFormData,
} from "@/lib/security";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Güvenlik kontrolleri
    const clientIP = await getClientIP();
    const userAgent = await getUserAgent();

    // Şüpheli IP kontrolü
    if (isSuspiciousIP(clientIP)) {
      console.log("Suspicious IP blocked:", clientIP);
      return NextResponse.json({ ok: true }); // Spam'a sessizce başarı dön
    }

    // Şüpheli User-Agent kontrolü
    if (isSuspiciousUserAgent(userAgent)) {
      console.log("Suspicious User-Agent blocked:", userAgent);
      return NextResponse.json({ ok: true });
    }

    // Rate limiting kontrolü
    const rateLimit = checkRateLimit(clientIP, 3, 15 * 60 * 1000); // 15 dakikada max 3 mesaj
    if (!rateLimit.allowed) {
      console.log("Rate limit exceeded for IP:", clientIP);
      return NextResponse.json(
        {
          error:
            "Çok fazla mesaj gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.",
          resetTime: rateLimit.resetTime,
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Debug için gelen veriyi logla
    console.log("Received form data:", {
      name: body.name,
      email: body.email,
      subject: body.subject,
      kvkkConsent: body.kvkkConsent,
      kvkkConsentType: typeof body.kvkkConsent,
    });

    // KVKK onay kontrolü
    if (!body.kvkkConsent) {
      console.log(
        "KVKK consent not provided from IP:",
        clientIP,
        "Body:",
        body
      );
      return NextResponse.json(
        { error: "KVKK onayı gereklidir." },
        { status: 400 }
      );
    }

    // Form validasyonu ve temizleme
    const validation = validateAndSanitizeFormData(body);
    if (!validation.isValid) {
      console.log("Form validation failed:", validation.errors);
      console.log("Validation details:", {
        receivedData: body,
        errors: validation.errors,
        sanitizedData: validation.sanitizedData,
      });
      return NextResponse.json(
        {
          error: `Geçersiz form verisi: ${validation.errors.join(", ")}`,
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = validation.sanitizedData;

    // Firebase'e kaydet
    await createContactMessage({
      name: name!,
      email: email!,
      phone: phone || undefined,
      subject: subject!,
      message: message!,
    });

    // E-posta gönder (hata durumunda Firebase kaydı etkilenmesin)
    try {
      await sendEmailNotification({
        name: name!,
        email: email!,
        phone: phone || undefined,
        subject: subject!,
        message: message!,
      });
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error(
        "Email sending failed, but message was saved to Firebase:",
        emailError
      );
      // Email hatası Firebase kaydını etkilemesin, kullanıcıya başarı mesajı ver
    }

    console.log(
      `Contact form submitted successfully from IP: ${clientIP}, Rate limit remaining: ${rateLimit.remaining}`
    );

    return NextResponse.json({
      ok: true,
      rateLimit: {
        remaining: rateLimit.remaining,
        resetTime: rateLimit.resetTime,
      },
    });
  } catch (err) {
    console.error("Contact form error:", err);

    // Hata detayını logla ama kullanıcıya genel mesaj göster
    const errorMessage = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("Error details:", errorMessage);

    return NextResponse.json(
      {
        error:
          "Mesaj gönderilirken bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

async function sendEmailNotification({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  try {
    // SMTP transporter oluştur
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // E-posta içeriği
    const subjectOptions: { [key: string]: string } = {
      "Ceza Hukuku": "Ceza Hukuku",
      "Ticaret Hukuku": "Ticaret Hukuku",
      "Aile Hukuku": "Aile Hukuku",
      "İş Hukuku": "İş Hukuku",
      "Gayrimenkul Hukuku": "Gayrimenkul Hukuku",
      "Miras Hukuku": "Miras Hukuku",
      "Medeni Hukuk": "Medeni Hukuk",
      "Borçlar Hukuku": "Borçlar Hukuku",
      "İdare Hukuku": "İdare Hukuku",
      "Vergi Hukuku": "Vergi Hukuku",
      "Sigorta Hukuku": "Sigorta Hukuku",
      "Bilişim Hukuku": "Bilişim Hukuku",
      "Tüketici Hukuku": "Tüketici Hukuku",
      "Yabancılar ve Vatandaşlık Hukuku": "Yabancılar ve Vatandaşlık Hukuku",
      "İcra ve İflas Hukuku": "İcra ve İflas Hukuku",
      "Enerji ve Çevre Hukuku": "Enerji ve Çevre Hukuku",
      "Sağlık Hukuku": "Sağlık Hukuku",
      "Deniz ve Taşıma Hukuku": "Deniz ve Taşıma Hukuku",
      "Spor Hukuku": "Spor Hukuku",
      "Uluslararası Hukuk": "Uluslararası Hukuk",
      Diğer: "Diğer",
    };

    const subjectText = subjectOptions[subject] || subject;

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #cb8929;">
            <h1 style="color: #1e293b; margin: 0; font-size: 28px; font-weight: 700;">📧 Yeni İletişim Mesajı</h1>
            <p style="color: #64748b; margin: 10px 0 0 0; font-size: 16px;">Av. Mehmet Durdu Şen - Hukuk Bürosu</p>
          </div>
          
          <!-- Client Info -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #cb8929;">
            <h2 style="color: #92400e; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
              👤 Müvekkil Bilgileri
            </h2>
            
            <div style="display: grid; gap: 12px;">
              <p style="margin: 0; color: #92400e; font-size: 15px;"><strong>👨‍💼 Ad Soyad:</strong> ${name}</p>
              <p style="margin: 0; color: #92400e; font-size: 15px;"><strong>📧 E-posta:</strong> <a href="mailto:${email}" style="color: #cb8929; text-decoration: none;">${email}</a></p>
              ${
                phone
                  ? `<p style="margin: 0; color: #92400e; font-size: 15px;"><strong>📞 Telefon:</strong> <a href="tel:${phone}" style="color: #cb8929; text-decoration: none;">${phone}</a></p>`
                  : ""
              }
              <p style="margin: 0; color: #92400e; font-size: 15px;"><strong>⚖️ Hukuk Alanı:</strong> ${subjectText}</p>
              <p style="margin: 0; color: #92400e; font-size: 15px;"><strong>📅 Tarih:</strong> ${new Date().toLocaleString(
                "tr-TR",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}</p>
            </div>
          </div>
          
          <!-- Message Content -->
          <div style="background-color: #f1f5f9; padding: 25px; border-radius: 10px; border-left: 5px solid #3b82f6; margin-bottom: 25px;">
            <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
              💬 Mesaj İçeriği
            </h2>
            <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="color: #374151; line-height: 1.8; margin: 0; white-space: pre-wrap; font-size: 15px;">${message}</p>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div style="text-align: center; margin-top: 30px;">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 20px; border-radius: 10px;">
              <p style="color: #cbd5e1; margin: 0 0 15px 0; font-size: 14px;">Bu mesaj hukuk bürosu web sitesi iletişim formundan gönderilmiştir.</p>
              
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #cb8929; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; transition: all 0.3s;">
                  📧 E-posta ile Yanıtla
                </a>
                ${
                  phone
                    ? `<a href="tel:${phone}" style="display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; transition: all 0.3s;">
                      📞 Telefon ile Ara
                    </a>`
                    : ""
                }
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 13px; margin: 0;">
              <strong>Av. Mehmet Durdu Şen</strong><br>
              Hukuk Danışmanlığı ve Müvekkil Hizmetleri<br>
              🌐 Web: <a href="https://avdurdumehmetsen.com" style="color: #cb8929;">avdurdumehmetsen.com</a>
            </p>
          </div>
          
        </div>
      </div>
    `;

    const textContent = `
🏛️ AV. MEHMET DURDU ŞEN - HUKUK BÜROSU
=============================================

📧 YENİ İLETİŞİM MESAJI

👤 MÜVEKKİL BİLGİLERİ:
━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💼 Ad Soyad: ${name}
📧 E-posta: ${email}
📞 Telefon: ${phone || "Belirtilmemiş"}
⚖️ Hukuk Alanı: ${subjectText}
📅 Tarih: ${new Date().toLocaleString("tr-TR")}

💬 MESAJ İÇERİĞİ:
━━━━━━━━━━━━━━━━━━━━━━━━
${message}

═══════════════════════════════════════════
Bu mesaj hukuk bürosu web sitesi iletişim formundan gönderilmiştir.
Yanıtlamak için: ${email}
${phone ? `Aramak için: ${phone}` : ""}
    `;

    // E-posta gönder
    await transporter.sendMail({
      from: `"Av. Mehmet Durdu Şen - Hukuk Bürosu" <${
        process.env.SMTP_FROM || process.env.SMTP_USER
      }>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `⚖️ [Hukuk Bürosu] ${subjectText} - ${name}`,
      text: textContent,
      html: htmlContent,
    });

    console.log("E-posta başarıyla gönderildi:", email);
  } catch (error) {
    console.error("E-posta gönderim hatası:", error);
    console.error("SMTP Configuration:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? "***configured***" : "not configured",
      from: process.env.SMTP_FROM || "not configured",
      to: process.env.SMTP_TO || "not configured",
    });
    // E-posta gönderim hatası Firebase kaydını etkilemesin ama hata fırlat
    throw error;
  }
}

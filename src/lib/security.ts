import { headers } from "next/headers";

// Rate limiting için basit in-memory store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export async function getClientIP(): Promise<string> {
  const headersList = await headers();
  const xForwardedFor = headersList.get("x-forwarded-for");
  const xRealIP = headersList.get("x-real-ip");
  const remoteAddr = headersList.get("remote-addr");

  let ip = "unknown";

  if (xForwardedFor) {
    ip = xForwardedFor.split(",")[0].trim();
  } else if (xRealIP) {
    ip = xRealIP;
  } else if (remoteAddr) {
    ip = remoteAddr;
  }

  return ip;
}

export async function getUserAgent(): Promise<string> {
  const headersList = await headers();
  return headersList.get("user-agent") || "unknown";
}

export function isSuspiciousIP(ip: string): boolean {
  // Basit IP kontrolleri - şimdilik production'da da local IP'lere izin ver
  // İleride gerekirse bu kontroller aktifleştirilebilir:
  // const suspiciousPatterns = [/^192\.168\./, /^10\./, /^172\./];

  // Development ortamında localhost'u allow et
  if (
    process.env.NODE_ENV === "development" &&
    (ip === "127.0.0.1" || ip === "::1" || ip === "unknown")
  ) {
    return false;
  }

  return false; // Şimdilik tüm IP'leri kabul et
}

export function isSuspiciousUserAgent(userAgent: string): boolean {
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /python/i,
    /curl/i,
    /wget/i,
    /^$/,
  ];

  // Development ortamında daha esnek ol
  if (process.env.NODE_ENV === "development") {
    return false;
  }

  return suspiciousPatterns.some((pattern) => pattern.test(userAgent));
}

export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    // Yeni window başlat
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxRequests - 1, resetTime };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  // Count'u artır
  record.count++;
  rateLimitStore.set(identifier, record);

  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  [key: string]: unknown;
}

export function validateAndSanitizeFormData(data: FormData): {
  isValid: boolean;
  errors: string[];
  sanitizedData: {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };
} {
  const errors: string[] = [];
  const sanitizedData: {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  } = {};

  console.log("Validating form data:", {
    hasName: !!data.name,
    hasEmail: !!data.email,
    hasPhone: !!data.phone,
    hasSubject: !!data.subject,
    hasMessage: !!data.message,
    nameType: typeof data.name,
    emailType: typeof data.email,
    phoneType: typeof data.phone,
    subjectType: typeof data.subject,
    messageType: typeof data.message,
  });

  // Name validasyonu
  if (!data.name || typeof data.name !== "string") {
    errors.push("Ad soyad gereklidir");
  } else {
    const name = data.name.trim();
    if (name.length < 2 || name.length > 100) {
      errors.push("Ad soyad 2-100 karakter arasında olmalıdır");
    } else {
      sanitizedData.name = name;
    }
  }

  // Email validasyonu
  if (!data.email || typeof data.email !== "string") {
    errors.push("E-posta gereklidir");
  } else {
    const email = data.email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length < 5) {
      errors.push("Geçerli bir e-posta adresi giriniz");
    } else {
      sanitizedData.email = email;
    }
  }

  // Phone validasyonu (opsiyonel)
  if (data.phone && typeof data.phone === "string") {
    const phone = data.phone.trim();
    if (phone.length > 0) {
      if (phone.length < 10 || phone.length > 20) {
        errors.push("Telefon numarası 10-20 karakter arasında olmalıdır");
      } else {
        sanitizedData.phone = phone;
      }
    }
    // Boş string ise undefined olarak kaydet
    else {
      sanitizedData.phone = undefined;
    }
  } else if (!data.phone || data.phone === "") {
    // Phone field yok veya boş string ise undefined
    sanitizedData.phone = undefined;
  } else {
    errors.push("Telefon numarası geçerli bir metin olmalıdır");
  }

  // Subject validasyonu
  if (!data.subject || typeof data.subject !== "string") {
    errors.push("Konu seçimi gereklidir");
  } else {
    const subject = data.subject.trim();
    if (subject.length === 0) {
      errors.push("Konu seçimi gereklidir");
    } else {
      sanitizedData.subject = subject;
    }
  }

  // Message validasyonu
  if (!data.message || typeof data.message !== "string") {
    errors.push("Mesaj gereklidir");
  } else {
    const message = data.message.trim();
    if (message.length < 5 || message.length > 2000) {
      errors.push("Mesaj 5-2000 karakter arasında olmalıdır");
    } else {
      sanitizedData.message = message;
    }
  }

  console.log("Validation result:", {
    isValid: errors.length === 0,
    errors,
    sanitizedData,
  });

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData,
  };
}

// Clean up old rate limit entries (çağrılabilir bir utility)
export function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

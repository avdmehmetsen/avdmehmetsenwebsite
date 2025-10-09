# Renk Sistemi Kullanım Kılavuzu

Bu proje için merkezi renk yönetim sistemi `colors.ts` dosyasında tanımlanmıştır.

## Kullanım

### 1. JavaScript/TypeScript'te Kullanım

```typescript
import { colors } from "@/constants/colors";

// Inline style olarak
<div style={{ color: colors.primary.main }}>Metin</div>;

// Programatik olarak
const primaryColor = colors.primary.main; // #cb8929
```

### 2. Tailwind CSS ile Kullanım

```tsx
// Direkt renk değeri ile
<div className="text-[#cb8929]">Metin</div>
<div className="bg-[#cb8929]">Arka Plan</div>
<div className="border-[#cb8929]">Border</div>

// Veya colors dosyasından import ederek
import { colors } from '@/constants/colors';

<div style={{ color: colors.primary.main }}>Metin</div>
```

## Renk Paleti

### Ana Renkler (Primary)

- **main**: `#cb8929` - Ana altın/amber renk
- **light**: `#e5a645` - Açık ton
- **dark**: `#a67322` - Koyu ton
- **hover**: `#b77a24` - Hover durumu

### Arka Plan Renkleri (Background)

- **dark**: `#0f172a` (slate-900)
- **medium**: `#1e293b` (slate-800)
- **light**: `#334155` (slate-700)
- **white**: `#ffffff`
- **gray**: `#f9fafb` (gray-50)

### Metin Renkleri (Text)

- **primary**: `#0f172a` (slate-900)
- **secondary**: `#475569` (slate-600)
- **tertiary**: `#94a3b8` (slate-400)
- **light**: `#e2e8f0` (slate-200)
- **white**: `#ffffff`

### Durum Renkleri (Status)

- **success**: `#10b981` (green-500)
- **error**: `#ef4444` (red-500)
- **warning**: `#f59e0b` (amber-500)
- **info**: `#3b82f6` (blue-500)

### Border Renkleri

- **light**: `#e5e7eb` (gray-200)
- **medium**: `#d1d5db` (gray-300)
- **dark**: `#9ca3af` (gray-400)

### Overlay Renkleri

- **dark**: `rgba(15, 23, 42, 0.9)`
- **medium**: `rgba(15, 23, 42, 0.7)`
- **light**: `rgba(15, 23, 42, 0.5)`

## Örnekler

### Buton

```tsx
<button
  style={{ backgroundColor: colors.primary.main }}
  className="hover:bg-[#b77a24] text-white px-4 py-2 rounded"
>
  Tıkla
</button>
```

### Kart

```tsx
<div
  className="bg-white border-[#e5e7eb] rounded-lg p-6"
  style={{ borderColor: colors.border.light }}
>
  İçerik
</div>
```

### Hover Efekti

```tsx
<a
  href="#"
  className="transition-colors"
  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary.main)}
  onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.primary)}
>
  Link
</a>
```

## Renk Değiştirme

Tüm projedeki renkleri değiştirmek için sadece `colors.ts` dosyasındaki değerleri güncelleyin. Değişiklikler otomatik olarak tüm projeye yansıyacaktır.

## Yeni Renk Ekleme

`colors.ts` dosyasına yeni renk kategorisi eklemek için:

```typescript
export const colors = {
  // ... mevcut renkler

  // Yeni kategori
  custom: {
    primary: "#yourcolor",
    secondary: "#anothercolor",
  },
} as const;
```

# BAMK Frontend

Modern e-ticaret platformu için Next.js tabanlı frontend uygulaması.

## 🚀 Özellikler

- **Next.js 15** - Modern React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Query** - Server state yönetimi
- **Clean Architecture** - Temiz kod mimarisi
- **Repository Pattern** - Veri erişim katmanı
- **Responsive Design** - Mobil uyumlu tasarım

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build

# Production server'ı başlat
npm start
```

## 🏗️ Proje Yapısı

```
src/
├── app/                 # Next.js App Router
├── components/          # React component'leri
│   ├── ui/             # Temel UI component'leri
│   ├── layout/         # Layout component'leri
│   ├── product/        # Ürün component'leri
│   ├── cart/           # Sepet component'leri
│   ├── order/          # Sipariş component'leri
│   └── admin/          # Admin panel component'leri
├── hooks/              # Custom React hook'ları
├── lib/                # Utility fonksiyonları
├── store/              # Zustand store'ları
└── types/              # TypeScript type tanımları
```

## 🛠️ Teknolojiler

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Form Management**: React Hook Form + Zod
- **UI Components**: Radix UI
- **Icons**: Lucide React

## 📝 Geliştirme

### Code Style
- Clean Architecture prensipleri
- Repository Pattern kullanımı
- TypeScript strict mode
- ESLint kuralları

### Commit Convention
```
feat: yeni özellik
fix: bug düzeltmesi
docs: dokümantasyon
style: kod formatı
refactor: kod yeniden düzenleme
test: test ekleme
chore: build, config değişiklikleri
```

## 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

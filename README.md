# BAMK Frontend

Modern e-ticaret platformu için Next.js tabanlı frontend uygulaması.

## 📊 **Proje Durumu**
- **Durum:** 🟢 **MVP Tamamlandı** (85% tamamlandı)
- **Başlangıç:** 9 Eylül 2025
- **Son Güncelleme:** 12 Ocak 2025
- **Versiyon:** 1.1.0-MVP

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
NEXT_PUBLIC_API_URL=https://localhost:44318/api
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## ✅ **Tamamlanan Özellikler**

### **Ana Sayfa MVP**
- ✅ Hero section (gradient arka plan, arama çubuğu)
- ✅ İstatistik bölümü (4 adet istatistik kartı)
- ✅ Özellikler bölümü (4 adet özellik kartı)
- ✅ Öne çıkan ürünler (8 ürün kartı)
- ✅ Kategoriler önizleme (6 kategori kartı)
- ✅ Müşteri yorumları (6 yorum kartı)
- ✅ Newsletter bölümü

### **Sayfalar**
- ✅ Hakkımızda sayfası
- ✅ İletişim sayfası
- ✅ Giriş sayfası
- ✅ Kayıt sayfası
- ✅ Ürünler sayfası (filtreleme, sıralama)
- ✅ Kategoriler sayfası
- ✅ Ürün detay sayfası
- ✅ Sepet sayfası

### **Teknik Özellikler**
- ✅ Backend API entegrasyonu
- ✅ Sepet sistemi (frontend-only)
- ✅ Responsive tasarım
- ✅ Modern UI/UX (gradient, animasyonlar)
- ✅ TypeScript tip güvenliği
- ✅ Error handling

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

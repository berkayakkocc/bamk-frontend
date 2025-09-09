# Backend API Integration Guide

Bu dokümantasyon, BAMK frontend uygulamasının backend API ile entegrasyonunu açıklar.

## 🚀 Kurulum

### 1. Environment Variables

`.env.local` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_API_TIMEOUT=10000

# NextAuth Configuration (opsiyonel)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Environment
NODE_ENV=development
```

### 2. Backend Bağımlılıkları

Backend API'nin çalışması için gerekli paketler:

```bash
# Backend'de çalıştırın
npm install
npm run dev
```

## 📁 Proje Yapısı

```
src/
├── lib/
│   ├── api/
│   │   ├── services/          # API servisleri
│   │   │   ├── auth.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── order.service.ts
│   │   │   ├── cart.service.ts
│   │   │   ├── user.service.ts
│   │   │   └── index.ts
│   │   └── api-client.ts      # Axios konfigürasyonu
│   ├── config/
│   │   └── api.config.ts      # API konfigürasyonu
│   ├── providers/
│   │   └── query-provider.tsx # React Query provider
│   └── utils/
│       └── error-handler.ts   # Hata yönetimi
├── hooks/
│   └── index.ts               # Custom hooks
└── store/
    └── index.ts               # Zustand stores
```

## 🔧 API Servisleri

### AuthService

Kullanıcı kimlik doğrulama işlemleri:

```typescript
import { AuthService } from '@/lib/api/services';

// Giriş yapma
const response = await AuthService.login({
  email: 'user@example.com',
  password: 'password'
});

// Kayıt olma
const response = await AuthService.register({
  name: 'John Doe',
  email: 'user@example.com',
  password: 'password',
  confirmPassword: 'password'
});

// Profil güncelleme
const response = await AuthService.updateProfile({
  name: 'New Name'
});
```

### ProductService

Ürün yönetimi işlemleri:

```typescript
import { ProductService } from '@/lib/api/services';

// Ürünleri listeleme
const response = await ProductService.getProducts({
  page: 1,
  limit: 10,
  category: 'electronics',
  search: 'laptop'
});

// Tek ürün getirme
const response = await ProductService.getProduct('product-id');

// Kategorileri listeleme
const response = await ProductService.getCategories();
```

### OrderService

Sipariş yönetimi işlemleri:

```typescript
import { OrderService } from '@/lib/api/services';

// Sipariş oluşturma
const response = await OrderService.createOrder({
  items: [
    { productId: 'product-1', quantity: 2 }
  ],
  shippingAddress: { /* address data */ },
  billingAddress: { /* address data */ },
  paymentMethod: 'credit_card'
});

// Siparişleri listeleme
const response = await OrderService.getUserOrders({
  page: 1,
  limit: 10
});
```

### CartService

Sepet yönetimi işlemleri:

```typescript
import { CartService } from '@/lib/api/services';

// Sepete ürün ekleme
const response = await CartService.addToCart({
  productId: 'product-1',
  quantity: 2
});

// Sepeti getirme
const response = await CartService.getCart();

// Sepet özeti
const response = await CartService.getCartSummary();
```

## 🎣 React Hooks

### useAuth

Kimlik doğrulama hook'u:

```typescript
import { useAuth } from '@/hooks';

function LoginComponent() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    loginError 
  } = useAuth();

  const handleLogin = (credentials) => {
    login(credentials);
  };

  return (
    // JSX
  );
}
```

### useProducts

Ürün yönetimi hook'u:

```typescript
import { useProducts } from '@/hooks';

function ProductsPage() {
  const { 
    products, 
    categories, 
    isLoading, 
    error, 
    setFilters 
  } = useProducts({
    page: 1,
    limit: 12,
    category: 'electronics'
  });

  return (
    // JSX
  );
}
```

### useCart

Sepet yönetimi hook'u:

```typescript
import { useCart } from '@/hooks';

function CartComponent() {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    addToCart, 
    removeFromCart 
  } = useCart();

  return (
    // JSX
  );
}
```

## 🔄 State Management

### Zustand Stores

Uygulama durumu Zustand ile yönetilir:

- `useAuthStore`: Kullanıcı kimlik doğrulama durumu
- `useCartStore`: Sepet durumu
- `useProductStore`: Ürün ve kategori durumu
- `useUIStore`: UI durumu (sidebar, theme, toasts)

### React Query

Sunucu durumu React Query ile yönetilir:

- Otomatik cache yönetimi
- Background refetching
- Optimistic updates
- Error handling

## 🛠️ Hata Yönetimi

### ErrorHandler

Merkezi hata yönetimi:

```typescript
import { ErrorHandler } from '@/lib/utils/error-handler';

try {
  const response = await ProductService.getProducts();
} catch (error) {
  const errorMessage = ErrorHandler.handle(error);
  console.error(errorMessage);
  
  // Field-specific errors
  const fieldErrors = ErrorHandler.getFieldErrors(error);
}
```

### Toast Notifications

Kullanıcı bildirimleri:

```typescript
import { useUI } from '@/hooks';

function MyComponent() {
  const { showToast } = useUI();

  const handleSuccess = () => {
    showToast({
      type: 'success',
      title: 'Başarılı!',
      description: 'İşlem tamamlandı.'
    });
  };
}
```

## 🔒 Güvenlik

### Token Management

- JWT token'lar localStorage'da saklanır
- Otomatik token yenileme
- 401 hatalarında otomatik logout

### CORS Configuration

Next.js konfigürasyonunda CORS ayarları:

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: process.env.NEXT_PUBLIC_API_URL,
        },
        // ... diğer headers
      ],
    },
  ];
}
```

## 🧪 Test Etme

### API Test Endpoints

Backend API'nin çalıştığından emin olun:

```bash
# Health check
curl http://localhost:5000/api/health

# Products endpoint
curl http://localhost:5000/api/products

# Categories endpoint
curl http://localhost:5000/api/categories
```

### Frontend Test

```bash
# Development server'ı başlatın
npm run dev

# Tarayıcıda test edin
http://localhost:3000
```

## 📝 API Endpoints

### Authentication
- `POST /auth/login` - Giriş yapma
- `POST /auth/register` - Kayıt olma
- `POST /auth/logout` - Çıkış yapma
- `GET /auth/profile` - Profil getirme
- `PUT /auth/profile` - Profil güncelleme

### Products
- `GET /products` - Ürünleri listeleme
- `GET /products/:id` - Tek ürün getirme
- `GET /products/featured` - Öne çıkan ürünler
- `GET /categories` - Kategorileri listeleme

### Orders
- `GET /orders` - Siparişleri listeleme
- `POST /orders` - Sipariş oluşturma
- `GET /orders/:id` - Tek sipariş getirme
- `POST /orders/:id/cancel` - Sipariş iptal etme

### Cart
- `GET /cart` - Sepeti getirme
- `POST /cart/items` - Sepete ürün ekleme
- `PUT /cart/items/:id` - Sepet ürünü güncelleme
- `DELETE /cart/items/:id` - Sepetten ürün çıkarma

## 🚀 Deployment

### Environment Variables

Production ortamında gerekli environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_API_TIMEOUT=10000
NODE_ENV=production
```

### Build

```bash
npm run build
npm start
```

## 🔧 Troubleshooting

### Yaygın Sorunlar

1. **CORS Hatası**: Backend'de CORS ayarlarını kontrol edin
2. **Token Hatası**: localStorage'da token'ın varlığını kontrol edin
3. **Network Hatası**: Backend API'nin çalıştığından emin olun
4. **Timeout Hatası**: API_TIMEOUT değerini artırın

### Debug

```typescript
// API client'ı debug modunda çalıştırın
const apiClient = new ApiClient();
apiClient.client.defaults.timeout = 30000;
```

## 📚 Ek Kaynaklar

- [Axios Documentation](https://axios-http.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

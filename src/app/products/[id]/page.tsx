'use client';

import { Button, Card } from '@/components/ui';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  RefreshCw, 
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Share2,
  MessageCircle,
  CheckCircle,
  Clock,
  Award,
  Zap,
  Users,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Eye,
  ShoppingCart,
  CreditCard,
  Package,
  Truck as TruckIcon,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Download,
  Bookmark
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProducts } from '@/hooks';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { useProductDetail } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // API'den ürün detayını al
  const { data: product, isLoading, error } = useProductDetail(params.id as string);

  // Mock data - API'den veri gelene kadar
  const mockProduct = {
    id: params.id,
    name: "Premium Wireless Bluetooth Kulaklık",
    brand: "SoundMax",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.8,
    reviewCount: 1247,
    description: "Yüksek kaliteli ses deneyimi sunan premium wireless kulaklık. 30 saat pil ömrü, aktif gürültü engelleme ve su geçirmez tasarım ile her koşulda mükemmel ses kalitesi.",
    features: [
      "30 saat pil ömrü",
      "Aktif gürültü engelleme",
      "IPX7 su geçirmez",
      "Hızlı şarj (15 dk = 3 saat)",
      "Bluetooth 5.2",
      "Çoklu cihaz bağlantısı"
    ],
    specifications: {
      "Pil Ömrü": "30 saat",
      "Şarj Süresi": "2 saat",
      "Ağırlık": "250g",
      "Bağlantı": "Bluetooth 5.2",
      "Su Geçirmezlik": "IPX7",
      "Garanti": "2 yıl"
    },
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600", 
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    colors: [
      { name: "Siyah", value: "black", hex: "#000000" },
      { name: "Beyaz", value: "white", hex: "#FFFFFF" },
      { name: "Mavi", value: "blue", hex: "#3B82F6" },
      { name: "Kırmızı", value: "red", hex: "#EF4444" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 15,
    category: "Elektronik",
    tags: ["Bluetooth", "Kulaklık", "Wireless", "Premium"],
    shipping: {
      free: true,
      estimatedDays: "2-3 gün",
      returnDays: "14 gün"
    },
    reviews: [
      {
        id: 1,
        user: "Ahmet Y.",
        rating: 5,
        date: "2024-12-15",
        comment: "Harika bir ürün! Ses kalitesi mükemmel, pil ömrü de çok iyi. Kesinlikle tavsiye ederim.",
        verified: true,
        helpful: 23
      },
      {
        id: 2,
        user: "Elif K.",
        rating: 4,
        date: "2024-12-10",
        comment: "Genel olarak memnunum ama fiyat biraz yüksek. Kalite fiyatı karşılıyor.",
        verified: true,
        helpful: 15
      },
      {
        id: 3,
        user: "Mehmet D.",
        rating: 5,
        date: "2024-12-08",
        comment: "Çok rahat, uzun süre takıyorum hiç rahatsız etmiyor. Bluetooth bağlantısı da çok stabil.",
        verified: false,
        helpful: 8
      }
    ]
  };

  // API'den veri gelmediyse mock data kullan
  const currentProduct = product || mockProduct;

  const handleAddToCart = () => {
    // Sepete ekleme logic'i burada olacak
    console.log('Sepete eklendi:', { product: currentProduct, quantity, selectedSize, selectedColor });
  };

  const handleBuyNow = () => {
    // Hemen satın alma logic'i burada olacak
    console.log('Hemen satın al:', { product: currentProduct, quantity, selectedSize, selectedColor });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentProduct.name,
        text: currentProduct.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ürün yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Aradığınız ürün bulunamadı veya kaldırılmış olabilir.</p>
          <Button 
            onClick={() => router.push('/products')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full"
          >
            Ürünlere Dön
          </Button>
        </div>
      </div>
    );
  }

  // Product not found
  if (!currentProduct) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600 transition-colors">Ana Sayfa</Link>
            <ArrowRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-purple-600 transition-colors">Ürünler</Link>
            <ArrowRight className="h-4 w-4" />
            <Link href={`/products?category=${currentProduct.category}`} className="hover:text-purple-600 transition-colors">{currentProduct.category}</Link>
            <ArrowRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{currentProduct.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="aspect-square relative">
                  <img
                    src={currentProduct.images[selectedImage]}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => setShowImageModal(true)}
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={handleWishlist}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        isWishlisted 
                          ? 'bg-red-500 text-white shadow-lg' 
                          : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 bg-white/90 text-gray-600 hover:bg-purple-500 hover:text-white rounded-full transition-all duration-300"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      %{product.discount} İndirim
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-purple-500 shadow-lg' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Name */}
            <div>
              <p className="text-purple-600 font-semibold text-lg mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`} />
                ))}
                <span className="text-lg font-semibold text-gray-900 ml-2">{product.rating}</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="text-gray-600">{product.reviewCount} değerlendirme</span>
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="text-green-600 font-semibold">{product.stock} stokta</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-purple-600">₺{product.price.toLocaleString()}</span>
              <span className="text-2xl text-gray-500 line-through">₺{product.originalPrice.toLocaleString()}</span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                %{product.discount} indirim
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Özellikler</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Renk</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      selectedColor === color.value 
                        ? 'border-purple-500 shadow-lg scale-110' 
                        : 'border-gray-300 hover:border-purple-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Beden</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 flex items-center justify-center font-semibold ${
                      selectedSize === size 
                        ? 'border-purple-500 bg-purple-500 text-white shadow-lg' 
                        : 'border-gray-300 hover:border-purple-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Adet</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Sepete Ekle
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Hemen Satın Al
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Teslimat Bilgileri</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Ücretsiz kargo (150 TL üzeri)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Tahmini teslimat: {product.shipping.estimatedDays}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RefreshCw className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-700">14 gün içinde ücretsiz iade</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">2 yıl garantili</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Specifications */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Teknik Özellikler</h3>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-semibold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Müşteri Yorumları</h3>
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900">{review.user}</span>
                            {review.verified && (
                              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                                Doğrulanmış Alıcı
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`} />
                            ))}
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="text-sm">{review.helpful}</span>
                          </button>
                          <button className="text-gray-500 hover:text-red-600 transition-colors">
                            <Flag className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
                <Button className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl">
                  Tüm Yorumları Gör
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Benzer Ürünler</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center">
                    <ShoppingBag className="h-16 w-16 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Benzer Ürün {item}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-purple-600">₺{999 + item * 100}</span>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-full text-sm">
                        <ShoppingBag className="mr-1 h-4 w-4" />
                        Sepete Ekle
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

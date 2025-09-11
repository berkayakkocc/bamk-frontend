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
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // API'den ürün detayını al
  const { data: product, isLoading, error } = useProducts().useProductDetail(params.id as string);

  // API'den veri gelmediyse mock data kullan
  const currentProduct = product;

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
    if (currentProduct && navigator.share) {
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
                  {currentProduct.images && currentProduct.images.length > 0 ? (
                    <img
                      src={currentProduct.images[0]}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <ShoppingBag className="h-20 w-20 text-gray-400" />
                    </div>
                  )}
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
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Name */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {currentProduct.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-purple-600">₺{currentProduct.price?.toLocaleString() || '0'}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">{currentProduct.description || 'Ürün açıklaması bulunmuyor.'}</p>

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
                  <span className="text-gray-700">Tahmini teslimat: 2-3 gün</span>
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
      </div>
    </div>
  );
}

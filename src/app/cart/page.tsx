'use client';

import { useCart, useUI } from '@/hooks';
import { Button, Card } from '@/components/ui';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart 
  } = useCart();
  const { showToast } = useUI();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      showToast({
        type: 'info',
        title: 'Ürün sepetten kaldırıldı',
        description: 'Ürün sepetinizden kaldırıldı.'
      });
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    showToast({
      type: 'info',
      title: 'Ürün kaldırıldı',
      description: `${productName} sepetten kaldırıldı.`
    });
  };

  const handleClearCart = () => {
    clearCart();
    showToast({
      type: 'info',
      title: 'Sepet temizlendi',
      description: 'Tüm ürünler sepetten kaldırıldı.'
    });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      showToast({
        type: 'success',
        title: 'Sipariş oluşturuldu!',
        description: 'Siparişiniz başarıyla oluşturuldu. En kısa sürede kargoya verilecek.'
      });
      clearCart();
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link href="/products" className="mr-4">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ürünlere Dön
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">
              Sepetim <span className="text-purple-600">({totalItems})</span>
            </h1>
          </div>

          {/* Empty Cart */}
          <div className="text-center py-20">
            <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
              <p className="text-gray-600 mb-6">Henüz sepetinize ürün eklemediniz.</p>
              <Link href="/products">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full">
                  Alışverişe Başla
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/products" className="mr-4">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ürünlere Dön
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">
              Sepetim <span className="text-purple-600">({totalItems})</span>
            </h1>
          </div>
          <Button 
            onClick={handleClearCart}
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Sepeti Temizle
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
                <div className="flex items-center space-x-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {item.product.images && item.product.images.length > 0 && !item.product.images[0].includes('placeholder') ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
                        <div className="text-center">
                          <div className={`w-12 h-12 rounded-full mx-auto mb-1 flex items-center justify-center text-white font-bold text-lg ${
                            item.product.category?.name === 'Kırmızı' ? 'bg-red-500' :
                            item.product.category?.name === 'Siyah' ? 'bg-gray-800' :
                            item.product.category?.name === 'Beyaz' ? 'bg-white text-gray-800' :
                            item.product.category?.name === 'Mavi' ? 'bg-blue-500' :
                            item.product.category?.name === 'Yeşil' ? 'bg-green-500' :
                            'bg-purple-500'
                          }`}>
                            {item.product.name.charAt(0)}
                          </div>
                          <div className="text-xs text-gray-600 font-medium">
                            {item.product.category?.name || 'T-Shirt'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.product.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-bold text-purple-600">
                        ₺{item.product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₺{(item.product.price * 1.2).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-3 bg-gray-100 rounded-full p-1">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white rounded-3xl shadow-xl border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Ürünler ({totalItems} adet)</span>
                  <span>₺{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Kargo</span>
                  <span className="text-green-600 font-semibold">Ücretsiz</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>KDV</span>
                  <span>₺{(totalPrice * 0.18).toLocaleString()}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Toplam</span>
                  <span>₺{(totalPrice * 1.18).toLocaleString()}</span>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-bold rounded-full mb-4"
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sipariş Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Siparişi Tamamla
                  </>
                )}
              </Button>

              {/* Trust Badges */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 text-green-500 mr-2" />
                  <span>Ücretsiz Kargo</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-blue-500 mr-2" />
                  <span>Güvenli Ödeme</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Hızlı Teslimat</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

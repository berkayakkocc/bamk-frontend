'use client';

import { Button } from '@/components/ui';
import { APIStatus } from '@/components/test/APIStatus';
import { useProducts } from '@/hooks';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Star, 
  Truck, 
  Shield, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Award,
  Zap,
  Heart,
  TrendingUp,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  // const { products, isLoading, categories } = useProducts({ limit: 8 });
  const [searchQuery, setSearchQuery] = useState('');
  const products = [];
  const isLoading = false;
  const categories = [];

  return (
    <>
      {/* Hero Section - 10/10 */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-24 overflow-hidden" style={{minHeight: '500px'}}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              BAMK'a Hoş Geldiniz
            </h1>
            <p className="text-xl md:text-3xl mb-8 text-purple-100 font-light leading-relaxed">
              Kaliteli ürünler, uygun fiyatlar ve hızlı teslimat ile
              <span className="block text-2xl md:text-4xl font-bold text-yellow-300 mt-2">
                Alışveriş Deneyiminizi Yeniden Tanımlayın
              </span>
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Ne arıyorsunuz? Ürün, kategori veya marka..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-full border-0 shadow-2xl focus:ring-4 focus:ring-purple-300 focus:outline-none text-gray-900"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 rounded-full px-6">
                  Ara
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <ShoppingBag className="mr-2 h-6 w-6" />
                  Alışverişe Başla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                  <Grid3X3 className="mr-2 h-5 w-5" />
                  Kategorileri Keşfet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* API Status Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <APIStatus />
        </div>
      </section>

      {/* Stats Section - 10/10 */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
              <p className="text-gray-600 font-medium">Mutlu Müşteri</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ShoppingBag className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600 font-medium">Ürün Çeşidi</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600 font-medium">Hızlı Teslimat</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9</h3>
              <p className="text-gray-600 font-medium">Müşteri Puanı</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 10/10 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden BAMK'ı Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Müşteri memnuniyetini ön planda tutan, kaliteli hizmet anlayışımızla fark yaratıyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hızlı Teslimat</h3>
              <p className="text-gray-600 leading-relaxed">Aynı gün teslimat imkanı ile siparişlerinizi hızla alın</p>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Güvenli Alışveriş</h3>
              <p className="text-gray-600 leading-relaxed">SSL sertifikası ile korumalı, güvenli ödeme sistemi</p>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <RefreshCw className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kolay İade</h3>
              <p className="text-gray-600 leading-relaxed">30 gün içinde ücretsiz iade ve değişim garantisi</p>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kaliteli Ürünler</h3>
              <p className="text-gray-600 leading-relaxed">Sadece kaliteli markalar ve orijinal ürünler</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - 10/10 */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En popüler ve yeni ürünlerimizi keşfedin, kaliteli alışveriş deneyimi yaşayın
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-20 bg-gray-200 rounded"></div>
                      <div className="h-8 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product, index) => (
                <div key={product.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
                    <ShoppingBag className="h-16 w-16 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors">
                        <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Yeni
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                      </div>
                      <span className="text-sm text-gray-500">Stokta</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-purple-600">
                          ₺{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₺{(product.price * 1.2).toLocaleString()}
                        </span>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                        Sepete Ekle
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                Tüm Ürünleri Gör
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section - 10/10 */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Bültenimize Abone Olun
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-purple-100 leading-relaxed">
              Yeni ürünler, özel kampanyalar ve indirim fırsatlarından haberdar olun
              <span className="block text-lg mt-2 text-yellow-300">
                İlk abone olanlara %20 indirim!
              </span>
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    className="w-full px-6 py-4 text-lg rounded-full border-0 shadow-2xl focus:ring-4 focus:ring-purple-300 focus:outline-none text-gray-900 placeholder-gray-500"
                  />
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Abone Ol
                </Button>
              </div>
              
              <div className="mt-8 flex items-center justify-center space-x-8 text-purple-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Spam yok</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>İstediğiniz zaman çıkış</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Özel fırsatlar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

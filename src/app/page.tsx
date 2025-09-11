'use client';

import { Button } from '@/components/ui';
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
  Mail,
  Gift,
  List,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const { products, isLoading, categories } = useProducts({ limit: 8 });
  
  // Debug için console.log ekleyelim
  console.log('Home - products:', products);
  console.log('Home - isLoading:', isLoading);
  console.log('Home - categories:', categories);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Ana Başlık */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              BAMK'a Hoş Geldiniz
            </h1>
            
            {/* Alt Başlık */}
            <p className="text-2xl md:text-4xl mb-12 text-purple-100 font-light leading-relaxed">
              Kaliteli ürünler, uygun fiyatlar ve hızlı teslimat ile
              <span className="block text-3xl md:text-5xl font-bold text-yellow-300 mt-4">
                Alışveriş Deneyiminizi Yeniden Tanımlayın
              </span>
            </p>
            
            {/* Arama Çubuğu */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="text"
                  placeholder="Ne arıyorsunuz? Ürün, kategori veya marka..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-32 py-6 text-xl rounded-full border-0 shadow-2xl focus:ring-4 focus:ring-purple-300 focus:outline-none text-gray-900 placeholder-gray-500"
                />
                <Button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-3 text-lg font-semibold">
                  Ara
                </Button>
              </div>
            </div>

            {/* CTA Butonları */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products" prefetch={true}>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <ShoppingBag className="mr-3 h-7 w-7" />
                  Alışverişe Başla
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/categories" prefetch={true}>
                <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-5 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105">
                  <Grid3X3 className="mr-3 h-6 w-6" />
                  Kategorileri Keşfet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Rakamlarla BAMK
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Müşteri memnuniyetini ön planda tutan, kaliteli hizmet anlayışımızla fark yaratıyoruz
            </p>
        </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mutlu Müşteri */}
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">50K+</h3>
              <p className="text-lg text-gray-600 font-semibold">Mutlu Müşteri</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>

            {/* Ürün Çeşidi */}
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">10K+</h3>
              <p className="text-lg text-gray-600 font-semibold">Ürün Çeşidi</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </div>

            {/* Hızlı Teslimat */}
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">24/7</h3>
              <p className="text-lg text-gray-600 font-semibold">Hızlı Teslimat</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            </div>

            {/* Müşteri Puanı */}
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Award className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">4.9</h3>
              <p className="text-lg text-gray-600 font-semibold">Müşteri Puanı</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Neden <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">BAMK</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Müşteri memnuniyetini ön planda tutan, kaliteli hizmet anlayışımızla fark yaratıyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hızlı Teslimat */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Hızlı Teslimat</h3>
                <p className="text-gray-600 leading-relaxed text-lg">Aynı gün teslimat imkanı ile siparişlerinizi hızla alın</p>
                <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              </div>
            </div>
            
            {/* Güvenli Alışveriş */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">Güvenli Alışveriş</h3>
                <p className="text-gray-600 leading-relaxed text-lg">SSL sertifikası ile korumalı, güvenli ödeme sistemi</p>
                <div className="mt-6 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
              </div>
            </div>
            
            {/* Kolay İade */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <RefreshCw className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">Kolay İade</h3>
                <p className="text-gray-600 leading-relaxed text-lg">30 gün içinde ücretsiz iade ve değişim garantisi</p>
                <div className="mt-6 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
              </div>
            </div>
            
            {/* Kaliteli Ürünler */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">Kaliteli Ürünler</h3>
                <p className="text-gray-600 leading-relaxed text-lg">Sadece kaliteli markalar ve orijinal ürünler</p>
                <div className="mt-6 h-1 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Öne Çıkan <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Ürünler</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
              {Array.isArray(products) ? products.slice(0, 8).map((product: any, index: number) => (
                <Link key={product.id} href={`/products/${product.id}`} prefetch={true}>
                  <div className="group relative cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                      <div className="relative aspect-square bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center overflow-hidden">
                        <ShoppingBag className="h-20 w-20 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-4 right-4">
                          <button className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110">
                        <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        Yeni
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                        <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                            <span className="text-sm text-gray-500 ml-1 font-medium">(4.8)</span>
                      </div>
                          <span className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">Stokta</span>
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
                          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Sepete Ekle
                          </Button>
                        </div>
                      </div>
                    </div>
                </div>
              </Link>
            )) : null}
            </div>
          )}

          <div className="text-center mt-20">
            <Link href="/products" prefetch={true}>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-5 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <ShoppingBag className="mr-3 h-6 w-6" />
                Tüm Ürünleri Gör
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Preview Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Popüler <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Kategoriler</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Aradığınız ürünleri kolayca bulun, hızlı alışveriş yapın
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Elektronik */}
            <Link href="/categories/elektronik" prefetch={true} className="group">
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Elektronik</h3>
                  <p className="text-sm text-gray-600 mb-3">Telefon, Laptop</p>
                  <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">1,250 ürün</span>
                </div>
              </div>
            </Link>

            {/* Giyim */}
            <Link href="/categories/giyim" prefetch={true} className="group">
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ShoppingBag className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">Giyim</h3>
                  <p className="text-sm text-gray-600 mb-3">Erkek, Kadın</p>
                  <span className="text-xs text-pink-600 font-semibold bg-pink-50 px-3 py-1 rounded-full">890 ürün</span>
                </div>
              </div>
            </Link>

            {/* Ev & Yaşam */}
            <Link href="/categories/ev-yasam" prefetch={true} className="group">
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">Ev & Yaşam</h3>
                  <p className="text-sm text-gray-600 mb-3">Dekorasyon</p>
                  <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">650 ürün</span>
                </div>
              </div>
            </Link>

            {/* Spor */}
            <Link href="/categories/spor" prefetch={true} className="group">
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">Spor</h3>
                  <p className="text-sm text-gray-600 mb-3">Fitness, Outdoor</p>
                  <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-3 py-1 rounded-full">420 ürün</span>
                </div>
              </div>
            </Link>

            {/* Kitap */}
            <Link href="/categories/kitap" prefetch={true} className="group">
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">Kitap</h3>
                  <p className="text-sm text-gray-600 mb-3">Edebiyat, Akademik</p>
                  <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">1,800 ürün</span>
                </div>
              </div>
            </Link>

            {/* Kozmetik */}
            <Link href="/categories/kozmetik" prefetch={true} className="group">
              <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">Kozmetik</h3>
                  <p className="text-sm text-gray-600 mb-3">Makyaj, Bakım</p>
                  <span className="text-xs text-yellow-600 font-semibold bg-yellow-50 px-3 py-1 rounded-full">750 ürün</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-16">
            <Link href="/categories" prefetch={true}>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-5 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <Grid3X3 className="mr-3 h-6 w-6" />
                Tüm Kategorileri Gör
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Müşterilerimiz <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Ne Diyor?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Binlerce mutlu müşterimizin deneyimlerini keşfedin
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">Ayşe Kaya</h4>
                    <p className="text-gray-600">İstanbul</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  "BAMK'tan alışveriş yapmak gerçekten harika bir deneyim. Ürünler kaliteli, teslimat hızlı ve müşteri hizmetleri çok yardımcı. Kesinlikle tavsiye ederim!"
                </p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">Mehmet Demir</h4>
                    <p className="text-gray-600">Ankara</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  "Fiyatlar çok uygun ve ürün çeşitliliği harika. Aradığım her şeyi bulabiliyorum. Özellikle elektronik ürünlerde çok başarılılar."
                </p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    E
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">Elif Özkan</h4>
                    <p className="text-gray-600">İzmir</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  "Müşteri hizmetleri gerçekten 7/24 destek veriyor. Bir sorunum olduğunda hemen çözdüler. Bu kadar ilgili bir ekip görmemiştim."
                </p>
              </div>
            </div>

            {/* Review 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    C
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">Can Yılmaz</h4>
                    <p className="text-gray-600">Bursa</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  "Teslimat gerçekten hızlı! Sipariş verdiğim gün elime ulaştı. Paketleme de çok düzgün. Artık sadece BAMK'tan alışveriş yapıyorum."
                </p>
              </div>
            </div>

            {/* Review 5 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">Selin Arslan</h4>
                    <p className="text-gray-600">Antalya</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  "Ürün kalitesi gerçekten yüksek. Aldığım hiçbir ürünle ilgili sorun yaşamadım. Fiyat-performans oranı mükemmel."
                </p>
              </div>
            </div>

            {/* Review 6 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    O
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">Oğuz Kılıç</h4>
                    <p className="text-gray-600">Adana</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  "Web sitesi çok kullanıcı dostu. Aradığım ürünleri kolayca bulabiliyorum. Ödeme süreci de çok güvenli ve hızlı."
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg">
              <Star className="h-6 w-6 fill-current" />
              <span>4.9/5 Ortalama Müşteri Puanı</span>
              <span className="text-purple-200">•</span>
              <span>2,500+ Değerlendirme</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Bültenimize <span className="block">Abone Olun</span>
            </h2>
            <p className="text-2xl md:text-3xl mb-16 text-purple-100 leading-relaxed max-w-4xl mx-auto">
              Yeni ürünler, özel kampanyalar ve indirim fırsatlarından haberdar olun
              <span className="block text-2xl mt-4 text-yellow-300 font-bold">
                🎉 İlk abone olanlara %20 indirim!
              </span>
            </p>
            
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    className="w-full px-8 py-6 text-xl rounded-full border-0 shadow-2xl focus:ring-4 focus:ring-purple-300 focus:outline-none text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <Mail className="mr-3 h-6 w-6" />
                  Abone Ol
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-purple-200">
                <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                  <span className="text-lg font-semibold">Spam Yok</span>
                  <span className="text-sm text-center">Sadece değerli içerikler</span>
                </div>
                <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-green-400" />
                  <span className="text-lg font-semibold">Güvenli</span>
                  <span className="text-sm text-center">İstediğiniz zaman çıkış</span>
                </div>
                <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Gift className="h-8 w-8 text-green-400" />
                  <span className="text-lg font-semibold">Özel Fırsatlar</span>
                  <span className="text-sm text-center">Sadece aboneler için</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

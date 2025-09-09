import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { APIStatus } from '@/components/test/APIStatus';
import { useProducts } from '@/hooks';
import Link from 'next/link';
import { ShoppingBag, Star, Truck, Shield, RefreshCw } from 'lucide-react';

export default function Home() {
  const { products, isLoading } = useProducts({ limit: 8 });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            BAMK'a Hoş Geldiniz
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Kaliteli ürünler, uygun fiyatlar ve hızlı teslimat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Alışverişe Başla
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Hakkımızda
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* API Status Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <APIStatus />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-600">Aynı gün teslimat imkanı</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Güvenli Alışveriş</h3>
              <p className="text-gray-600">SSL sertifikası ile korumalı</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Kolay İade</h3>
              <p className="text-gray-600">30 gün içinde iade garantisi</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Kaliteli Ürünler</h3>
              <p className="text-gray-600">Sadece kaliteli markalar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-gray-600">En popüler ve yeni ürünlerimizi keşfedin</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        ₺{product.price.toLocaleString()}
                      </span>
                      <Button size="sm">Sepete Ekle</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg">Tüm Ürünleri Gör</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bültenimize Abone Olun</h2>
          <p className="text-xl mb-8 text-blue-100">
            Yeni ürünler ve özel kampanyalardan haberdar olun
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Abone Ol
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

'use client';

import { useProducts } from '@/hooks';
import { Card, Button } from '@/components/ui';
import { 
  Loader2, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingBag,
  ArrowRight,
  SlidersHorizontal,
  SortAsc,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function ProductsPage() {
  const { products, categories, isLoading, error, setSearchQuery, setSelectedCategory } = useProducts();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSearchQuery('');
    setSelectedCategory(null);
    setPriceRange([0, 10000]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-20">
            <div className="inline-flex items-center space-x-3 bg-white px-8 py-6 rounded-2xl shadow-lg">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <span className="text-xl font-semibold text-gray-700">Ürünler yükleniyor...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-20">
            <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md mx-auto">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="h-10 w-10 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Hata Oluştu</h1>
              <p className="text-gray-600 mb-6">Ürünler yüklenirken bir hata oluştu.</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-full"
              >
                Tekrar Dene
              </Button>
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
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Tüm <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Ürünler</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Binlerce kaliteli ürünümüz arasından istediğinizi keşfedin ve bulun
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type="text"
                placeholder="Ne arıyorsunuz? Ürün, kategori veya marka..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-4 text-lg border-0 rounded-full shadow-lg focus:ring-4 focus:ring-purple-300 focus:outline-none bg-gray-50"
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Search className="mr-2 h-5 w-5" />
              Ara
            </Button>
          </form>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryFilter(null)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
              Tümü
            </button>
            {categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode and Results Count */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-2 bg-white rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-lg">
              <span className="text-lg font-semibold text-gray-700">
                {products?.length || 0} ürün bulundu
              </span>
            </div>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-2xl font-semibold"
            >
              <X className="mr-2 h-4 w-4" />
              Filtreleri Temizle
            </Button>
          </div>
        </div>

        {/* Products Grid/List */}
        {products && products.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
          }>
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="group relative cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className={`relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 ${
                    viewMode === 'list' ? 'flex items-center' : ''
                  }`}>
                    <div className={`relative aspect-square bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center overflow-hidden ${
                      viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : ''
                    }`}>
                      <ShoppingBag className="h-16 w-16 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-4 right-4">
                        <button className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110">
                          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                        </button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          Yeni
                        </span>
                      </div>
                    </div>
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="text-sm text-gray-500 ml-1 font-medium">(4.8)</span>
                        </div>
                        <span className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                          {product.stock > 0 ? 'Stokta' : 'Stokta Yok'}
                        </span>
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
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Sepete Ekle
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h3>
              <p className="text-gray-600 mb-6">Arama kriterlerinize uygun ürün bulunamadı.</p>
              <Button 
                onClick={clearFilters}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full"
              >
                Filtreleri Temizle
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useProducts } from '@/hooks';
import { Card, Button } from '@/components/ui';
import { 
  Loader2, 
  Grid, 
  List, 
  Search, 
  Filter, 
  SortAsc, 
  Star, 
  ShoppingBag, 
  ArrowRight,
  ChevronDown,
  Heart,
  Eye,
  TrendingUp,
  Award,
  Zap,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
  const { categories, isLoading, error } = useProducts();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'products' | 'popular'>('name');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort categories
  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'products':
        return (b.productCount || 0) - (a.productCount || 0);
      case 'popular':
        return (b.productCount || 0) - (a.productCount || 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-20">
            <div className="inline-flex items-center space-x-3 bg-white px-8 py-6 rounded-2xl shadow-lg">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <span className="text-xl font-semibold text-gray-700">Kategoriler yükleniyor...</span>
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
                <Award className="h-10 w-10 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Hata Oluştu</h1>
              <p className="text-gray-600 mb-6">Kategoriler yüklenirken bir hata oluştu.</p>
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
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Tüm <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Kategoriler</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tüm ürün kategorilerini keşfedin ve istediğiniz ürünleri kolayca bulun
            <span className="block text-lg mt-2 text-purple-600 font-semibold">
              {sortedCategories.length} kategori mevcut
            </span>
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type="text"
                placeholder="Kategori ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-4 text-lg border-0 rounded-full shadow-lg focus:ring-4 focus:ring-purple-300 focus:outline-none bg-gray-50"
              />
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'products' | 'popular')}
                className="appearance-none bg-gray-50 border-0 rounded-full px-6 py-4 pr-10 text-gray-700 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg text-lg"
              >
                <option value="name">İsme Göre</option>
                <option value="products">Ürün Sayısına Göre</option>
                <option value="popular">Popülerliğe Göre</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-50 rounded-2xl p-2 shadow-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:bg-white hover:scale-105'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:bg-white hover:scale-105'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>


        {/* Categories Grid/List */}
        {sortedCategories.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
          }>
            {sortedCategories.map((category, index) => (
              <Link href={`/products?category=${category.id}`} key={category.id}>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className={`relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 ${
                    viewMode === 'list' ? 'flex items-center' : ''
                  }`}>
                    <div className={`relative aspect-square bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center overflow-hidden ${
                      viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : ''
                    }`}>
                      <ShoppingBag className="h-16 w-16 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          {category.productCount || 0} ürün
                        </span>
                      </div>
                    </div>
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {category.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-500 ml-1 font-medium">(4.8)</span>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          category.isActive 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {category.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ShoppingBag className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-gray-600 font-medium">
                            {category.productCount || 0} ürün
                          </span>
                        </div>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                          <ArrowRight className="mr-1 h-4 w-4" />
                          Keşfet
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
                <Grid className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {searchQuery ? 'Arama Sonucu Bulunamadı' : 'Kategori Bulunamadı'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `"${searchQuery}" için kategori bulunamadı. Farklı bir arama terimi deneyin.`
                  : 'Henüz hiç kategori eklenmemiş. Yeni kategoriler eklendiğinde burada görünecek.'
                }
              </p>
              {searchQuery && (
                <Button 
                  onClick={() => setSearchQuery('')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full"
                >
                  Aramayı Temizle
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

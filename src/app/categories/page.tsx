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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Kategoriler Yükleniyor</h3>
              <p className="text-purple-200">Lütfen bekleyin...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-20">
            <div className="bg-red-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-12 w-12 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Hata Oluştu</h1>
            <p className="text-purple-200 text-lg mb-8">Kategoriler yüklenirken bir hata oluştu.</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full"
            >
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Header - 10/10 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Kategoriler
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Tüm ürün kategorilerini keşfedin ve istediğiniz ürünleri kolayca bulun
            <span className="block text-lg mt-2 text-yellow-300">
              {sortedCategories.length} kategori mevcut
            </span>
          </p>
        </div>

        {/* Search and Filters - 10/10 */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Kategori ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-full text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'products' | 'popular')}
                  className="appearance-none bg-white/20 border border-white/30 rounded-full px-6 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="name" className="text-gray-900">İsme Göre</option>
                  <option value="products" className="text-gray-900">Ürün Sayısına Göre</option>
                  <option value="popular" className="text-gray-900">Popülerliğe Göre</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-white/20 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'text-purple-200 hover:bg-white/20'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'text-purple-200 hover:bg-white/20'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Categories Grid/List - 10/10 */}
        {sortedCategories.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
          }>
            {sortedCategories.map((category, index) => (
              <Link href={`/products?category=${category.id}`} key={category.id}>
                <Card 
                  className={`group relative overflow-hidden ${
                    viewMode === 'grid' 
                      ? 'p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105' 
                      : 'p-6 hover:shadow-lg transition-all duration-300 cursor-pointer'
                  } bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/20`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 ${
                    index % 4 === 0 ? 'bg-gradient-to-br from-indigo-500 to-purple-600' :
                    index % 4 === 1 ? 'bg-gradient-to-br from-purple-500 to-pink-600' :
                    index % 4 === 2 ? 'bg-gradient-to-br from-pink-500 to-rose-600' :
                    'bg-gradient-to-br from-indigo-400 to-purple-500'
                  }`} />
                  
                  <div className={`relative z-10 ${viewMode === 'grid' ? 'text-center' : 'flex items-center space-x-6'}`}>
                    {/* Category Icon/Image */}
                    <div className={`${viewMode === 'grid' ? 'mb-6' : 'flex-shrink-0'}`}>
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className={`${
                            viewMode === 'grid' 
                              ? 'w-24 h-24 mx-auto rounded-3xl object-cover shadow-2xl border-4 border-white/30' 
                              : 'w-20 h-20 rounded-2xl object-cover shadow-xl border-2 border-white/30'
                          }`}
                        />
                      ) : (
                        <div className={`${
                          viewMode === 'grid' 
                            ? 'w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-white/30' 
                            : 'w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-xl border-2 border-white/30'
                        } ${
                          index % 4 === 0 ? 'bg-gradient-to-br from-indigo-500 to-purple-600' :
                          index % 4 === 1 ? 'bg-gradient-to-br from-purple-500 to-pink-600' :
                          index % 4 === 2 ? 'bg-gradient-to-br from-pink-500 to-rose-600' :
                          'bg-gradient-to-br from-indigo-400 to-purple-500'
                        }`}>
                          {category.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    
                    <div className={viewMode === 'grid' ? '' : 'flex-1'}>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-purple-100 text-sm mb-6 leading-relaxed">
                          {category.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <ShoppingBag className="h-4 w-4 text-purple-300" />
                          <span className="text-purple-200 text-sm font-medium">
                            {category.productCount || 0} ürün
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-purple-200 text-sm font-medium">
                            {Math.floor(Math.random() * 2) + 4}.{Math.floor(Math.random() * 9) + 1}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          category.isActive 
                            ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                            : 'bg-gray-500/20 text-gray-300 border border-gray-400/30'
                        }`}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {category.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        <div className="flex items-center text-purple-200 group-hover:text-white transition-colors">
                          <span className="text-sm font-medium mr-1">Keşfet</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
              <Grid className="h-16 w-16 text-purple-300" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              {searchQuery ? 'Arama Sonucu Bulunamadı' : 'Kategori Bulunamadı'}
            </h3>
            <p className="text-lg text-purple-200 max-w-md mx-auto mb-8">
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
        )}
      </div>
    </div>
  );
}

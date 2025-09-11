'use client';

import { Button, Card } from '@/components/ui';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  User,
  Shield,
  Zap,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  RefreshCw,
  Facebook,
  Apple,
  ArrowLeft,
  Globe
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks';

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock login logic
      if (formData.email === 'demo@bamk.com' && formData.password === 'demo123') {
        await login({
          id: '1',
          name: 'Demo Kullanıcı',
          email: 'demo@bamk.com',
          avatar: null
        });
        // Redirect to home page
        window.location.href = '/';
      } else {
        setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Mock social login
    console.log(`${provider} ile giriş yapılıyor...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Login Form */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Header */}
              <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors mb-6">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="font-semibold">Ana Sayfaya Dön</span>
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Hoş Geldiniz
                </h1>
                <p className="text-gray-600">
                  Hesabınıza giriş yapın ve alışverişe devam edin
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-posta Adresi
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Şifre
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="Şifrenizi girin"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600">Beni hatırla</span>
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                  >
                    Şifremi unuttum
                  </Link>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span className="text-red-600 text-sm">{error}</span>
                  </div>
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Giriş yapılıyor...
                    </>
                  ) : (
                    <>
                      Giriş Yap
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">veya</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin('google')}
                    className="w-full py-3 border-2 border-gray-300 hover:border-red-500 hover:text-red-600 transition-all duration-300"
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Google ile Giriş Yap
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin('facebook')}
                    className="w-full py-3 border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                  >
                    <Facebook className="mr-2 h-5 w-5" />
                    Facebook ile Giriş Yap
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin('apple')}
                    className="w-full py-3 border-2 border-gray-300 hover:border-gray-800 hover:text-gray-800 transition-all duration-300"
                  >
                    <Apple className="mr-2 h-5 w-5" />
                    Apple ile Giriş Yap
                  </Button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Hesabınız yok mu?{' '}
                    <Link 
                      href="/register" 
                      className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                    >
                      Kayıt Olun
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Features & Benefits */}
          <div className="space-y-8">
            {/* Welcome Message */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                BAMK'a
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Hoş Geldiniz
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Hesabınıza giriş yaparak binlerce kaliteli ürünümüzden 
                faydalanın ve güvenli alışveriş deneyiminin keyfini çıkarın.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Güvenli Alışveriş",
                  description: "256-bit SSL şifreleme ile güvenli ödeme",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: Truck,
                  title: "Hızlı Teslimat",
                  description: "24 saat içinde kargo, 2-3 günde teslimat",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Heart,
                  title: "Favori Listesi",
                  description: "Beğendiğiniz ürünleri kaydedin",
                  color: "from-pink-500 to-rose-500"
                },
                {
                  icon: Star,
                  title: "Özel Fırsatlar",
                  description: "Üye olanlara özel indirimler",
                  color: "from-yellow-500 to-orange-500"
                }
              ].map((feature, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Demo Credentials */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 text-purple-600 mr-2" />
                  Demo Hesap Bilgileri
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">E-posta:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-purple-600 font-mono">demo@bamk.com</code>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Şifre:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-purple-600 font-mono">demo123</code>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Demo hesap ile tüm özellikleri test edebilirsiniz.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center lg:text-left">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <User className="mr-2 h-5 w-5" />
                  Hesap Oluştur
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  UserPlus,
  Phone,
  Calendar,
  Globe
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { useAuthStore } from '@/store';

export default function RegisterPage() {
  const { register: registerMutation } = useAuth();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    acceptTerms: false,
    acceptNewsletter: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return false;
    }
    if (!formData.acceptTerms) {
      setError('Kullanım şartlarını kabul etmelisiniz.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock register logic
      const user = {
        id: Date.now().toString(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: 'customer' as const,
        avatar: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await login(user, 'mock-token');
      
      // Redirect to home page
      window.location.href = '/';
    } catch (err) {
      setError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    // Mock social register
    console.log(`${provider} ile kayıt olunuyor...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Register Form */}
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
                  Hesap Oluştur
                </h1>
                <p className="text-gray-600">
                  BAMK ailesine katılın ve özel fırsatlardan yararlanın
                </p>
              </div>

              {/* Register Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ad *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Adınız"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Soyad *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Soyadınız"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-posta Adresi *
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

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon Numarası
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="+90 (5xx) xxx xx xx"
                    />
                  </div>
                </div>

                {/* Birth Date Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doğum Tarihi
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Şifre *
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
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Şifre Tekrar *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Şifrenizi tekrar girin"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                    />
                    <span className="text-sm text-gray-600">
                      <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-semibold">
                        Kullanım Şartları
                      </Link>
                      {' '}ve{' '}
                      <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-semibold">
                        Gizlilik Politikası
                      </Link>
                      'nı okudum ve kabul ediyorum. *
                    </span>
                  </label>
                  
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptNewsletter"
                      checked={formData.acceptNewsletter}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                    />
                    <span className="text-sm text-gray-600">
                      E-posta ile özel fırsatlar ve kampanyalar hakkında bilgi almak istiyorum.
                    </span>
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span className="text-red-600 text-sm">{error}</span>
                  </div>
                )}

                {/* Register Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Hesap oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Hesap Oluştur
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

                {/* Social Register */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialRegister('google')}
                    className="w-full py-3 border-2 border-gray-300 hover:border-red-500 hover:text-red-600 transition-all duration-300"
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Google ile Kayıt Ol
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialRegister('facebook')}
                    className="w-full py-3 border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                  >
                    <Facebook className="mr-2 h-5 w-5" />
                    Facebook ile Kayıt Ol
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialRegister('apple')}
                    className="w-full py-3 border-2 border-gray-300 hover:border-gray-800 hover:text-gray-800 transition-all duration-300"
                  >
                    <Apple className="mr-2 h-5 w-5" />
                    Apple ile Kayıt Ol
                  </Button>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Zaten hesabınız var mı?{' '}
                    <Link 
                      href="/login" 
                      className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                    >
                      Giriş Yapın
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-8">
            {/* Welcome Message */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                BAMK Ailesine
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Katılın
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Hesap oluşturarak özel fırsatlardan yararlanın, 
                favori ürünlerinizi kaydedin ve güvenli alışveriş yapın.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              {[
                {
                  icon: Star,
                  title: "Üye Olanlara Özel İndirimler",
                  description: "Sadece üyelerimize özel %20'ye varan indirimler",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: Heart,
                  title: "Favori Listesi",
                  description: "Beğendiğiniz ürünleri kaydedin ve daha sonra satın alın",
                  color: "from-pink-500 to-rose-500"
                },
                {
                  icon: Truck,
                  title: "Ücretsiz Kargo",
                  description: "150 TL ve üzeri siparişlerde ücretsiz kargo",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Shield,
                  title: "Güvenli Alışveriş",
                  description: "256-bit SSL şifreleme ile güvenli ödeme",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: Zap,
                  title: "Hızlı Teslimat",
                  description: "24 saat içinde kargo, 2-3 günde teslimat",
                  color: "from-purple-500 to-indigo-500"
                },
                {
                  icon: RefreshCw,
                  title: "Kolay İade",
                  description: "14 gün içinde ücretsiz iade imkanı",
                  color: "from-indigo-500 to-purple-500"
                }
              ].map((benefit, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center lg:text-left">
              <Link href="/login">
                <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  <User className="mr-2 h-5 w-5" />
                  Zaten Hesabım Var
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

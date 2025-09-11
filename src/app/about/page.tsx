'use client';

import { Button, Card } from '@/components/ui';
import { 
  Users, 
  Award, 
  Target, 
  Heart, 
  Shield, 
  Truck, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Globe,
  Clock,
  Zap,
  TrendingUp,
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Hakkımızda
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              BAMK olarak, müşteri memnuniyetini ön planda tutarak 
              <span className="block text-2xl md:text-3xl font-bold text-yellow-300 mt-4">
                Kaliteli Alışveriş Deneyimi Sunuyoruz
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Hikayemiz
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  2020 yılında kurulan BAMK, e-ticaret sektöründe müşteri odaklı yaklaşımıyla 
                  öne çıkan bir platform olarak faaliyet göstermektedir.
                </p>
                <p>
                  Amacımız, kaliteli ürünleri uygun fiyatlarla müşterilerimize ulaştırmak ve 
                  alışveriş deneyimini keyifli hale getirmektir.
                </p>
                <p>
                  Teknoloji ve insan odaklı yaklaşımımızla, binlerce mutlu müşteriye hizmet 
                  vermenin gururunu yaşıyoruz.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="aspect-square bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <ShoppingBag className="h-32 w-32 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Değerlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              BAMK olarak benimsediğimiz temel değerler ve ilkeler
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
                <p className="text-gray-600 leading-relaxed">
                  Müşterilerimize en kaliteli ürünleri, en uygun fiyatlarla sunarak 
                  alışveriş deneyimini keyifli ve güvenli hale getirmek.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
                <p className="text-gray-600 leading-relaxed">
                  Türkiye'nin en güvenilir ve müşteri odaklı e-ticaret platformu 
                  olmak ve sektörde öncü konumda yer almak.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Değerlerimiz</h3>
                <p className="text-gray-600 leading-relaxed">
                  Müşteri memnuniyeti, kalite, güvenilirlik ve şeffaflık 
                  ilkelerimizle hizmet vermeye devam ediyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Neden BAMK?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bizi tercih etmeniz için birçok neden var
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                icon: Award,
                title: "Kaliteli Ürünler",
                description: "Sadece kaliteli ve orijinal ürünler",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Users,
                title: "7/24 Destek",
                description: "Müşteri hizmetleri her zaman yanınızda",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                <div className="relative bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ekibimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              BAMK'ı büyüten değerli çalışanlarımız
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmet Yılmaz",
                position: "Kurucu & CEO",
                description: "E-ticaret sektöründe 10+ yıl deneyim",
                avatar: "AY"
              },
              {
                name: "Elif Kaya",
                position: "CTO",
                description: "Teknoloji ve inovasyon uzmanı",
                avatar: "EK"
              },
              {
                name: "Mehmet Demir",
                position: "Müşteri Hizmetleri Müdürü",
                description: "Müşteri memnuniyeti odaklı yaklaşım",
                avatar: "MD"
              }
            ].map((member, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-white">{member.avatar}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-purple-600 font-semibold mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Rakamlarla BAMK
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Başarılarımızı rakamlarla gösteriyoruz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Mutlu Müşteri", icon: Users },
              { number: "10K+", label: "Ürün Çeşidi", icon: ShoppingBag },
              { number: "99%", label: "Müşteri Memnuniyeti", icon: Star },
              { number: "24/7", label: "Destek Hizmeti", icon: Clock }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-purple-200 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              İletişim
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bizimle iletişime geçin, sorularınızı yanıtlayalım
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              {[
                {
                  icon: Mail,
                  title: "E-posta",
                  info: "info@bamk.com",
                  description: "7/24 e-posta desteği"
                },
                {
                  icon: Phone,
                  title: "Telefon",
                  info: "+90 (212) 555 0123",
                  description: "Pazartesi-Cuma 09:00-18:00"
                },
                {
                  icon: MapPin,
                  title: "Adres",
                  info: "İstanbul, Türkiye",
                  description: "Merkez ofisimiz"
                }
              ].map((contact, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <contact.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{contact.title}</h3>
                    <p className="text-purple-600 font-semibold mb-1">{contact.info}</p>
                    <p className="text-gray-600 text-sm">{contact.description}</p>
                  </div>
                </div>
              ))}

              {/* Social Media */}
              <div className="pt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Sosyal Medya</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, color: "hover:text-blue-600" },
                    { icon: Twitter, color: "hover:text-blue-400" },
                    { icon: Instagram, color: "hover:text-pink-500" },
                    { icon: Linkedin, color: "hover:text-blue-700" }
                  ].map((social, index) => (
                    <button key={index} className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors duration-300 ${social.color}`}>
                      <social.icon className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Mesaj Gönderin</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Adınız"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Soyadınız"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none"
                  />
                  <textarea
                    placeholder="Mesajınız"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none resize-none"
                  ></textarea>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-semibold text-lg">
                    Mesaj Gönder
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Alışverişe Başlayın
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Binlerce kaliteli ürünümüz arasından seçiminizi yapın ve 
            güvenli alışveriş deneyiminin keyfini çıkarın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <ShoppingBag className="mr-3 h-7 w-7" />
                Ürünleri Keşfet
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-5 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105">
                <Globe className="mr-3 h-6 w-6" />
                Kategorileri Gör
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

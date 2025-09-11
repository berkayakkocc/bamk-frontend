'use client';

import { Button, Card } from '@/components/ui';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Headphones,
  Shield,
  Zap,
  Users,
  Award,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
      });
    }, 3000);
  };

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
              İletişim
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Bizimle iletişime geçin, sorularınızı yanıtlayalım
              <span className="block text-2xl md:text-3xl font-bold text-yellow-300 mt-4">
                Her Zaman Yanınızdayız
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              İletişim Yöntemleri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Size en uygun iletişim yöntemini seçin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Mail,
                title: "E-posta",
                info: "info@bamk.com",
                description: "7/24 e-posta desteği",
                color: "from-blue-500 to-cyan-500",
                action: "mailto:info@bamk.com"
              },
              {
                icon: Phone,
                title: "Telefon",
                info: "+90 (212) 555 0123",
                description: "Pazartesi-Cuma 09:00-18:00",
                color: "from-green-500 to-emerald-500",
                action: "tel:+902125550123"
              },
              {
                icon: MessageSquare,
                title: "Canlı Destek",
                info: "Online Chat",
                description: "Anında yanıt alın",
                color: "from-purple-500 to-pink-500",
                action: "#"
              },
              {
                icon: MapPin,
                title: "Ofis",
                info: "İstanbul, Türkiye",
                description: "Merkez ofisimiz",
                color: "from-orange-500 to-red-500",
                action: "#"
              }
            ].map((method, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                  <p className="text-purple-600 font-semibold mb-3">{method.info}</p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{method.description}</p>
                  <a 
                    href={method.action}
                    className={`w-full bg-gradient-to-r ${method.color} hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center`}
                  >
                    İletişime Geç
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Mesaj Gönderin</h3>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Mesajınız Gönderildi!</h4>
                    <p className="text-gray-600 mb-6">En kısa sürede size dönüş yapacağız.</p>
                    <div className="inline-flex items-center space-x-2 text-green-600 font-semibold">
                      <CheckCircle className="h-5 w-5" />
                      <span>Başarıyla gönderildi</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Adınız *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                          placeholder="Adınızı girin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">E-posta *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                          placeholder="ornek@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                          placeholder="+90 (5xx) xxx xx xx"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Konu *</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-300"
                        >
                          <option value="general">Genel Bilgi</option>
                          <option value="order">Sipariş Sorunu</option>
                          <option value="product">Ürün Hakkında</option>
                          <option value="shipping">Kargo & Teslimat</option>
                          <option value="return">İade & Değişim</option>
                          <option value="technical">Teknik Destek</option>
                          <option value="complaint">Şikayet</option>
                          <option value="suggestion">Öneri</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Mesajınız *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent outline-none resize-none transition-all duration-300"
                        placeholder="Mesajınızı detaylı olarak yazın..."
                      ></textarea>
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Mesaj Gönder
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: Mail,
                        title: "E-posta Adresi",
                        info: "info@bamk.com",
                        description: "Genel sorularınız için"
                      },
                      {
                        icon: Phone,
                        title: "Telefon Numarası",
                        info: "+90 (212) 555 0123",
                        description: "Pazartesi-Cuma 09:00-18:00"
                      },
                      {
                        icon: MapPin,
                        title: "Ofis Adresi",
                        info: "İstanbul, Türkiye",
                        description: "Merkez ofisimiz"
                      },
                      {
                        icon: Clock,
                        title: "Çalışma Saatleri",
                        info: "Pazartesi - Cuma",
                        description: "09:00 - 18:00 (GMT+3)"
                      }
                    ].map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h4>
                          <p className="text-purple-600 font-semibold mb-1">{info.info}</p>
                          <p className="text-gray-600 text-sm">{info.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Sık Sorulan Sorular</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        question: "Siparişim ne zaman kargoya verilir?",
                        answer: "Siparişleriniz 1-2 iş günü içinde kargoya verilir."
                      },
                      {
                        question: "İade süreci nasıl işler?",
                        answer: "14 gün içinde ücretsiz iade yapabilirsiniz."
                      },
                      {
                        question: "Kargo ücreti ne kadar?",
                        answer: "150 TL ve üzeri siparişlerde kargo ücretsizdir."
                      },
                      {
                        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
                        answer: "Kredi kartı, banka kartı ve kapıda ödeme seçenekleri mevcuttur."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{faq.question}</h4>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Support */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sosyal Medya & Destek
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bizi takip edin ve güncel bilgilerden haberdar olun
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Social Media */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Sosyal Medya</h3>
                <div className="space-y-4">
                  {[
                    { icon: Facebook, name: "Facebook", color: "hover:text-blue-600", url: "#" },
                    { icon: Twitter, name: "Twitter", color: "hover:text-blue-400", url: "#" },
                    { icon: Instagram, name: "Instagram", color: "hover:text-pink-500", url: "#" },
                    { icon: Linkedin, name: "LinkedIn", color: "hover:text-blue-700", url: "#" },
                    { icon: Youtube, name: "YouTube", color: "hover:text-red-600", url: "#" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 ${social.color}`}
                    >
                      <social.icon className="h-6 w-6" />
                      <span className="font-semibold">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Müşteri Desteği</h3>
                <div className="space-y-4">
                  {[
                    { icon: Headphones, title: "Canlı Destek", description: "7/24 online chat" },
                    { icon: Mail, title: "E-posta Desteği", description: "24 saat içinde yanıt" },
                    { icon: Phone, title: "Telefon Desteği", description: "Pazartesi-Cuma 09:00-18:00" },
                    { icon: MessageSquare, title: "WhatsApp", description: "Hızlı mesajlaşma" }
                  ].map((support, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <support.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{support.title}</h4>
                        <p className="text-gray-600 text-sm">{support.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Hızlı Linkler</h3>
                <div className="space-y-4">
                  {[
                    { title: "Sık Sorulan Sorular", url: "#" },
                    { title: "Kargo Takibi", url: "#" },
                    { title: "İade & Değişim", url: "#" },
                    { title: "Gizlilik Politikası", url: "#" },
                    { title: "Kullanım Şartları", url: "#" },
                    { title: "Çerez Politikası", url: "#" }
                  ].map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="block p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:text-green-600"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Hala Sorunuz mu Var?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Canlı destek ekibimizle anında iletişime geçin veya 
            detaylı bilgi için diğer sayfalarımızı ziyaret edin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              <MessageSquare className="mr-3 h-7 w-7" />
              Canlı Destek
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-5 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105">
                <Globe className="mr-3 h-6 w-6" />
                Hakkımızda
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

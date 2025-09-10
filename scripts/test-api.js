#!/usr/bin/env node

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:44318/api';

// Node.js'de self-signed sertifikaları kabul et
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function makeRequest(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniye timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    clearTimeout(timeoutId);
    
    // Response body'yi oku
    let responseData = {};
    try {
      const text = await response.text();
      if (text) {
        responseData = JSON.parse(text);
      }
    } catch (e) {
      responseData = { raw: await response.text() };
    }
    
    return { 
      response: { 
        status: response.status, 
        statusText: response.statusText,
        data: responseData 
      }, 
      error: null 
    };
  } catch (error) {
    clearTimeout(timeoutId);
    return { response: null, error };
  }
}

async function testAPI() {
  console.log('🧪 BAMK Backend API Test Başlatılıyor...\n');
  console.log(`📡 API URL: ${API_URL}\n`);

  const tests = [
    {
      name: 'Health Check',
      endpoint: '/health',
      method: 'GET',
    },
    {
      name: 'Products List',
      endpoint: '/products',
      method: 'GET',
    },
    {
      name: 'Categories List',
      endpoint: '/categories',
      method: 'GET',
    },
    {
      name: 'Auth Login (Test)',
      endpoint: '/auth/login',
      method: 'POST',
      data: {
        email: 'test@bamk.com',
        password: '123456'
      },
      expectError: true, // Bu test başarısız olmalı
      debug: true // Hata detaylarını göster
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`⏳ ${test.name} test ediliyor...`);
      
      const options = {
        method: test.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      if (test.data) {
        options.body = JSON.stringify(test.data);
      }

      const { response, error } = await makeRequest(`${API_URL}${test.endpoint}`, options);
      
      if (error) {
        if (test.expectError) {
          console.log(`✅ ${test.name} - Beklenen hata oluştu (${error.name || 'Network Error'})`);
          passed++;
        } else {
          console.log(`❌ ${test.name} - Başarısız (${error.name || 'Network Error'})`);
          console.log(`   Hata: ${error.message}`);
          failed++;
        }
      } else {
        if (test.expectError) {
          // 401, 403, 404 gibi hata kodları beklenen hata olarak kabul edilir
          if (response.status >= 400) {
            console.log(`✅ ${test.name} - Beklenen hata oluştu (${response.status})`);
            if (test.debug) {
              console.log(`   Response: ${JSON.stringify(response, null, 2)}`);
            }
            passed++;
          } else {
            console.log(`❌ ${test.name} - Beklenen hata oluşmadı (${response.status})`);
            if (test.debug) {
              console.log(`   Response: ${JSON.stringify(response, null, 2)}`);
            }
            failed++;
          }
        } else {
          console.log(`✅ ${test.name} - Başarılı (${response.status})`);
          passed++;
        }
      }
    } catch (error) {
      console.log(`❌ ${test.name} - Beklenmeyen hata: ${error.message}`);
      failed++;
    }
    console.log('');
  }

  console.log('📊 Test Sonuçları:');
  console.log(`✅ Başarılı: ${passed}`);
  console.log(`❌ Başarısız: ${failed}`);
  console.log(`📈 Başarı Oranı: ${Math.round((passed / (passed + failed)) * 100)}%\n`);

  if (failed === 0) {
    console.log('🎉 Tüm testler başarılı! Backend API entegrasyonu hazır.');
  } else {
    console.log('⚠️  Bazı testler başarısız. Backend API\'nin çalıştığından emin olun.');
    console.log('   Backend\'i başlatmak için: npm run dev (backend dizininde)');
  }
}

// Test'i çalıştır
testAPI().catch(console.error);

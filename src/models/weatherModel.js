// HTTP istekleri için axios modülü dahil edilir
const axios = require('axios');

// .env dosyasındaki ortam değişkenlerini yüklemek için dotenv modülü kullanılır
require('dotenv').config();

// .env dosyasından OpenWeather API anahtarı alınır
const API_KEY = process.env.OPENWEATHER_API_KEY;

// OpenWeather hava durumu API'sinin temel URL'si
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Belirtilen şehir için hava durumu verisini getiren asenkron fonksiyon
const getWeatherData = async (city) => {
    try {
        // Eğer API anahtarı yoksa hata fırlatılır
        if (!API_KEY) {
            throw new Error('API anahtarı bulunamadı. Lütfen .env dosyasını kontrol edin.');
        }

        // OpenWeather API'sine GET isteği gönderilir
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,             // Şehir adı
                appid: API_KEY,      // API anahtarı
                units: 'metric',     // Sıcaklık birimi Celsius
                lang: 'tr'           // Yanıt dili Türkçe
            }
        });

        // API yanıtı geçerli değilse hata fırlatılır
        if (!response.data || !response.data.main || !response.data.weather) {
            throw new Error('Geçersiz API yanıtı');
        }

        // API'den gelen verilerden gerekli bilgiler çıkarılır ve döndürülür
        return {
            temperature: response.data.main.temp,                 // Sıcaklık
            description: response.data.weather[0].description,   // Hava durumu açıklaması
            humidity: response.data.main.humidity,               // Nem oranı
            windSpeed: response.data.wind.speed,                 // Rüzgar hızı
            city: response.data.name,                            // Şehir adı
            country: response.data.sys.country,                  // Ülke kodu
            icon: response.data.weather[0].icon                  // Hava durumu simgesi
        };
    } catch (error) {
        // Hata varsa konsola detaylı bilgi yazdırılır
        console.error('API Hatası:', error.response ? error.response.data : error.message);

        // API'den gelen yanıta göre özel hata mesajları oluşturulur
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error('Geçersiz API anahtarı');
            } else if (error.response.status === 404) {
                throw new Error('Şehir bulunamadı');
            } else {
                throw new Error(`API Hatası: ${error.response.data.message || 'Bilinmeyin hata'}`);
            }
        }

        // Diğer hatalar için genel hata mesajı döndürülür
        throw new Error(`Hava durumu verisi alınamadı: ${error.message}`);
    }
};

// Bu fonksiyon dışa aktarılır, böylece diğer dosyalarda kullanılabilir
module.exports = {
    getWeatherData
};

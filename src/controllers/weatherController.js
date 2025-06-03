// axios modülü HTTP istekleri yapmak için kullanılır
const axios = require('axios');

// hava durumu verilerini işleyen model dosyası
const weatherModel = require('../models/weatherModel');

// API üzerinden hava durumu verisini döndüren controller fonksiyonu
const getWeather = async (req, res) => {
    try {
        // İstekten şehir bilgisi alınır (sorgu parametresinden)
        const { city } = req.query;

        // Eğer şehir bilgisi yoksa 400 Bad Request hatası döndürülür
        if (!city) {
            return res.status(400).json({ error: 'Şehir adı gerekli' });
        }

        // Model üzerinden hava durumu verisi alınır
        const weatherData = await weatherModel.getWeatherData(city);

        // Veriler JSON formatında kullanıcıya gönderilir
        res.json(weatherData);
    } catch (error) {
        // Hata oluşursa konsola yazdırılır
        console.error('Hava durumu verisi alınırken hata:', error.message);
        
        // Hatanın türüne göre uygun HTTP durum kodu belirlenir
        let statusCode = 500; // Varsayılan: Sunucu hatası

        // Eğer hata API anahtarı ile ilgiliyse yetkisiz erişim hatası döndürülür
        if (error.message.includes('API anahtarı')) {
            statusCode = 401;
        } 
        // Eğer şehir bulunamamışsa 404 Not Found hatası döndürülür
        else if (error.message.includes('Şehir bulunamadı')) {
            statusCode = 404;
        }
        
        // Hata mesajı ve varsa detaylar kullanıcıya gönderilir
        res.status(statusCode).json({ 
            error: error.message,
            details: error.response?.data || null // varsa hata cevabı eklenir
        });
    }
};

// getWeather fonksiyonu dışa aktarılır
module.exports = {
    getWeather
};

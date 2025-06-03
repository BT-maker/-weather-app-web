// Express modülü projeye dahil edilir
const express = require('express');

// Dosya ve klasör yollarını yönetmek için path modülü dahil edilir
const path = require('path');

// Hava durumu verisini yönetecek controller dosyası dahil edilir
const weatherController = require('./controllers/weatherController');

// Express uygulaması başlatılır
const app = express();

// Uygulamanın çalışacağı port belirlenir (.env'den ya da varsayılan 3000)
const PORT = process.env.PORT || 3000;

// Middleware'ler
app.use(express.json()); // JSON veri ile çalışmak için middleware
app.use(express.urlencoded({ extended: true })); // URL-encoded veri ile çalışmak için middleware
app.use(express.static(path.join(__dirname, '../public'))); // public klasörü statik dosyalar için ayarlanır

// Ana sayfa route'u – tarayıcıdan gelen GET isteğinde index.html dosyası döndürülür
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// /api/weather endpoint'i – hava durumu verisini almak için weatherController'daki getWeather fonksiyonu çalıştırılır
app.get('/api/weather', weatherController.getWeather);

// Sunucu belirtilen port üzerinden dinlenmeye başlanır
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

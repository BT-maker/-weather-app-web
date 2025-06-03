# Hava Durumu Uygulaması

Bu proje, tek sayfalık bir hava durumu uygulamasıdır. OpenWeather API'sini kullanarak gerçek zamanlı hava durumu bilgilerini gösterir.

## Özellikler

- Şehir bazlı hava durumu sorgulama
- Sıcaklık, nem, rüzgar hızı ve hava durumu açıklaması
- Hava durumu ikonları
- Modern ve responsive tasarım
- Türkçe dil desteği

## Teknolojiler

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- Backend:
  - Node.js
  - Express.js
- API:
  - OpenWeather API

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [proje-url]
```

2. Proje dizinine gidin:
```bash
cd hava-durumu
```

3. Bağımlılıkları yükleyin:
```bash
npm install
```

4. `.env` dosyasını düzenleyin:
```
OPENWEATHER_API_KEY=your_api_key_here
```

5. Uygulamayı başlatın:
```bash
npm start
```

## Kullanım

1. Tarayıcınızda `http://localhost:3000` adresine gidin
2. Varsayılan olarak Ankara'nın hava durumu gösterilecektir
3. Arama kutusuna başka bir şehir adı yazın
4. Enter tuşuna basın veya arama butonuna tıklayın

## Proje Yapısı

```
hava-durumu/
├── public/
│   ├── css/
│   │   └── style.css
│   │   
│   ├── js/
│   │   └── app.js
│   ├── img/
│   │   └── storm.jpg
│   └── index.html
├── src/
│   ├── controllers/
│   │   └── weatherController.js
│   ├── models/
│   │   └── weatherModel.js
│   └── app.js
├── .env
├── package.json
└── README.md
```

## Hata Yönetimi

- Geçersiz şehir adı girildiğinde uyarı mesajı gösterilir
- API bağlantı hataları kullanıcıya bildirilir
- Eksik veya hatalı API anahtarı durumunda uyarı verilir




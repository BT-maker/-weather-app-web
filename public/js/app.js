// Sayfa tamamen yüklendiğinde aşağıdaki fonksiyonu çalıştır
document.addEventListener('DOMContentLoaded', () => {

    // HTML'deki ilgili elementleri değişkenlere atıyoruz
    const cityInput = document.getElementById('cityInput');           // Şehir adı girilen input
    const searchButton = document.getElementById('searchButton');     // Arama butonu
    const weatherCard = document.getElementById('weatherCard');       // Hava durumu kartı
    const cityName = document.getElementById('cityName');             // Şehir adı ve ülke gösterimi
    const tempValue = document.getElementById('tempValue');           // Sıcaklık değeri
    const weatherDesc = document.getElementById('weatherDesc');       // Hava durumu açıklaması
    const humidity = document.getElementById('humidity');             // Nem oranı
    const windSpeed = document.getElementById('windSpeed');           // Rüzgar hızı
    const weatherIcon = document.getElementById('weatherIcon');       // Hava durumu simgesi

    // API'den hava durumu verisini asenkron olarak çeken fonksiyon
    const getWeather = async (city) => {
        try {
            // Belirtilen şehir için API'ye GET isteği gönderilir
            const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            const data = await response.json(); // JSON verisi çözülür

            // İstek başarılıysa arayüz güncellenir
            if (response.ok) {
                updateWeatherUI(data); // Ekranı verilerle güncelle
            } else {
                // Hata varsa kullanıcıya bildirilir
                throw new Error(data.error);
            }
        } catch (error) {
            // Hata oluşursa kullanıcıya gösterilir
            alert('Hava durumu bilgisi alınamadı: ' + error.message);
        }
    };

    // Alınan hava durumu verileriyle arayüzü güncelleyen fonksiyon
    const updateWeatherUI = (data) => {
        cityName.textContent = `${data.city}, ${data.country}`; // Şehir ve ülke ismi gösterilir
        tempValue.textContent = Math.round(data.temperature);   // Sıcaklık değeri yuvarlanarak gösterilir
        weatherDesc.textContent = data.description;             // Açıklama yazısı güncellenir
        humidity.textContent = data.humidity;                   // Nem oranı gösterilir
        windSpeed.textContent = data.windSpeed;                 // Rüzgar hızı gösterilir
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`; // Hava durumu simgesi
        weatherCard.style.display = 'block';                    // Kart görünür hale getirilir
    };

    // Sayfa ilk yüklendiğinde varsayılan olarak Ankara'nın hava durumu gösterilir
    getWeather('Ankara');

    // Arama butonuna tıklanınca şehir ismi alınıp hava durumu bilgisi istenir
    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim(); // Girilen şehir ismi alınır ve boşluklar kırpılır
        if (city) {
            getWeather(city); // Girilen şehir için hava durumu çekilir
        } else {
            // Şehir girilmediyse kullanıcı uyarılır
            alert('Lütfen bir şehir adı girin');
        }
    });

    // Klavyeden Enter tuşuna basıldığında arama butonu tetiklenir
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click(); // Butona tıklama simüle edilir
        }
    });
});

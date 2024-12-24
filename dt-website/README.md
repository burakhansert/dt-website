# Uzm. Dr. Dt. Bedia Sert Web Sitesi

Bu proje, Uzm. Dr. Dt. Bedia Sert'in profesyonel diş hekimliği web sitesidir.

## Özellikler

- Responsive tasarım
- Çoklu dil desteği (TR, EN, DE, FR, ES)
- Online randevu sistemi
- İletişim formu
- Tedavi bilgileri
- Vaka örnekleri

## Teknolojiler

- Backend: Express.js
- Frontend: HTML, CSS (Tailwind), JavaScript
- Veritabanı: SQLite
- Email: Nodemailer

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd dt-website
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını düzenleyin:
```
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

4. Uygulamayı başlatın:
```bash
npm run dev
```

## Geliştirme

- `public/` klasörü statik dosyaları içerir
- `src/` klasörü backend kodlarını içerir
- `views/` klasörü frontend şablonlarını içerir

## Lisans

Bu proje özel lisanslıdır ve tüm hakları saklıdır. 
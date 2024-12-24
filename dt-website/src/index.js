const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Randevu formu endpoint'i
app.post('/api/appointment', async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'dt.bediaerdogansert@gmail.com',
    subject: 'Yeni Randevu Talebi',
    html: `
      <h2>Yeni Randevu Talebi</h2>
      <p><strong>Ad-Soyad:</strong> ${name}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Mesaj:</strong> ${message}</p>
      <hr>
      <p>Bu mesaj web sitesi randevu formundan gönderilmiştir.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Randevu talebiniz başarıyla alınmıştır. En kısa sürede size dönüş yapılacaktır.' });
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    res.status(500).json({ success: false, message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.' });
  }
});

// İletişim formu endpoint'i
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'dt.bediaerdogansert@gmail.com',
    subject: 'Yeni İletişim Formu Mesajı',
    html: `
      <h2>Yeni İletişim Mesajı</h2>
      <p><strong>Ad-Soyad:</strong> ${name}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Mesaj:</strong> ${message}</p>
      <hr>
      <p>Bu mesaj web sitesi iletişim formundan gönderilmiştir.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Mesajınız başarıyla iletilmiştir. En kısa sürede size dönüş yapılacaktır.' });
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    res.status(500).json({ success: false, message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.' });
  }
});

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
}); 
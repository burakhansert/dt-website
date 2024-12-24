document.addEventListener('DOMContentLoaded', () => {
    // Dil değişkenleri
    let currentLang = 'tr';
    const translations = { tr, en, de, fr, es };

    // Dil değiştirme fonksiyonu
    function changeLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        document.getElementById('currentLang').textContent = lang.toUpperCase();
        
        // Navigasyon menüsü
        document.querySelector('a[href="#home"]').textContent = translations[lang].nav.home;
        document.querySelector('a[href="#about"]').textContent = translations[lang].nav.about;
        document.querySelector('a[href="#treatments"]').textContent = translations[lang].nav.treatments;
        document.querySelector('a[href="#cases"]').textContent = translations[lang].nav.cases;
        document.querySelector('a[href="#contact"]').textContent = translations[lang].nav.contact;

        // Ana sayfa
        document.querySelector('#home h1').textContent = translations[lang].home.title;
        document.querySelector('#home p').textContent = translations[lang].home.subtitle;
        document.querySelector('#appointmentBtn').textContent = translations[lang].home.appointmentBtn;

        // Hakkımda
        document.querySelector('#about h2').textContent = translations[lang].about.title;
        const aboutParagraphs = document.querySelectorAll('#about .md\\:w-2\\/3 p');
        aboutParagraphs[0].textContent = translations[lang].about.intro;
        aboutParagraphs[1].textContent = translations[lang].about.experience;
        aboutParagraphs[2].textContent = translations[lang].about.approach;
        
        // Tedaviler
        document.querySelector('#treatments h2').textContent = translations[lang].treatments.title;
        const treatmentCards = document.querySelectorAll('.treatment-card');
        const treatmentTypes = ['fullProsthesis', 'partialProsthesis', 'implantProsthesis', 'aestheticCoating', 
                              'zirconium', 'laminateVeneer', 'teethWhitening', 'jawTreatment'];
        
        treatmentCards.forEach((card, index) => {
            if (treatmentTypes[index]) {
                card.querySelector('h3').textContent = translations[lang].treatments[treatmentTypes[index]].title;
                card.querySelector('p').textContent = translations[lang].treatments[treatmentTypes[index]].description;
            }
        });

        // Vakalar
        document.querySelector('#cases h2').textContent = translations[lang].cases.title;
        const caseCards = document.querySelectorAll('#cases .bg-white');
        caseCards[0].querySelector('h3').textContent = translations[lang].cases.case1.title;
        caseCards[0].querySelector('p').textContent = translations[lang].cases.case1.description;
        caseCards[1].querySelector('h3').textContent = translations[lang].cases.case2.title;
        caseCards[1].querySelector('p').textContent = translations[lang].cases.case2.description;
        document.querySelectorAll('.case-details-btn').forEach(btn => {
            btn.textContent = translations[lang].cases.detailsBtn;
        });

        // İletişim
        document.querySelector('#contact h2').textContent = translations[lang].contact.title;
        const formLabels = document.querySelectorAll('#contactForm label');
        formLabels[0].textContent = translations[lang].contact.form.name;
        formLabels[1].textContent = translations[lang].contact.form.email;
        formLabels[2].textContent = translations[lang].contact.form.phone;
        formLabels[3].textContent = translations[lang].contact.form.message;
        document.querySelector('#contactForm button').textContent = translations[lang].contact.form.send;

        // İletişim bilgileri
        document.querySelector('#contact .bg-white h3').textContent = translations[lang].contact.info.title;
        document.querySelector('#contact .bg-white .space-y-4 div:last-child span').textContent = translations[lang].contact.info.address;
        
        const workingHours = document.querySelector('#contact .bg-white h3:last-of-type');
        workingHours.textContent = translations[lang].contact.info.workingHours.title;
        const workingHoursDivs = document.querySelectorAll('#contact .space-y-2 .flex');
        workingHoursDivs[0].firstElementChild.textContent = translations[lang].contact.info.workingHours.weekdays.split(':')[0] + ':';
        workingHoursDivs[1].firstElementChild.textContent = translations[lang].contact.info.workingHours.saturday.split(':')[0] + ':';
        workingHoursDivs[2].firstElementChild.textContent = translations[lang].contact.info.workingHours.sunday.split(':')[0] + ':';

        // Footer
        const footerTitles = document.querySelectorAll('footer h4');
        footerTitles[0].textContent = translations[lang].footer.contactInfo;
        footerTitles[1].textContent = translations[lang].footer.workingHours;
        footerTitles[2].textContent = translations[lang].footer.socialMedia;
        document.querySelector('footer .text-center p').textContent = translations[lang].footer.rights;
    }

    // Dil değiştirme butonları
    document.querySelectorAll('.language-btn').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            changeLanguage(lang);
        });
    });

    // Modal işlemleri
    const appointmentBtn = document.getElementById('appointmentBtn');
    const appointmentModal = document.getElementById('appointmentModal');
    const cancelAppointment = document.getElementById('cancelAppointment');
    const appointmentForm = document.getElementById('appointmentForm');
    const contactForm = document.getElementById('contactForm');

    // Randevu modal işlemleri
    appointmentBtn.addEventListener('click', () => {
        appointmentModal.classList.remove('hidden');
    });

    cancelAppointment.addEventListener('click', () => {
        appointmentModal.classList.add('hidden');
    });

    // Randevu formu gönderimi
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(appointmentForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                alert('Talebiniz başarılı bir şekilde alınmıştır.');
                appointmentModal.classList.add('hidden');
                appointmentForm.reset();
            } else {
                alert(result.message || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
            }
        } catch (error) {
            console.error('Form gönderme hatası:', error);
            alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
        }
    });

    // İletişim formu gönderimi
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                alert('Mesajınız başarıyla iletildi.');
                contactForm.reset();
            } else {
                alert(result.message || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
            }
        } catch (error) {
            console.error('Form gönderme hatası:', error);
            alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
        }
    });

    // Vaka detayları modal işlemleri
    const caseDetailsButtons = document.querySelectorAll('.case-details-btn');
    
    caseDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const caseCard = button.closest('.bg-white');
            const title = caseCard.querySelector('h3').textContent;
            const description = caseCard.querySelector('p').textContent;
            const imageSrc = caseCard.querySelector('img').src;
            
            showCaseDetails(title, description, imageSrc);
        });
    });

    function showCaseDetails(title, description, imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-4xl w-full mx-auto">
                <img src="${imageSrc}" alt="${title}" class="w-full max-h-[70vh] object-contain rounded-lg mb-6">
                <h2 class="text-2xl font-bold mb-4">${title}</h2>
                <p class="text-gray-600 mb-6">${description}</p>
                <button class="close-modal px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Kapat</button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 
const translations = {
    fa: {
        site_title: "جواد بهرامی",
        home: "خانه",
        activities: "فعالیت‌ها",
        honors: "افتخارات",
        skills: "مهارت‌ها",
        contact: "راه ارتباطی"
    },
    en: {
        site_title: "Javad Bahrami",
        home: "Home",
        activities: "Activities",
        honors: "Honors",
        skills: "Skills",
        contact: "Contact"
    },
    ar: {
        site_title: "جواد بهرامي",
        home: "الصفحة الرئيسية",
        activities: "أنشطة",
        honors: "التكريمات",
        skills: "المهارات",
        contact: "طريقة الاتصال"
    }
};

function setLanguage(lang) {
    if (!translations[lang]) lang = "fa"; // fallback
    document.documentElement.lang = lang;
    
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update active button state
    document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    // Language Setup
    let userLang = (navigator.language || navigator.userLanguage || "fa").slice(0, 2);
    if (!translations[userLang]) {
        userLang = "fa";
    }
    setLanguage(userLang);

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('show');
        });

        // Close menu when a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('show');
            });
        });
    }

    // Fade-in Scroll Animation
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});

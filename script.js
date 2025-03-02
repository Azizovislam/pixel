// Элементы навигации
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links ul li a');

// Мобильное меню
if (openMenu && closeMenu && navLinks) {
    // Добавляем блокировку прокрутки при открытом меню
    const toggleScrollLock = () => {
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
    };

    openMenu.addEventListener('click', () => {
        navLinks.classList.add('active');
        toggleScrollLock();
    });

    closeMenu.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggleScrollLock();
    });

    // Закрытие меню при клике на пункт меню
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggleScrollLock();
        });
    });

    // Закрытие меню при клике вне меню
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !openMenu.contains(e.target)) {
            navLinks.classList.remove('active');
            toggleScrollLock();
        }
    });

    // Закрытие меню при нажатии клавиши Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            toggleScrollLock();
        }
    });
}

// Активный пункт меню при скролле
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// Плавный скролл к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация появления элементов при скролле
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.game-card, .team-member, .about-stats, .contact-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Обработка формы контактов
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Показываем индикатор загрузки
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;

        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Отправляем email используя EmailJS
        emailjs.send('service_id', 'template_id', { // Замените на ваши ID сервиса и шаблона
            to_email: 'azizovislam2009@gmail.com',
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
        }).then(
            function(response) {
                // Очищаем форму
                contactForm.reset();
                
                // Показываем сообщение об успехе
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
                
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Удаляем сообщение через 5 секунд
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            },
            function(error) {
                // Показываем сообщение об ошибке
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.';
                
                contactForm.parentNode.insertBefore(errorMessage, contactForm);
                
                // Удаляем сообщение через 5 секунд
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        ).finally(() => {
            // Восстанавливаем кнопку
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
}

// Добавление пиксельных эффектов
const addPixelEffect = () => {
    const pixelElements = document.querySelectorAll('.pixel-text, .dreams-text');
    
    pixelElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.classList.add('pixel-effect');
            setTimeout(() => {
                element.classList.remove('pixel-effect');
            }, 500);
        });
    });
};

window.addEventListener('load', addPixelEffect);

// Предзагрузка изображений для улучшения производительности
const preloadImages = () => {
    // Удаляем предзагрузку изображений, так как используем CSS-заглушки
    console.log('Используются CSS-заглушки вместо реальных изображений');
};

// Добавление CSS класса для анимации при загрузке страницы
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Добавление эффекта параллакса для героя
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Добавление эффекта наведения для карточек игр
const gameCards = document.querySelectorAll('.game-card');

gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('hover');
    });
});

// Модальное окно для игр
const modal = document.getElementById('gameModal');
const modalImage = modal.querySelector('.modal-image');
const modalTitle = modal.querySelector('.modal-title');
const modalPlatforms = modal.querySelector('.modal-platforms');
const closeModal = modal.querySelector('.close-modal');

// Функция открытия модального окна
function openGameModal(gameCard) {
    const title = gameCard.querySelector('h3').textContent;
    const platforms = gameCard.querySelector('.game-platforms').innerHTML;
    const imageUrl = gameCard.querySelector('.game-image').style.backgroundImage;
    
    modalTitle.textContent = title;
    modalImage.style.backgroundImage = imageUrl;
    modalPlatforms.innerHTML = platforms;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Функция закрытия модального окна
function closeGameModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Обработчики событий для модального окна
document.querySelectorAll('.game-overlay .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const gameCard = e.target.closest('.game-card');
        openGameModal(gameCard);
    });
});

closeModal.addEventListener('click', closeGameModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeGameModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeGameModal();
    }
}); 
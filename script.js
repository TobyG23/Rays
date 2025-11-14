// Array de imágenes para rotar en el hero (alta resolución)
const heroImages = [
    'https://images.unsplash.com/photo-1628394029816-1dc524670f60?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,fit=scale-down,format=auto,quality=90/yifuqcwo/5b6be0a9-2ecf-42e9-97c7-ced3e4d3a950.jpg',
    'https://images.unsplash.com/flagged/photo-1579632993381-847f6a71a3cd?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

let currentImageIndex = 0;
const heroElement = document.querySelector('.hero');

// Función para cambiar la imagen con efecto fade
function changeHeroImage() {
    // Fade out
    const beforeElement = window.getComputedStyle(heroElement, '::before');
    heroElement.style.setProperty('--fade-opacity', '0');

    setTimeout(() => {
        // Cambiar imagen
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroElement.style.setProperty('--hero-bg-image', `url('${heroImages[currentImageIndex]}')`);

        // Fade in
        setTimeout(() => {
            heroElement.style.setProperty('--fade-opacity', '0.6');
        }, 50);
    }, 1000); // Esperar a que termine el fade out
}

// Cambiar imagen cada 4 segundos
setInterval(changeHeroImage, 4000);

// Inicializar con la primera imagen
heroElement.style.setProperty('--hero-bg-image', `url('${heroImages[0]}')`);
heroElement.style.setProperty('--fade-opacity', '0.6');

let currentMonth = new Date(2024, 10); // November 2024

function switchTab(tabName) {
    const tabs = document.querySelectorAll('.events-tab-content');
    const buttons = document.querySelectorAll('.events-tab-btn');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');

    if (tabName === 'calendar') {
        renderCalendar();
    }
}

function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    document.getElementById('currentMonth').textContent = currentMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let html = '';
    const eventDates = [15, 20, 28];

    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other">${daysInPrevMonth - i}</div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isEvent = eventDates.includes(day);
        const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
        let classes = 'calendar-day';
        if (isEvent) classes += ' event';
        if (isToday) classes += ' today';
        html += `<div class="${classes}">${day}</div>`;
    }

    const remaining = 42 - (firstDay + daysInMonth);
    for (let i = 1; i <= remaining; i++) {
        html += `<div class="calendar-day other">${i}</div>`;
    }

    document.getElementById('calendarDays').innerHTML = html;
}

function prevMonth() {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
}

function handleSubmit(e) {
    e.preventDefault();
    alert('¡Gracias por tu reseña! Nos alegra que disfrutaras de Ray\'s.');
    e.target.reset();
}

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize calendar
renderCalendar();

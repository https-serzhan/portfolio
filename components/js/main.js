const navLinks = document.querySelectorAll('nav .nav-links a');
const sections = document.querySelectorAll('main section');

function setActiveLink() {
    let scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`nav .nav-links a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

window.addEventListener('scroll', setActiveLink);
setActiveLink();

const lazyImages = document.querySelectorAll('img');
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            obs.unobserve(img);
        }
    });
}, { rootMargin: "0px 0px 100px 0px" });

lazyImages.forEach(img => observer.observe(img));

const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

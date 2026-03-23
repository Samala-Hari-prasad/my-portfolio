document.addEventListener('DOMContentLoaded', () => {

    /* ── SCROLL PROGRESS BAR ── */
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
    });



    /* ── FLOATING TECH ICONS BACKGROUND ── */
    const techStackBg = document.getElementById('techStackBg');
    if (techStackBg) {
        const icons = [
            { cls: 'fab fa-python', color: 'rgba(79,142,247,0.08)' },
            { cls: 'fab fa-linux', color: 'rgba(162,89,255,0.08)' },
            { cls: 'fab fa-js', color: 'rgba(0,212,255,0.06)' },
            { cls: 'fab fa-html5', color: 'rgba(79,142,247,0.07)' },
            { cls: 'fab fa-css3-alt', color: 'rgba(162,89,255,0.07)' },
            { cls: 'fab fa-docker', color: 'rgba(0,212,255,0.07)' },
            { cls: 'fab fa-git-alt', color: 'rgba(79,142,247,0.07)' },
            { cls: 'fas fa-shield-alt', color: 'rgba(0,255,170,0.07)' },
            { cls: 'fas fa-terminal', color: 'rgba(162,89,255,0.08)' },
        ];

        for (let i = 0; i < 18; i++) {
            const icon = icons[Math.floor(Math.random() * icons.length)];
            const el = document.createElement('i');
            el.className = `${icon.cls} floating-icon`;
            el.style.left = `${Math.random() * 100}vw`;
            el.style.bottom = `-10vh`;
            el.style.animationDuration = `${18 + Math.random() * 22}s`;
            el.style.animationDelay = `${Math.random() * 12}s`;
            el.style.fontSize = `${2.5 + Math.random() * 4}rem`;
            el.style.color = icon.color;
            techStackBg.appendChild(el);
        }
    }

    /* ── SCROLL REVEAL ── */
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, offset = 1.1) => {
        const top = el.getBoundingClientRect().top;
        return top <= (window.innerHeight || document.documentElement.clientHeight) / offset;
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.12)) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation, { passive: true });
    handleScrollAnimation();

    /* ── NAVBAR ── */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ── SMOOTH SCROLL ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ── COUNTER ANIMATION ── */
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1800;
            const startTime = performance.now();

            function update(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                counter.innerText = current + (target >= 10 ? '+' : '');
                if (progress < 1) requestAnimationFrame(update);
                else counter.innerText = target + (target >= 10 ? '+' : '');
            }
            requestAnimationFrame(update);
        });
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    /* ── STAT CARD HOVER GLOW ── */
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(79,142,247,0.12), rgba(10,10,20,0.6) 70%)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    /* ── PROJECT CARD MOUSE GLOW ── */
    document.querySelectorAll('.project-card-modern').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', x + '%');
            card.style.setProperty('--my', y + '%');
        });
    });



    /* ── HERO PARALLAX ── */
    const heroSection = document.querySelector('.hero-section');
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');

    if (heroLeft && heroRight) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroLeft.style.transform = `translateY(${scrolled * 0.08}px)`;
                heroRight.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        }, { passive: true });
    }

    /* ── ACTIVE NAV ON SCROLL ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 150) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-nav');
            }
        });
    }, { passive: true });

    /* ── SKILL PILLS STAGGER ANIMATION ── */
    document.querySelectorAll('.skill-category').forEach((cat, ci) => {
        cat.querySelectorAll('.skill-pill-modern').forEach((pill, pi) => {
            pill.style.transitionDelay = `${pi * 40}ms`;
        });
    });

    /* ── HAMBURGER MENU ── */
    const hamburger = document.querySelector('.hamburger');
    const navLinksEl = document.querySelector('.nav-links');
    if (hamburger && navLinksEl) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinksEl.style.display === 'flex';
            navLinksEl.style.cssText = isOpen
                ? 'display: none'
                : 'display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: rgba(3,3,8,0.97); backdrop-filter: blur(20px); padding: 1.5rem; gap: 0.5rem; border-bottom: 1px solid rgba(79,142,247,0.15);';
        });
    }

    /* ── HERO TYPING EFFECT ── */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease';
            heroTitle.style.opacity = '1';
        }, 600);
    }

    /* ── ENTRANCE ANIMATION FOR HERO ── */
    const heroName = document.querySelector('.hero-name');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroEyebrow = document.querySelector('.hero-eyebrow');

    [heroEyebrow, heroName, heroTitle, heroTagline, heroButtons].forEach((el, i) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + i * 150);
    });

});

/* ── COPY EMAIL ── */
function copyEmail() {
    const emailInput = document.getElementById('emailInput');
    const copyBtn = document.getElementById('copyBtn');

    navigator.clipboard.writeText(emailInput.value).then(() => {
        const orig = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.color = 'var(--accent)';
        setTimeout(() => {
            copyBtn.innerHTML = orig;
            copyBtn.style.color = '';
        }, 2000);
    });
}

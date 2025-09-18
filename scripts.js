function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('visible');
}

document.getElementById('hamburger-icon').addEventListener('click', toggleMenu);

document.querySelectorAll('#nav-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function filterProjects(category) {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = '';
        } else {
            project.style.display = 'none';
        }
    });
}

// Example: Add event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.dataset.category;
        filterProjects(category);
    });
});

// Lightbox effect for project images
function openLightbox(imgSrc) {
    let lightbox = document.getElementById('lightbox-modal');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox-modal';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100vw';
        lightbox.style.height = '100vh';
        lightbox.style.background = 'rgba(0,0,0,0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '1000';
        lightbox.innerHTML = `
            <img src="${imgSrc}" style="max-width:90vw; max-height:90vh; box-shadow:0 0 20px #000;" />
            <span style="position:absolute;top:30px;right:40px;font-size:2rem;color:#fff;cursor:pointer;" id="lightbox-close">&times;</span>
        `;
        document.body.appendChild(lightbox);
        lightbox.addEventListener('click', closeLightbox);
        document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    } else {
        lightbox.querySelector('img').src = imgSrc;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// Attach lightbox to project images
document.querySelectorAll('.project img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
        openLightbox(this.src);
    });
});

// Contact form validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = contactForm.querySelector('[name="name"]');
            const email = contactForm.querySelector('[name="email"]');
            const message = contactForm.querySelector('[name="message"]');
            let valid = true;
            let errorMsg = '';

            if (!name.value.trim()) {
                valid = false;
                errorMsg += 'Please enter your name.\n';
            }
            if (!email.value.trim()) {
                valid = false;
                errorMsg += 'Please enter your email.\n';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                valid = false;
                errorMsg += 'Please enter a valid email address.\n';
            }
            if (!message.value.trim()) {
                valid = false;
                errorMsg += 'Please enter your message.\n';
            }

            if (!valid) {
                e.preventDefault();
                alert(errorMsg);
            }
        });
    }
});

// Real-time feedback for contact form fields
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm.querySelector('[name="email"]');
        const message = contactForm.querySelector('[name="message"]');

        function showError(input, msg) {
            let error = input.nextElementSibling;
            if (!error || !error.classList.contains('input-error')) {
                error = document.createElement('span');
                error.className = 'input-error';
                error.style.color = 'red';
                error.style.fontSize = '0.9em';
                input.parentNode.insertBefore(error, input.nextSibling);
            }
            error.textContent = msg;
        }

        function clearError(input) {
            let error = input.nextElementSibling;
            if (error && error.classList.contains('input-error')) {
                error.textContent = '';
            }
        }

        name.addEventListener('input', function() {
            if (!name.value.trim()) {
                showError(name, 'Name is required.');
            } else {
                clearError(name);
            }
        });

        email.addEventListener('input', function() {
            if (!email.value.trim()) {
                showError(email, 'Email is required.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                showError(email, 'Invalid email address.');
            } else {
                clearError(email);
            }
        });

        message.addEventListener('input', function() {
            if (!message.value.trim()) {
                showError(message, 'Message is required.');
            } else {
                clearError(message);
            }
        });
    }
});
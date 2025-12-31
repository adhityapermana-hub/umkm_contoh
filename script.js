// Create Particle Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        // Random color variation
        const hue = 40 + Math.random() * 20; // Yellowish colors
        particle.style.background = `hsl(${hue}, 80%, 60%)`;
        
        particlesContainer.appendChild(particle);
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links with animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animation for sections
function checkScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.8;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}

// Testimonial Slider
const testimonialContainer = document.querySelector('.testimonial-container');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function showSlide(slideIndex) {
    testimonialContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
    
    currentSlide = slideIndex;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % dots.length;
    showSlide(currentSlide);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
        stopSlider();
        startSlider();
    });
});

// Auto slide testimonial
startSlider();

// Contact Form Submission with animation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    
    // Add animation to button
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate form submission delay
    setTimeout(() => {
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            padding: 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            z-index: 1000;
            animation: slideInRight 0.5s ease forwards;
        `;
        successMessage.innerHTML = `
            <h4 style="margin-bottom: 10px;">Terima kasih ${name}!</h4>
            <p>Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda via WhatsApp (${phone}) dalam waktu 1x24 jam.</p>
        `;
        document.body.appendChild(successMessage);
        
        // Reset button
        submitBtn.innerHTML = 'Kirim Pesan';
        submitBtn.disabled = false;
        
        // Reset form
        contactForm.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 500);
        }, 5000);
        
    }, 1500);
});

// Add to Cart Function with enhanced animation
function addToCart(productName, productPrice) {
    const cartNotification = document.getElementById('cartNotification');
    const cartMessage = document.getElementById('cartMessage');
    
    // Format price to Indonesian Rupiah
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(productPrice);
    
    cartMessage.textContent = `${productName} telah ditambahkan ke keranjang! (${formattedPrice})`;
    
    cartNotification.style.display = 'block';
    
    // Add cart bounce animation to button
    const buttons = document.querySelectorAll(`button[onclick="addToCart('${productName}', ${productPrice})"]`);
    buttons.forEach(button => {
        button.style.animation = 'bounce 0.5s';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    });
    
    // In a real application, you would update the cart state here
    console.log(`Added to cart: ${productName} - ${formattedPrice}`);
}

function closeCartNotification() {
    const cartNotification = document.getElementById('cartNotification');
    cartNotification.style.animation = 'slideOutRight 0.5s ease forwards';
    setTimeout(() => {
        cartNotification.style.display = 'none';
        cartNotification.style.animation = '';
    }, 500);
}

// Order via WhatsApp Function
function orderViaWhatsApp(productName, productPrice) {
    // Format price to Indonesian Rupiah
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(productPrice);
    
    // Create WhatsApp message
    const message = `Halo CraftHub Artisan, saya ingin memesan produk:\n\nNama Produk: ${productName}\nHarga: ${formattedPrice}\n\nBisa tolong informasikan ketersediaan dan cara pemesanannya?`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (change this to your actual WhatsApp number)
    const whatsappNumber = '6281234567890';
    
    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}

// Update WhatsApp button with current page info
function updateWhatsAppButton() {
    const whatsappButton = document.getElementById('whatsappButton');
    const currentPage = window.location.href;
    const productName = document.title;
    
    // Update WhatsApp message to include page reference
    const message = `Halo CraftHub Artisan, saya melihat website Anda di ${currentPage} dan tertarik dengan produk Anda. Bisa tolong informasikan lebih lanjut?`;
    const encodedMessage = encodeURIComponent(message);
    
    whatsappButton.href = `https://wa.me/6281234567890?text=${encodedMessage}`;
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-10px);}
        60% {transform: translateY(-5px);}
    }
    
    @keyframes slideInRight {
        from {transform: translateX(100%); opacity: 0;}
        to {transform: translateX(0); opacity: 1;}
    }
    
    @keyframes slideOutRight {
        from {transform: translateX(0); opacity: 1;}
        to {transform: translateX(100%); opacity: 0;}
    }
`;
document.head.appendChild(style);

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize on page load
window.addEventListener('load', () => {
    // Create particles
    createParticles();
    
    // Initial scroll check
    checkScroll();
    
    // Show all sections after page loads
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('visible');
        });
    }, 300);
    
    // Add animation to hero section
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    const heroButtons = document.querySelector('.hero-buttons');
    
    // Add CSS for initial state
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(30px)';
    heroButtons.style.opacity = '0';
    heroButtons.style.transform = 'translateY(30px)';
    
    // Animate in sequence
    setTimeout(() => {
        heroTitle.style.transition = 'all 1s ease';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        heroText.style.transition = 'all 1s ease 0.2s';
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
    }, 600);
    
    setTimeout(() => {
        heroButtons.style.transition = 'all 1s ease 0.4s';
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
    }, 900);
    
    // Update WhatsApp button
    updateWhatsAppButton();
});

// Check scroll on scroll event
window.addEventListener('scroll', checkScroll);

// Initialize page with location hash
window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
});
// Portfolio JavaScript - Industry Standard Implementation

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // In a real implementation, you would send this to a server
            // For demo purposes, we'll simulate a successful submission
            simulateFormSubmission(formObject);
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.expertise-card, .project-card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.expertise-card, .project-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavOnScroll() {
        let scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active-nav');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active-nav');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Add active-nav styling to CSS
    const style = document.createElement('style');
    style.textContent = `
        .active-nav {
            color: var(--primary) !important;
            font-weight: 600 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Tech stack animation in hero code snippet
    const techStackElement = document.querySelector('.code-snippet code');
    if (techStackElement) {
        const techStacks = [
            "['HTML5', 'CSS3', 'ES6+', 'TypeScript']",
            "['React', 'Vue', 'Svelte', 'Next.js']",
            "['Webpack', 'Vite', 'Jest', 'Cypress']"
        ];
        
        let currentStack = 0;
        
        function rotateTechStack() {
            const codeLines = techStackElement.innerHTML.split('\n');
            codeLines[2] = `  this.techStack = ${techStacks[currentStack]};`;
            techStackElement.innerHTML = codeLines.join('\n');
            
            currentStack = (currentStack + 1) % techStacks.length;
        }
        
        // Rotate every 3 seconds
        setInterval(rotateTechStack, 3000);
    }
    
    // Form submission simulation
    function simulateFormSubmission(formData) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <div style="background: #d1fae5; color: #065f46; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; text-align: center;">
                    <p style="margin: 0; font-weight: 600;">Message sent successfully!</p>
                    <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">Thank you for your message. I'll respond within 24 hours.</p>
                </div>
            `;
            
            contactForm.appendChild(successMessage);
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    }
    
    // Initialize with animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
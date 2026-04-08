// JavaScript for IronEra Steel Ltd Website

document.addEventListener('DOMContentLoaded', function() {
    // Logo visibility based on scroll position
    const logosContainer = document.querySelector('.fixed.top-1.left-6');
    const heroSection = document.querySelector('.hero-section');
    let areLogosVisible = true;
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let heroHeight = heroSection ? heroSection.offsetHeight : 0;
        
        if (scrollTop < heroHeight - 100) {
            // On hero section - show logos
            if (!areLogosVisible) {
                logosContainer.style.opacity = '1';
                logosContainer.style.transform = 'translateY(0)';
                logosContainer.style.transition = 'all 0.3s ease-in-out';
                areLogosVisible = true;
            }
        } else {
            // Past hero section - hide logos
            if (areLogosVisible) {
                logosContainer.style.opacity = '0';
                logosContainer.style.transform = 'translateY(-20px)';
                logosContainer.style.transition = 'all 0.3s ease-in-out';
                areLogosVisible = false;
            }
        }
    });
    
    // Floating menu toggle
    const floatingMenuBtn = document.getElementById('floating-menu-btn');
    const floatingMenu = document.getElementById('floating-menu');
    
    if (floatingMenuBtn && floatingMenu) {
        floatingMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            floatingMenu.classList.toggle('hidden');
        });
    }
    
    // Close floating menu when clicking outside
    document.addEventListener('click', function() {
        if (floatingMenu) {
            floatingMenu.classList.add('hidden');
        }
    });
    
    // Close floating menu when clicking on a link
    const floatingLinks = floatingMenu?.querySelectorAll('a');
    if (floatingLinks) {
        floatingLinks.forEach(link => {
            link.addEventListener('click', function() {
                floatingMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation to sections when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add hover effect to feature boxes
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add active state to navigation based on scroll position
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('a[href^="#"]').forEach(link => {
                    link.classList.remove('text-blue-500');
                });
                
                // Add active class to current link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('text-blue-500');
                }
            }
        });
    }

    // Update navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);

    // Add header shadow on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add click-to-copy functionality for email
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent.replace('Email: ', '').trim();
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(function() {
                // Show success message
                const originalText = emailLink.innerHTML;
                emailLink.innerHTML = '<i class="fas fa-check mr-2"></i>Email copied!';
                emailLink.classList.add('text-green-400');
                
                setTimeout(function() {
                    emailLink.innerHTML = originalText;
                    emailLink.classList.remove('text-green-400');
                }, 2000);
            }).catch(function(err) {
                // Fallback: open email client
                window.location.href = `mailto:${email}`;
            });
        });
    }

    // Add loading animation removal
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or reset state
            document.querySelectorAll('.modal-open').forEach(modal => {
                modal.classList.remove('modal-open');
            });
        }
    });

    // Add print styles trigger
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });

    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    const debouncedScroll = debounce(updateActiveNavigation, 100);
    window.addEventListener('scroll', debouncedScroll);
});

// Utility functions
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add to viewport checker
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Form validation (if contact form is added later)
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

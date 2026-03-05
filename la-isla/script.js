// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
              mobileMenuBtn.classList.toggle('active');
              navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
              link.addEventListener('click', () => {
                            mobileMenuBtn.classList.remove('active');
                            navMenu.classList.remove('active');
              });
});

// Header scroll effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
              if (window.scrollY > 50) {
                            header.classList.add('scrolled');
              } else {
                            header.classList.remove('scrolled');
              }
});

// Add simple fade-in intersection observer for scroll animations later
const observerOptions = {
              root: null,
              rootMargin: '0px',
              threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                          entry.target.classList.add('fade-in-visible');
                                          observer.unobserve(entry.target);
                            }
              });
}, observerOptions);

// Use this by adding .fade-in to elements
document.querySelectorAll('.fade-in').forEach(element => {
              observer.observe(element);
});

// Menu Tabs Logic
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanes = document.querySelectorAll('.menu-pane');

menuTabs.forEach(tab => {
              tab.addEventListener('click', () => {
                            // Remove active class from all tabs and panes
                            menuTabs.forEach(t => t.classList.remove('active'));
                            menuPanes.forEach(p => p.classList.remove('active'));

                            // Add active class to clicked tab
                            tab.classList.add('active');

                            // Show corresponding pane
                            const targetId = tab.getAttribute('data-target');
                            const targetPane = document.getElementById(targetId);

                            if (targetPane) {
                                          targetPane.classList.add('active');

                                          // Re-trigger fade in animation
                                          targetPane.style.animation = 'none';
                                          targetPane.offsetHeight; /* trigger reflow */
                                          targetPane.style.animation = null;
                            }
              });
});


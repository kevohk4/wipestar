// ================== SAFE GETTER ==================
const $ = id => document.getElementById(id);

// ================== THEME TOGGLE ==================
const root = document.documentElement;
const themeToggleButtons = document.querySelectorAll('.theme-toggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggleButtons.forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });
}

// Apply saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Add event listeners
themeToggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
});


// ================== MOBILE MENU ==================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('navLinks');
const navLinks_list = document.querySelectorAll('.nav-links li a');

let overlay = document.getElementById('menuOverlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.id = 'menuOverlay';
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.4)';
 // overlay.style.zIndex = '1000';
  overlay.style.display = 'none';
  overlay.style.pointerEvents = 'auto';
  overlay.style.transition = 'opacity 0.3s ease';
  document.body.appendChild(overlay);
}

function openMenu() {
  navLinks.classList.add('active');
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
  menuToggle.innerHTML = '<i class="fas fa-times"></i>';
}

function closeMenu() {
  navLinks.classList.remove('active');
  overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

// Menu toggle button click
menuToggle.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  navLinks.classList.contains('active') ? closeMenu() : openMenu();
});

// Overlay click to close menu
overlay.addEventListener('click', closeMenu);

// Close menu when clicking on links
navLinks_list.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    // Close menu after a brief delay to allow navigation
    setTimeout(closeMenu, 100);
  });
});

// Close menu on window resize (back to desktop)
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

// Close menu with Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

// ================== SEARCH MODAL ==================
const searchModal = $('searchModal');
const closeSearch = $('closeSearch');

document.querySelectorAll('.search-btn').forEach(btn => {
  btn.addEventListener('click', () => searchModal?.classList.add('show'));
});

closeSearch?.addEventListener('click', () => searchModal?.classList.remove('show'));

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') searchModal?.classList.remove('show');
});

// ================== SCROLL TO TOP ==================
const scrollBtn = $('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (!scrollBtn) return;
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  scrollBtn.style.display = scrollTop > 150 ? 'flex' : 'none';
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

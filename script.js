/* ================================================
   TYPEWRITER — cycles through job titles
   ================================================ */
const titles = [
  'Applied AI & Systems Engineer',
  'Robotics & Embedded Engineer',
  'ML Infrastructure Engineer',
  'Mechatronics Specialist',
];

let ti = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const word = titles[ti];
  tw.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

  if (!deleting && ci > word.length) {
    deleting = true;
    setTimeout(type, 2200);
    return;
  }
  if (deleting && ci < 0) {
    deleting = false;
    ti = (ti + 1) % titles.length;
    setTimeout(type, 380);
    return;
  }
  setTimeout(type, deleting ? 38 : 62);
}
type();

/* ================================================
   NAV — darken on scroll + mobile toggle
   ================================================ */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60
    ? 'rgba(6, 9, 18, 0.97)'
    : 'rgba(6, 9, 18, 0.82)';
}, { passive: true });

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ================================================
   SCROLL FADE-UP — progressive enhancement
   ================================================ */
const fadeTargets = [
  '.project-card',
  '.tl-item',
  '.skill-card',
  '.about-text',
  '.about-photo',
  '.contact-wrap',
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(fadeTargets.join(',')).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

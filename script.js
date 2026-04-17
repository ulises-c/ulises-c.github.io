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
  '.personal-card',
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

/* ================================================
   PDF MODAL
   ================================================ */
const pdfModal    = document.getElementById('pdfModal');
const pdfClose    = document.getElementById('pdfClose');
const pdfBackdrop = document.getElementById('pdfBackdrop');
const pdfViewer   = document.getElementById('pdfViewer');
const pdfLoading  = document.getElementById('pdfLoading');

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

async function renderPdf(url) {
  pdfViewer.scrollTop = 0;
  Array.from(pdfViewer.querySelectorAll('canvas')).forEach(c => c.remove());
  pdfLoading.style.display = 'block';

  const pdf = await pdfjsLib.getDocument(url).promise;
  pdfLoading.style.display = 'none';

  const dpr = window.devicePixelRatio || 1;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page     = await pdf.getPage(i);
    const scale    = (pdfViewer.clientWidth * 0.9) / page.getViewport({ scale: 1 }).width;
    const viewport = page.getViewport({ scale });
    const canvas   = document.createElement('canvas');
    canvas.width   = viewport.width  * dpr;
    canvas.height  = viewport.height * dpr;
    canvas.style.width  = viewport.width  + 'px';
    canvas.style.height = viewport.height + 'px';
    pdfViewer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    await page.render({ canvasContext: ctx, viewport }).promise;
  }
}

document.getElementById('resumeBtn').addEventListener('click', e => {
  e.preventDefault();
  pdfModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderPdf('assets/resume.pdf');
});

function closePdfModal() {
  pdfModal.classList.remove('open');
  document.body.style.overflow = '';
}

pdfClose.addEventListener('click', closePdfModal);
pdfBackdrop.addEventListener('click', closePdfModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePdfModal();
});

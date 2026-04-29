/* =============================================
   JAI HANUMAN MADUGULA HALWA — SCRIPT.JS
   ============================================= */

/* ---- Sparkle Canvas ---- */
(function () {
  const canvas = document.getElementById('sparkleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function Particle() {
    this.reset = function () {
      this.x  = randomBetween(0, W);
      this.y  = randomBetween(0, H);
      this.r  = randomBetween(0.5, 2.5);
      this.vx = randomBetween(-0.3, 0.3);
      this.vy = randomBetween(-0.6, -0.1);
      this.alpha   = randomBetween(0.2, 1);
      this.decay   = randomBetween(0.003, 0.008);
      this.twinkle = Math.random() > 0.5;
      this.gold    = Math.random() > 0.35;
    };
    this.reset();
    this.y = randomBetween(0, H); // spread at start

    this.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      if (this.alpha <= 0) this.reset();
    };

    this.draw = function () {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      if (this.twinkle) {
        // Draw a 4-point star
        const s = this.r * 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - s);
        ctx.lineTo(this.x + s * 0.25, this.y - s * 0.25);
        ctx.lineTo(this.x + s, this.y);
        ctx.lineTo(this.x + s * 0.25, this.y + s * 0.25);
        ctx.lineTo(this.x, this.y + s);
        ctx.lineTo(this.x - s * 0.25, this.y + s * 0.25);
        ctx.lineTo(this.x - s, this.y);
        ctx.lineTo(this.x - s * 0.25, this.y - s * 0.25);
        ctx.closePath();
        ctx.fillStyle = this.gold ? '#FFD700' : '#FF8C00';
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.gold ? '#FFE55C' : '#FFA533';
        ctx.fill();
      }
      ctx.restore();
    };
  }

  // Create particles
  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ---- Intersection Observer — fade-in-up ---- */
(function () {
  const targets = document.querySelectorAll(
    '.product-card, .why-item, .testimonial-card, .order-card, .section-header'
  );
  targets.forEach(el => el.classList.add('fade-in-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Floating CTA hide on footer ---- */
(function () {
  const floatingBtn = document.getElementById('floating-call');
  const footer = document.getElementById('footer');
  if (!floatingBtn || !footer) return;

  const obs = new IntersectionObserver(entries => {
    floatingBtn.style.opacity = entries[0].isIntersecting ? '0' : '1';
    floatingBtn.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'auto';
  }, { threshold: 0.1 });
  obs.observe(footer);
})();

/* ---- PhonePe badge click to copy ---- */
(function () {
  const badge = document.getElementById('phonepe-badge');
  if (!badge) return;
  badge.addEventListener('click', () => {
    navigator.clipboard.writeText('6303424605').then(() => {
      const label = badge.querySelector('.phonepe-label');
      const orig = label.textContent;
      label.textContent = '✅ Number Copied!';
      setTimeout(() => { label.textContent = orig; }, 2000);
    }).catch(() => {});
  });
})();

/* ---- Hero parallax on scroll ---- */
(function () {
  const heroImg = document.querySelector('.hero-bg-img');
  if (!heroImg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroImg.style.transform = `scale(1.08) translateY(${y * 0.15}px)`;
  }, { passive: true });
})();

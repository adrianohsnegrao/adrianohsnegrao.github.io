/* ============================================================
   Adriano Negrão — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('nav-burger');
  const links = document.getElementById('nav-links');
  const toggleMenu = (force) => {
    const open = force !== undefined ? force : !links.classList.contains('open');
    links.classList.toggle('open', open);
    burger.classList.toggle('open', open);
  };
  burger.addEventListener('click', () => toggleMenu());
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Typed whoami line ---------- */
  const typeEl = document.getElementById('type-line');
  if (typeEl) {
    const text = 'Software Engineer · 13+ anos · backend, arquitetura & IA';
    if (prefersReduced) {
      typeEl.textContent = text;
    } else {
      let i = 0;
      const tick = () => {
        if (i <= text.length) {
          typeEl.textContent = text.slice(0, i);
          i++;
          setTimeout(tick, 38);
        }
      };
      setTimeout(tick, 600);
    }
  }

  /* ---------- Animated counters ---------- */
  const stats = document.querySelectorAll('.stat__num');
  const runCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const statsIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runCounter(e.target);
            statsIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    stats.forEach((s) => statsIO.observe(s));
  } else {
    stats.forEach(runCounter);
  }

  /* ---------- Animated background (constellation) ---------- */
  const canvas = document.getElementById('bg-canvas');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr, particles, mouse = { x: -999, y: -999 };

    const config = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 16000), 90);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
        r: (Math.random() * 1.4 + 0.4) * dpr,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const maxDist = 130 * dpr;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 255, 218, 0.55)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(91, 140, 255, ${0.12 * (1 - dist / maxDist)})`;
            ctx.lineWidth = dpr * 0.5;
            ctx.stroke();
          }
        }

        // link to cursor
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 160 * dpr) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(100, 255, 218, ${0.18 * (1 - mdist / (160 * dpr))})`;
          ctx.lineWidth = dpr * 0.6;
          ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    });
    window.addEventListener('mouseout', () => { mouse.x = -999; mouse.y = -999; });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(config, 200);
    });

    config();
    draw();
  }
})();

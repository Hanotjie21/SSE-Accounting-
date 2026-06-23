/**
 * SSE Accounting Firm - Interactive Script
 * Handles: scroll animations, counter, mobile menu, navbar scroll effect
 */

(function () {
  'use strict';

  // ============================================
  // DOM READY
  // ============================================
  document.addEventListener('DOMContentLoaded', function () {
    initNavbarScroll();
    initMobileMenu();
    initRevealStagger();
    initScrollReveal();
    initCounterAnimation();
    initSmoothScroll();
    initChartAnimation();
    initStatsCardFloat();
    initContactForm();
  });

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  function initNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var scrollThreshold = 50;

    function handleScroll() {
      if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
  }

  // ============================================
  // MOBILE HAMBURGER MENU
  // ============================================
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger-btn');
    var mobileNav = document.getElementById('mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    var mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // STAGGER REVEALS FOR POST-HERO CARD GROUPS
  // ============================================
  function initRevealStagger() {
    var groups = document.querySelectorAll(
      '.services-showcase__grid, .values__grid, .why__list, .industry-list, .proof-strip__inner'
    );

    groups.forEach(function (group) {
      var items = group.querySelectorAll('.reveal, article, span');

      items.forEach(function (item, index) {
        item.style.transitionDelay = Math.min(index * 70, 420) + 'ms';
      });
    });
  }

  // ============================================
  // SCROLL REVEAL (Intersection Observer)
  // ============================================
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      reveals.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ============================================
  // COUNTER ANIMATION (0 to 6 service areas)
  // ============================================
  function initCounterAnimation() {
    var statsValue = document.getElementById('stats-value');
    var statsCard = document.getElementById('stats-card');
    if (!statsValue || !statsCard) return;

    var targetValue = 6;
    var duration = 2000; // ms
    var hasAnimated = false;

    if (!('IntersectionObserver' in window)) {
      statsValue.textContent = targetValue.toLocaleString();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounter(statsValue, 0, targetValue, duration);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsCard);
  }

  /**
   * Animate a counter from start to end over duration (ms).
   * @param {HTMLElement} element
   * @param {number} start
   * @param {number} end
   * @param {number} duration
   */
  function animateCounter(element, start, end, duration) {
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(start + (end - start) * easedProgress);

      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // ============================================
  // CHART BAR ANIMATION
  // ============================================
  function initChartAnimation() {
    var chart = document.getElementById('stats-chart');
    if (!chart) return;

    var bars = chart.querySelectorAll('.hero__chart-bar');
    var targetHeights = ['30%', '55%', '75%', '40%', '90%', '100%'];

    // Set initial height to 0, then animate
    bars.forEach(function (bar) {
      var target = bar.style.height;
      bar.style.height = '0%';
      bar.dataset.targetHeight = target;
    });

    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (bar, i) {
        bar.style.height = targetHeights[i];
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            bars.forEach(function (bar, index) {
              setTimeout(function () {
                bar.style.height = bar.dataset.targetHeight || targetHeights[index];
              }, 150 * index);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(chart);
  }

  // ============================================
  // STATS CARD FLOAT IDLE ANIMATION
  // ============================================
  function initStatsCardFloat() {
    var statsCard = document.getElementById('stats-card');
    if (!statsCard) return;

    // After the initial floatIn animation ends, add the idle float class
    statsCard.addEventListener('animationend', function (e) {
      if (e.animationName === 'floatIn') {
        statsCard.classList.add('visible');
      }
    });
  }

  // ============================================
  // CONTACT FORM EMAIL COMPOSER
  // ============================================
  function initContactForm() {
    var form = document.getElementById('contact-form');
    var status = document.getElementById('contact-form-status');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var name = String(data.get('name') || '').trim();
      var email = String(data.get('email') || '').trim();
      var phone = String(data.get('phone') || '').trim();
      var service = String(data.get('service') || '').trim();
      var message = String(data.get('message') || '').trim();
      var subject = 'Website inquiry from ' + name;
      var body = [
        'Name: ' + name,
        'Email: ' + email,
        'Phone: ' + (phone || 'Not provided'),
        'Service: ' + service,
        '',
        'Message:',
        message,
      ].join('\n');

      if (status) {
        status.textContent = 'Opening your email app with the inquiry ready to send…';
      }

      window.location.href =
        'mailto:directorklazen@outlook.com?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body);
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR NAV LINKS
  // ============================================
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        var targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          var navbarHeight = 72;
          var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  }
})();

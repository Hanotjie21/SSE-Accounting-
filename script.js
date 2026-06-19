/**
 * SSE Investments — Interactive Script
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
    initScrollReveal();
    initCounterAnimation();
    initSmoothScroll();
    initChartAnimation();
    initStatsCardFloat();
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
  // COUNTER ANIMATION ($0 → $76000)
  // ============================================
  function initCounterAnimation() {
    var statsValue = document.getElementById('stats-value');
    var statsCard = document.getElementById('stats-card');
    if (!statsValue || !statsCard) return;

    var targetValue = 76000;
    var duration = 2000; // ms
    var hasAnimated = false;

    if (!('IntersectionObserver' in window)) {
      statsValue.textContent = '$' + targetValue.toLocaleString();
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

      element.textContent = '$' + current.toLocaleString();

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

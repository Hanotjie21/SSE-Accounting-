/**
 * SSE Accounting Firm - TypeScript Module
 * Type-safe definitions, DOM utilities, and animation controllers.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

/** Navigation item structure */
interface NavItem {
  label: string;
  href: string;
  id: string;
}

/** Stat card data */
interface StatCard {
  label: string;
  value: number;
  prefix: string;
  chartBars: ChartBar[];
}

/** Individual chart bar */
interface ChartBar {
  heightPercent: number;
  variant: 'navy' | 'gold' | 'light';
}

/** Industry entry */
interface CompanyLogo {
  name: string;
  cssClass: string;
  displayText: string;
}

/** Counter animation options */
interface CounterAnimationOptions {
  element: HTMLElement;
  start: number;
  end: number;
  duration: number;
  prefix?: string;
  suffix?: string;
  easing?: (t: number) => number;
}

/** Scroll reveal configuration */
interface ScrollRevealConfig {
  threshold: number;
  rootMargin: string;
  className: string;
}

// ============================================
// SITE DATA
// ============================================

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about', id: 'nav-about' },
  { label: 'Services', href: '#services', id: 'nav-services' },
  { label: 'Industries', href: '#industries', id: 'nav-industries' },
  { label: 'Leadership', href: '#leadership', id: 'nav-leadership' },
  { label: 'Contact', href: '#contact', id: 'nav-contact' },
];

const STATS_DATA: StatCard = {
  label: 'Service Focus',
  value: 6,
  prefix: '',
  chartBars: [
    { heightPercent: 30, variant: 'light' },
    { heightPercent: 55, variant: 'navy' },
    { heightPercent: 75, variant: 'gold' },
    { heightPercent: 40, variant: 'light' },
    { heightPercent: 90, variant: 'navy' },
    { heightPercent: 100, variant: 'gold' },
  ],
};

const COMPANY_LOGOS: CompanyLogo[] = [
  { name: 'Retail', cssClass: 'industry-list__item', displayText: 'Retail' },
  { name: 'Logistics and Transport', cssClass: 'industry-list__item', displayText: 'Logistics and Transport' },
  { name: 'Fishing Industry', cssClass: 'industry-list__item', displayText: 'Fishing Industry' },
  { name: 'Hospitality and Tourism', cssClass: 'industry-list__item', displayText: 'Hospitality and Tourism' },
  { name: 'Construction', cssClass: 'industry-list__item', displayText: 'Construction' },
  { name: 'SMEs', cssClass: 'industry-list__item', displayText: 'Small and Medium Enterprises' },
];

// ============================================
// EASING FUNCTIONS
// ============================================

const Easing = {
  /** Ease out cubic: decelerating to zero velocity */
  easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  },

  /** Ease out quart: more pronounced deceleration */
  easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4);
  },

  /** Ease in-out cubic: acceleration then deceleration */
  easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },
};

// ============================================
// DOM UTILITIES
// ============================================

/**
 * Type-safe querySelector shorthand.
 * Returns null if element doesn't exist or isn't the right type.
 */
function qs<T extends HTMLElement>(selector: string, parent: ParentNode = document): T | null {
  return parent.querySelector<T>(selector);
}

/**
 * Type-safe querySelectorAll shorthand.
 * Returns an array instead of NodeList.
 */
function qsa<T extends HTMLElement>(selector: string, parent: ParentNode = document): T[] {
  return Array.from(parent.querySelectorAll<T>(selector));
}

/**
 * Get element by ID with type safety.
 */
function byId<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

// ============================================
// ANIMATION CONTROLLER
// ============================================

class AnimationController {
  private observers: IntersectionObserver[] = [];

  /**
   * Animate a numeric counter.
   */
  animateCounter(options: CounterAnimationOptions): void {
    const {
      element,
      start,
      end,
      duration,
      prefix = '',
      suffix = '',
      easing = Easing.easeOutCubic,
    } = options;

    let startTime: number | null = null;

    const step = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easing(progress);
      const current = Math.floor(start + (end - start) * easedProgress);

      element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * Create an Intersection Observer for scroll-triggered reveals.
   */
  createScrollReveal(config: ScrollRevealConfig): void {
    const elements = qsa(`.${config.className}`);
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      }
    );

    elements.forEach((el) => observer.observe(el));
    this.observers.push(observer);
  }

  /**
   * Stagger-animate chart bars from 0 to their target height.
   */
  animateChartBars(chartElement: HTMLElement, staggerMs: number = 150): void {
    const bars = qsa<HTMLDivElement>('.hero__chart-bar', chartElement);

    bars.forEach((bar) => {
      const target = bar.style.height;
      bar.dataset.targetHeight = target;
      bar.style.height = '0%';
    });

    if (!('IntersectionObserver' in window)) {
      bars.forEach((bar) => {
        bar.style.height = bar.dataset.targetHeight || '0%';
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.height = bar.dataset.targetHeight || '0%';
              }, staggerMs * index);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(chartElement);
    this.observers.push(observer);
  }

  /**
   * Disconnect all observers (cleanup).
   */
  destroy(): void {
    this.observers.forEach((obs) => obs.disconnect());
    this.observers = [];
  }
}

// ============================================
// APP INITIALIZATION
// ============================================

class SSEAccountingApp {
  private animationController: AnimationController;

  constructor() {
    this.animationController = new AnimationController();
  }

  init(): void {
    this.initScrollReveal();
    this.initCounterAnimation();
    this.initChartAnimation();
  }

  private initScrollReveal(): void {
    this.animationController.createScrollReveal({
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
      className: 'reveal',
    });
  }

  private initCounterAnimation(): void {
    const statsValue = byId<HTMLDivElement>('stats-value');
    const statsCard = byId<HTMLDivElement>('stats-card');
    if (!statsValue || !statsCard) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animationController.animateCounter({
              element: statsValue,
              start: 0,
              end: STATS_DATA.value,
              duration: 2000,
              prefix: STATS_DATA.prefix,
              easing: Easing.easeOutCubic,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsCard);
  }

  private initChartAnimation(): void {
    const chart = byId<HTMLDivElement>('stats-chart');
    if (!chart) return;

    this.animationController.animateChartBars(chart);
  }

  destroy(): void {
    this.animationController.destroy();
  }
}

// Export for module usage
export {
  SSEAccountingApp,
  AnimationController,
  Easing,
  qs,
  qsa,
  byId,
  NAV_ITEMS,
  STATS_DATA,
  COMPANY_LOGOS,
};

// Export types
export type {
  NavItem,
  StatCard,
  ChartBar,
  CompanyLogo,
  CounterAnimationOptions,
  ScrollRevealConfig,
};

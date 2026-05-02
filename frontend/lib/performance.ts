// Performance monitoring utilities

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  cls?: number; // Cumulative Layout Shift
  fid?: number; // First Input Delay
  ttfb?: number; // Time to First Byte
}

export function reportWebVitals(metric: any) {
  // Send metrics to analytics
  if (typeof window !== 'undefined') {
    const body = JSON.stringify(metric);
    
    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/metrics', body);
    } else {
      fetch('/api/analytics/metrics', { body, method: 'POST', keepalive: true });
    }
  }
}

export function getPerformanceMetrics(): PerformanceMetrics {
  if (typeof window === 'undefined') {
    return {};
  }

  const metrics: PerformanceMetrics = {};

  // First Contentful Paint
  const paintEntries = performance.getEntriesByType('paint');
  const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
  if (fcp) {
    metrics.fcp = Math.round(fcp.startTime);
  }

  // Largest Contentful Paint
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    metrics.lcp = Math.round(lastEntry.startTime);
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // LCP observer not supported
  }

  // Time to First Byte
  const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigationTiming) {
    metrics.ttfb = Math.round(navigationTiming.responseStart - navigationTiming.fetchStart);
  }

  return metrics;
}

export function optimizeImages() {
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

export function prefetchLinks() {
  // Prefetch links on hover
  if ('requestIdleCallback' in window) {
    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href && link.href.startsWith('/')) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
      }
    });
  }
}

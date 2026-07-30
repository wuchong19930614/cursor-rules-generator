'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  GOOGLE_ANALYTICS_READY_EVENT,
  sanitizeAnalyticsPageLocation,
  trackPageView,
} from '@/lib/analytics';

/**
 * Tracks initial loads and meaningful App Router navigation manually.
 * Transient query parameters are removed before comparison, so replacing only
 * the generator's `s` state does not create another GA4 page view.
 */
export default function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const lastTrackedPageLocation = useRef<string | null>(null);

  useEffect(() => {
    const pageLocation = sanitizeAnalyticsPageLocation(window.location.href);

    if (lastTrackedPageLocation.current === pageLocation) return;

    const sendPageView = () => {
      if (lastTrackedPageLocation.current === pageLocation) return;
      trackPageView(
        pageLocation,
        lastTrackedPageLocation.current ?? document.referrer
      );
      lastTrackedPageLocation.current = pageLocation;
    };

    if (typeof window.gtag === 'function') {
      sendPageView();
      return;
    }

    window.addEventListener(GOOGLE_ANALYTICS_READY_EVENT, sendPageView, {
      once: true,
    });

    return () => {
      window.removeEventListener(GOOGLE_ANALYTICS_READY_EVENT, sendPageView);
    };
  }, [pathname, search]);

  return null;
}

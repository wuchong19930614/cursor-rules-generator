'use client';

import { Suspense, useSyncExternalStore } from 'react';
import Script from 'next/script';
import { getGoogleAnalyticsInitScript, GOOGLE_ANALYTICS_TAG_ID, isProductionAnalyticsUrl } from '@/lib/analytics';
import GoogleAnalyticsPageView from './google-analytics-page-view';

const subscribe = () => () => {};
const getSnapshot = () => isProductionAnalyticsUrl(window.location.href);
const getServerSnapshot = () => false;

/** Local tests and preview deployments must never populate production analytics. */
export default function ProductionAnalytics() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TAG_ID}`} strategy="lazyOnload" />
      <Script id="gtag-init" strategy="lazyOnload">
        {getGoogleAnalyticsInitScript(GOOGLE_ANALYTICS_TAG_ID)}
      </Script>
      <Script id="clarity-script" strategy="lazyOnload">
        {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "x58f26t4cc");`}
      </Script>
      <Suspense fallback={null}><GoogleAnalyticsPageView /></Suspense>
    </>
  );
}

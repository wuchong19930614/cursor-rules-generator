import { sanitizeEncodedGeneratorState } from '@/lib/generator/url-state';

const GENERATOR_STATE_PARAM = 's';

/**
 * Runs before hydration and before the afterInteractive analytics scripts.
 * Legacy links may contain custom rule content, so sanitize the URL immediately.
 */
try {
  const url = new URL(window.location.href);
  const encoded = url.searchParams.get(GENERATOR_STATE_PARAM);

  if (encoded) {
    const sanitized = sanitizeEncodedGeneratorState(encoded);
    if (sanitized) {
      url.searchParams.set(GENERATOR_STATE_PARAM, sanitized);
    } else {
      url.searchParams.delete(GENERATOR_STATE_PARAM);
    }

    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}${url.hash}`
    );
  }
} catch {
  // Invalid browser state must not prevent the application from loading.
}

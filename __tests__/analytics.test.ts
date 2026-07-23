import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getGoogleAnalyticsInitScript,
  GOOGLE_ANALYTICS_TAG_ID,
  sanitizeAnalyticsPageLocation,
  trackGeneratorEvent,
} from '@/lib/analytics';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('privacy-safe generator analytics', () => {
  it('removes transient authorization parameters while preserving attribution', () => {
    expect(
      sanitizeAnalyticsPageLocation(
        'https://www.cursorgenerator.dev/?state=opaque&code=secret&session_state=session&utm_source=google&utm_campaign=rules&gclid=click-id#generator'
      )
    ).toBe(
      'https://www.cursorgenerator.dev/?utm_source=google&utm_campaign=rules&gclid=click-id#generator'
    );
  });

  it('removes repeated transient parameters and leaves invalid input unchanged', () => {
    expect(
      sanitizeAnalyticsPageLocation(
        'https://www.cursorgenerator.dev/guides?code=first&code=second&keep=yes'
      )
    ).toBe('https://www.cursorgenerator.dev/guides?keep=yes');
    expect(sanitizeAnalyticsPageLocation('not a valid URL')).toBe(
      'not a valid URL'
    );
  });

  it('configures GA4 with a sanitized page_location', () => {
    const browserWindow = {
      location: {
        href: 'https://www.cursorgenerator.dev/?state=opaque&code=secret&utm_medium=organic#generator',
      },
      dataLayer: [] as IArguments[],
    };
    vi.stubGlobal('window', browserWindow);

    Function(getGoogleAnalyticsInitScript(GOOGLE_ANALYTICS_TAG_ID))();

    const configCall = Array.from(browserWindow.dataLayer[1]);
    expect(configCall).toEqual([
      'config',
      GOOGLE_ANALYTICS_TAG_ID,
      {
        page_location:
          'https://www.cursorgenerator.dev/?utm_medium=organic#generator',
      },
    ]);
    expect(browserWindow.location.href).toContain('state=opaque');
    expect(browserWindow.location.href).toContain('code=secret');
  });

  it('sends the allowlisted conversion metadata to GA4 and the event name to Clarity', () => {
    const gtag = vi.fn();
    const clarity = vi.fn();
    vi.stubGlobal('window', { gtag, clarity });

    trackGeneratorEvent('rules_download', {
      output_mode: 'project-rules',
      selected_tag_count: 2,
      file_count: 3,
      file_type: 'zip',
      delivery_method: 'download',
    });

    expect(gtag).toHaveBeenCalledWith('event', 'rules_download', {
      output_mode: 'project-rules',
      selected_tag_count: 2,
      file_count: 3,
      file_type: 'zip',
      delivery_method: 'download',
    });
    expect(clarity).toHaveBeenCalledWith('event', 'rules_download');
  });

  it('drops unexpected fields at the runtime analytics boundary', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });
    const unsafeTrack = trackGeneratorEvent as (
      name: 'rules_copy',
      params: Record<string, string | number>
    ) => void;

    unsafeTrack('rules_copy', {
      output_mode: 'agents-md',
      selected_tag_count: 1,
      file_count: 1,
      surface: 'generator_action',
      rule_content: 'SECRET_PROJECT_TOKEN',
    });

    expect(gtag).toHaveBeenCalledWith('event', 'rules_copy', {
      output_mode: 'agents-md',
      selected_tag_count: 1,
      file_count: 1,
      surface: 'generator_action',
    });
  });

  it('queues events when gtag has not loaded yet', () => {
    const browserWindow: { dataLayer?: unknown[] } = {};
    vi.stubGlobal('window', browserWindow);

    trackGeneratorEvent('generator_start', {
      entry_step: 1,
      output_mode: 'project-rules',
      selected_tag_count: 0,
      surface: 'generator',
    });

    expect(browserWindow.dataLayer).toEqual([
      [
        'event',
        'generator_start',
        {
          entry_step: 1,
          output_mode: 'project-rules',
          selected_tag_count: 0,
          surface: 'generator',
        },
      ],
    ]);
  });

  it('is a no-op during server rendering', () => {
    expect(() =>
      trackGeneratorEvent('generator_start', {
        entry_step: 1,
        output_mode: 'project-rules',
        selected_tag_count: 0,
        surface: 'generator',
      })
    ).not.toThrow();
  });
});

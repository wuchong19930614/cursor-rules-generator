import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackGeneratorEvent } from '@/lib/analytics';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('privacy-safe generator analytics', () => {
  it('sends the allowlisted conversion metadata to gtag', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });

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

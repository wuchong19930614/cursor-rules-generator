import type { OutputMode } from '@/lib/templates/types';

type AnalyticsValue = string | number;

type GeneratorEventParams = {
  generator_start: {
    entry_step: number;
    output_mode: OutputMode;
    selected_tag_count: number;
    surface: 'generator';
  };
  generator_step_complete: {
    step_number: number;
    step_name: string;
    output_mode: OutputMode;
    selected_tag_count: number;
  };
  template_select: {
    selection_action: 'select' | 'remove';
    selected_tag_count: number;
  };
  output_mode_select: {
    output_mode: OutputMode;
    previous_output_mode: OutputMode;
  };
  generator_complete: {
    output_mode: OutputMode;
    selected_tag_count: number;
    custom_rule_count: number;
    split_rules: number;
  };
  rules_copy: {
    output_mode: OutputMode;
    selected_tag_count: number;
    file_count: number;
    surface: 'generator_action' | 'generator_preview' | 'template_detail';
  };
  rules_download: {
    output_mode: OutputMode;
    selected_tag_count: number;
    file_count: number;
    file_type: 'mdc' | 'zip' | 'agents_md' | 'cursorrules';
    delivery_method: 'download' | 'clipboard_fallback';
  };
};

export type GeneratorEventName = keyof GeneratorEventParams;

const PARAM_ALLOWLIST: {
  [Name in GeneratorEventName]: ReadonlyArray<keyof GeneratorEventParams[Name]>;
} = {
  generator_start: [
    'entry_step',
    'output_mode',
    'selected_tag_count',
    'surface',
  ],
  generator_step_complete: [
    'step_number',
    'step_name',
    'output_mode',
    'selected_tag_count',
  ],
  template_select: [
    'selection_action',
    'selected_tag_count',
  ],
  output_mode_select: ['output_mode', 'previous_output_mode'],
  generator_complete: [
    'output_mode',
    'selected_tag_count',
    'custom_rule_count',
    'split_rules',
  ],
  rules_copy: [
    'output_mode',
    'selected_tag_count',
    'file_count',
    'surface',
  ],
  rules_download: [
    'output_mode',
    'selected_tag_count',
    'file_count',
    'file_type',
    'delivery_method',
  ],
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: 'event',
      eventName: string,
      params: Record<string, AnalyticsValue>
    ) => void;
    clarity?: (command: 'event', eventName: GeneratorEventName) => void;
  }
}

/**
 * Sends only allowlisted, aggregate product metadata. Rule titles, rule content,
 * generated output, search text, and URLs are never accepted by this boundary.
 */
export function trackGeneratorEvent<Name extends GeneratorEventName>(
  name: Name,
  params: GeneratorEventParams[Name]
): void {
  if (typeof window === 'undefined') return;

  const safeParams: Record<string, AnalyticsValue> = {};
  for (const key of PARAM_ALLOWLIST[name]) {
    const value = params[key];
    if (typeof value === 'string' || typeof value === 'number') {
      safeParams[String(key)] = value;
    }
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, safeParams);
  } else {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(['event', name, safeParams]);
  }

  // Clarity custom events intentionally receive only the allowlisted event name.
  // Event metadata stays in GA4 so no generated or user-provided content can
  // become a searchable Clarity session tag.
  if (typeof window.clarity === 'function') {
    window.clarity('event', name);
  }
}

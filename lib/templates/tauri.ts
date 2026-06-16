// lib/templates/tauri.ts
// Tauri 模板 — ≥3 sections，Rust 驱动的轻量桌面应用最佳实践

import type { CursorRuleTemplate } from './types';

export const tauriTemplate: CursorRuleTemplate = {
  id: 'tauri',
  name: 'Tauri',
  category: 'frontend',
  tags: ['tauri', 'rust', 'desktop'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: true,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'tauri-architecture',
      title: 'Tauri Architecture',
      optional: false,
      tags: ['tauri'],
      content: `- Separate concerns: Rust backend (src-tauri/) handles system operations, web frontend handles UI.
- Use Tauri commands (#[tauri::command]) for all backend operations — never call system APIs from the frontend.
- Keep the Rust backend focused on native functionality: file system, system tray, notifications, window management.
- Use the invoke() API in the frontend to call Rust commands, with typed parameters and return values.
- Configure tauri.conf.json with appropriate window settings, security policies, and bundle config.
- Use Tauri's event system for bidirectional communication between frontend and backend.`,
    },
    {
      id: 'tauri-security',
      title: 'Security',
      optional: false,
      tags: ['tauri'],
      content: `- Use the allowlist in tauri.conf.json to restrict which APIs are accessible from the frontend.
- Enable only the APIs your app actually needs — never enable the all permission broad flag.
- Use Tauri's CSP (Content Security Policy) to restrict resource loading.
- Validate all user input in Rust commands before processing.
- Use the tauri::api::path module for resolving standard directories instead of hardcoding paths.
- Keep Tauri CLI and Rust dependencies updated — follow the Tauri security advisories.
- Use Tauri's built-in updater for secure application updates.`,
    },
    {
      id: 'tauri-rust-backend',
      title: 'Rust Backend Patterns',
      optional: false,
      tags: ['tauri'],
      content: `- Use the Tauri State manager (tauri::State) for shared application state.
- Organize Rust code into modules: commands/, state/, utils/, error.rs.
- Use thiserror or anyhow for structured error handling in commands.
- Return Result<T, String> from Tauri commands for proper error propagation.
- Use async Tauri commands with tokio for non-blocking operations.
- Follow Rust naming conventions: snake_case functions, PascalCase types, SCREAMING_SNAKE_CASE constants.
- Use tracing or log crates for structured logging instead of println!.`,
    },
    {
      id: 'tauri-frontend',
      title: 'Frontend Integration',
      optional: false,
      tags: ['tauri'],
      content: `- Use @tauri-apps/api for calling Rust commands and accessing Tauri APIs from the frontend.
- Always handle invoke() errors with try/catch — Tauri commands can fail at runtime.
- Use TypeScript types that mirror your Rust command signatures for type safety.
- Use the @tauri-apps/api/window module for window management from the frontend.
- Prefer Tauri's built-in dialogs (tauri::api::dialog) over browser alert()/confirm().
- Keep the frontend framework-agnostic — Tauri works with React, Vue, Svelte, or vanilla HTML/JS.
- Use Vite for fast development builds — Tauri has first-class Vite integration.`,
    },
  ],
};

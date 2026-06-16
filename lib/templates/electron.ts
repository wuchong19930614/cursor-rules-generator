// lib/templates/electron.ts
// Electron 模板 — ≥3 sections，桌面应用最佳实践

import type { CursorRuleTemplate } from './types';

export const electronTemplate: CursorRuleTemplate = {
  id: 'electron',
  name: 'Electron',
  category: 'frontend',
  tags: ['electron', 'javascript', 'desktop'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: true,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'electron-architecture',
      title: 'Process Architecture',
      optional: false,
      tags: ['electron'],
      content: `- Use IPC (ipcMain/ipcRenderer) for main-renderer communication — never access Node APIs from renderer directly.
- Keep the main process minimal: app lifecycle, window management, native menus, and IPC handlers only.
- Use contextBridge.exposeInMainWorld() to safely expose APIs to the renderer process.
- Set contextIsolation: true and nodeIntegration: false in webPreferences for security.
- Use preload scripts to bridge main and renderer processes — never enable nodeIntegration.
- Use BrowserWindow with sandbox: true for untrusted content.`,
    },
    {
      id: 'electron-security',
      title: 'Security Best Practices',
      optional: false,
      tags: ['electron'],
      content: `- Validate all external URLs before loading them in BrowserWindow or webview.
- Use Content-Security-Policy headers to prevent XSS and code injection.
- Disable remote module: set enableRemoteModule: false.
- Never trust user input in IPC handlers — validate and sanitize all arguments.
- Use webContents.session.setPermissionRequestHandler() to manage permissions.
- Keep Electron and all dependencies updated to the latest stable versions.
- Use electron-builder or electron-forge for packaging with code signing.`,
    },
    {
      id: 'electron-performance',
      title: 'Performance & Optimization',
      optional: false,
      tags: ['electron'],
      content: `- Lazy-load heavy modules only when needed — avoid loading them at startup.
- Use BrowserWindow pooling for multi-window apps instead of creating/destroying windows repeatedly.
- Offload CPU-intensive work to a hidden BrowserWindow or Worker thread.
- Use webFrame.setZoomLevel() sparingly — prefer CSS zoom for UI scaling.
- Monitor memory usage and implement cleanup for long-running windows.
- Use requestIdleCallback for non-critical renderer work.
- Minimize main process synchronous operations — use async IPC handlers.`,
    },
    {
      id: 'electron-packaging',
      title: 'Packaging & Distribution',
      optional: true,
      tags: ['electron'],
      content: `- Use electron-builder for cross-platform packaging and auto-update support.
- Configure auto-update with electron-updater for seamless releases.
- Sign your application for macOS (notarization) and Windows (Authenticode).
- Use asar packaging for production builds to protect source code.
- Include only necessary native modules — prefer pure JS alternatives.
- Test on all target platforms before releasing.`,
    },
  ],
};

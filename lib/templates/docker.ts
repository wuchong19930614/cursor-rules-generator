// lib/templates/docker.ts
// Docker 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const dockerTemplate: CursorRuleTemplate = {
  id: 'docker',
  name: 'Docker',
  category: 'library',
  tags: ['docker', 'devops', 'backend', 'frontend'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'double',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'docker-dockerfile',
      title: 'Dockerfile Best Practices',
      optional: false,
      tags: ['docker'],
      content: `- Use multi-stage builds to minimize image size.
- Use specific base image tags — avoid :latest.
- Use {{INDENT}} spaces for indentation.
- Combine RUN commands with && to reduce layers.
- Use .dockerignore to exclude unnecessary files.
- Use COPY over ADD unless you need URL or archive extraction.`,
    },
    {
      id: 'docker-compose',
      title: 'Docker Compose',
      optional: false,
      tags: ['docker'],
      content: `- Define services in docker-compose.yml with explicit dependencies.
- Use depends_on with healthcheck conditions for startup ordering.
- Use named volumes for persistent data.
- Use environment variables and .env files — never hardcode secrets.
- Use profiles for optional services.
- Pin service image versions — don't use :latest in compose files.`,
    },
    {
      id: 'docker-security',
      title: 'Security',
      optional: false,
      tags: ['docker'],
      content: `- Never run containers as root — use USER directive.
- Use non-root base images when available (node:slim, python:slim).
- Scan images with docker scout or trivy before deployment.
- Use secrets management (Docker secrets, HashiCorp Vault) — not env vars.
- Use read-only root filesystem when possible (--read-only).
- Limit container capabilities with --cap-drop and --cap-add.`,
    },
    {
      id: 'docker-optimization',
      title: 'Image Optimization',
      optional: false,
      tags: ['docker'],
      content: `- Use Alpine or slim base images for smaller attack surface.
- Leverage build cache: copy dependency files before source code.
- Use --no-cache-dir for pip, --production for npm.
- Clean up package manager caches in the same RUN layer.
- Use layer caching strategically — order COPY commands by change frequency.
- Set resource limits (--memory, --cpus) for predictable performance.`,
    },
  ],
};

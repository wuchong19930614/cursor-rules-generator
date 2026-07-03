// components/generator/format-icons.tsx
// 输出格式卡片的线条图标 —— 替代原生 emoji,风格与站内其余 UI 一致(1.5px 描边,currentColor)

type IconProps = {
  className?: string;
};

const commonProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/** Project Rules — 目录 */
export function FolderIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M3.75 7.5a1.5 1.5 0 0 1 1.5-1.5h4.19c.4 0 .78.158 1.06.44l1.06 1.06c.282.282.663.44 1.06.44h5.63a1.5 1.5 0 0 1 1.5 1.5v7.06a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V7.5Z" />
    </svg>
  );
}

/** AGENTS.md — 单文件文档 */
export function DocumentIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M7.5 3.75h5.379a1.5 1.5 0 0 1 1.06.44l3.371 3.37a1.5 1.5 0 0 1 .44 1.061V19.5a1.5 1.5 0 0 1-1.5 1.5h-8.75a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M9 12.75h6M9 15.75h6M9 9.75h2.25" />
    </svg>
  );
}

/** Legacy .cursorrules — 归档 */
export function ArchiveIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M3.75 6a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v2.25h-16.5V6Z" />
      <path d="M4.5 8.25v9.75a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V8.25M10.125 12h3.75" />
    </svg>
  );
}

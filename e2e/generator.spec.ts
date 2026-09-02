import { readFile } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';
import JSZip from 'jszip';

type SharedState = {
  t: string[];
  om: 'project-rules' | 'agents-md' | 'legacy';
  rm?: 'always-apply' | 'intelligent' | 'file-specific' | 'manual';
  sr?: 0 | 1;
  gp?: string[];
};

function generatorUrl(state: SharedState): string {
  const encoded = Buffer.from(JSON.stringify(state)).toString('base64');
  return `/?s=${encodeURIComponent(encoded)}`;
}

async function finishWizard(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Next →' }).click();
  await page.getByRole('button', { name: 'Next →' }).click();
  await page.getByRole('button', { name: 'Next →' }).click();
  await page.getByRole('button', { name: 'Generate' }).click();
}

async function downloadFromMenu(
  page: Page,
  menuItemName: string
): Promise<{ filename: string; text: string; data: Buffer }> {
  await page.getByRole('button', { name: 'Download', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('menuitem', { name: menuItemName }).click();
  const download = await downloadPromise;
  const path = await download.path();

  expect(path).not.toBeNull();
  const data = await readFile(path!);
  return {
    filename: download.suggestedFilename(),
    text: data.toString('utf8'),
    data,
  };
}

test('restores shared state without a hydration error', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto(
    generatorUrl({ t: ['react'], om: 'agents-md', rm: 'manual' })
  );

  const agentsMode = page.getByRole('button', {
    name: /AGENTS\.md Single markdown file/,
  });
  await expect(agentsMode).toHaveClass(/border-blue-500/);
  await expect(page.locator('pre').first()).toContainText('# Cursor Rules');
  expect(pageErrors).toEqual([]);
});

test('downloads file-specific Project Rules with recommended globs', async ({
  page,
}) => {
  await page.goto(
    generatorUrl({
      t: ['react'],
      om: 'project-rules',
      rm: 'file-specific',
      sr: 0,
    })
  );

  await expect(page.locator('#globs-pattern')).toContainText(
    'src/**/*.{js,jsx,ts,tsx}'
  );
  await finishWizard(page);

  const download = await downloadFromMenu(page, 'Download .mdc');
  expect(download.filename).toBe('react.mdc');
  expect(download.text).toContain(
    '"src/**/*.{js,jsx,ts,tsx}"'
  );
  expect(download.text).toContain('alwaysApply: false');
  expect(download.text).toContain('# Project Structure');
});

test('downloads AGENTS.md output', async ({ page }) => {
  await page.goto(generatorUrl({ t: ['react'], om: 'agents-md' }));
  await finishWizard(page);

  const download = await downloadFromMenu(page, 'Download AGENTS.md');
  expect(download.filename).toBe('AGENTS.md');
  expect(download.text).toContain('# Cursor Rules');
  expect(download.text).toContain('## Project Structure');
  expect(download.text).not.toContain('alwaysApply:');
});

test('downloads legacy .cursorrules output', async ({ page }) => {
  await page.goto(generatorUrl({ t: ['go'], om: 'legacy' }));
  await finishWizard(page);

  const download = await downloadFromMenu(page, 'Download .cursorrules ZIP');
  expect(download.filename).toBe('cursorrules.zip');

  const archive = await JSZip.loadAsync(download.data);
  const cursorrules = archive.file('.cursorrules');
  expect(cursorrules).not.toBeNull();
  const content = await cursorrules!.async('text');
  expect(content).toContain('# Cursor Rules');
  expect(content).toContain('# Tech stack: go');
  expect(content).not.toContain('alwaysApply:');
});

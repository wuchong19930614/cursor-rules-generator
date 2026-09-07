import { expect, test } from '@playwright/test';

function generatorUrl(): string {
  const state = Buffer.from(
    JSON.stringify({ t: ['react'], om: 'project-rules' })
  ).toString('base64');
  return `/?s=${encodeURIComponent(state)}`;
}

test('supports keyboard navigation through the generator', async ({ page }) => {
  await page.goto(generatorUrl());

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator('#main-content')).toBeFocused();

  const agentsMode = page.getByRole('button', {
    name: /AGENTS\.md Single markdown file/,
  });
  await agentsMode.focus();
  await page.keyboard.press('Space');
  await expect(agentsMode).toHaveClass(/border-blue-500/);

  for (const heading of [
    'Select Your Tech Stack',
    'Coding Style Preferences',
    'Custom Rules',
  ]) {
    const nextButton = page.getByRole('button', { name: 'Next →' });
    await nextButton.focus();
    await page.keyboard.press('Enter');
    await expect(
      page.locator('#generator').getByRole('heading', { name: heading })
    ).toBeVisible();
  }

  const generateButton = page.getByRole('button', { name: 'Generate' });
  await generateButton.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('heading', { name: 'Your AGENTS.md is Ready!' })
  ).toBeVisible();
});

test('skip link reaches the main content on guide pages', async ({ page }) => {
  await page.goto('/guides/how-to-use-cursor-rules');

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.locator('#main-content')).toBeFocused();
});

test('manages focus in the download menu', async ({ page }) => {
  await page.goto(generatorUrl());

  for (let step = 0; step < 3; step += 1) {
    await page.getByRole('button', { name: 'Next →' }).click();
  }
  await page.getByRole('button', { name: 'Generate' }).click();

  const downloadButton = page.getByRole('button', {
    name: 'Download',
    exact: true,
  });
  await downloadButton.focus();
  await page.keyboard.press('Enter');

  const menuItem = page.getByRole('menuitem', { name: 'Download .mdc' });
  await expect(menuItem).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(downloadButton).toBeFocused();
  await expect(page.getByRole('menu')).toBeHidden();
});

test('supports arrow-key navigation between output tabs', async ({ page }) => {
  await page.goto('/templates/react');

  const projectRulesTab = page.getByRole('tab', {
    name: /Project Rules/,
  });
  const agentsTab = page.getByRole('tab', { name: /AGENTS\.md/ });

  await projectRulesTab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(agentsTab).toBeFocused();
  await expect(agentsTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('# Cursor Rules');
});

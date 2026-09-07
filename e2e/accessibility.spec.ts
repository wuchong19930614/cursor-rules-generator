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

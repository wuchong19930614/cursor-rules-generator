import { expect, test } from '@playwright/test';

function generatorUrl(): string {
  const state = Buffer.from(
    JSON.stringify({ t: ['react'], om: 'project-rules' })
  ).toString('base64');
  return `/?s=${encodeURIComponent(state)}`;
}

test('completes the generator without horizontal overflow on mobile', async ({
  page,
}) => {
  await page.goto(generatorUrl());

  const menuButton = page.getByRole('button', { name: 'Open menu' });
  await menuButton.tap();
  await expect(
    page.getByRole('link', { name: 'Generator', exact: true })
  ).toHaveAttribute('aria-current', 'page');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();

  await expect(page.getByRole('heading', { name: 'Choose Output Format' })).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    )
    .toBe(true);

  for (let step = 0; step < 3; step += 1) {
    await page.getByRole('button', { name: 'Next →' }).tap();
  }
  await page.getByRole('button', { name: 'Generate' }).tap();

  await expect(
    page.getByRole('heading', { name: 'Your Project Rules is Ready!' })
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Download', exact: true })).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    )
    .toBe(true);
});

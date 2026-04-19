const { test, expect } = require('@playwright/test');

test('@regression @e2e @create @toggle creates a task from the form and shows completed visual state after toggling', async ({ page }) => {
  const taskTitle = `Playwright task ${Date.now()}`;
  const taskNotes = 'Created by the browser test';

  await page.goto('/');

  await page.getByLabel('Task title').fill(taskTitle);
  await page.getByLabel('Optional due date').fill('2026-04-20');
  await page.getByLabel('Notes/details').fill(taskNotes);
  await page.getByRole('button', { name: 'Save task to backend' }).click();

  const taskCard = page.locator('article', { hasText: taskTitle }).first();

  await expect(taskCard).toContainText(taskTitle);
  await expect(taskCard).toContainText(taskNotes);
  await expect(taskCard.getByRole('button')).toHaveText('Mark complete');

  await taskCard.getByRole('button', { name: 'Mark complete' }).click();

  await expect(taskCard).toHaveClass(/completed/);
  await expect(taskCard.getByRole('button')).toHaveText('Mark undone');

  await page.reload();

  const reloadedTaskCard = page.locator('article', { hasText: taskTitle }).first();
  await expect(reloadedTaskCard).toHaveClass(/completed/);
  await expect(reloadedTaskCard.getByRole('button')).toHaveText('Mark undone');

  await reloadedTaskCard.getByRole('button', { name: 'Mark undone' }).click();
  await expect(reloadedTaskCard).not.toHaveClass(/completed/);
  await expect(reloadedTaskCard.getByRole('button')).toHaveText('Mark complete');
});

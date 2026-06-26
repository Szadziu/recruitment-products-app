import { escapeHtml } from '../utils/format';

export function renderError(container: HTMLElement, message: string, onRetry: () => void): void {
  container.innerHTML = `
    <div class="status status--error">
      <p>${escapeHtml(message)}</p>
      <button type="button" class="btn btn--retry">Spróbuj ponownie</button>
    </div>
  `;

  container.querySelector('.btn--retry')?.addEventListener('click', onRetry);
}

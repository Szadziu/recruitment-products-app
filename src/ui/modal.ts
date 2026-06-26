import type { Product } from '../types/product';
import { escapeHtml, formatPrice } from '../utils/format';

let modalElement: HTMLElement | null = null;

export function openModal(product: Product): void {
  closeModal();

  modalElement = document.createElement('div');
  modalElement.className = 'modal-overlay';
  modalElement.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button type="button" class="modal__close" aria-label="Zamknij">&times;</button>
      <h2 id="modal-title" class="modal__title">${escapeHtml(product.name)}</h2>
      <dl class="modal__details">
        <dt>ID</dt><dd>${product.id}</dd>
        <dt>Kategoria</dt><dd>${escapeHtml(product.category)}</dd>
        <dt>Cena</dt><dd>${formatPrice(product.price)}</dd>
        <dt>Dostępność</dt><dd>${product.stock ? 'Dostępny' : 'Niedostępny'}</dd>
        <dt>Tagi</dt><dd>${product.tags.map(escapeHtml).join(', ') || '—'}</dd>
        <dt>Opis</dt><dd>${escapeHtml(product.description)}</dd>
      </dl>
    </div>
  `;

  document.body.appendChild(modalElement);
  document.body.classList.add('modal-open');

  modalElement.addEventListener('click', (event) => {
    if (event.target === modalElement) closeModal();
  });
  modalElement.querySelector('.modal__close')!.addEventListener('click', closeModal);
  document.addEventListener('keydown', handleKeydown);
}

export function closeModal(): void {
  if (!modalElement) return;
  modalElement.remove();
  modalElement = null;
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleKeydown);
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') closeModal();
}

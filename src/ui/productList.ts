import type { Product } from '../types/product';
import { escapeHtml, formatPrice } from '../utils/format';

export function renderProducts(container: HTMLElement, products: Product[]): void {
  container.innerHTML = products.map(productCardTemplate).join('');
}

function productCardTemplate(product: Product): string {
  return `
    <article class="product-card" data-id="${product.id}" tabindex="0" role="button">
      <p class="product-card__id">#${product.id}</p>
      <h3 class="product-card__name">${escapeHtml(product.name)}</h3>
      <p class="product-card__category">${escapeHtml(product.category)}</p>
      <p class="product-card__price">${formatPrice(product.price)}</p>
    </article>
  `;
}

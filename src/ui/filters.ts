import type { Product } from '../types/product';
import { escapeHtml } from '../utils/format';

export interface FiltersState {
  category: string;
}

export function getCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((product) => product.category))).sort();
}

export function renderFilters(
  container: HTMLElement,
  categories: string[],
  state: FiltersState,
  onChange: (state: FiltersState) => void,
): void {
  container.innerHTML = `
    <label class="filter">
      <span class="filter__label">Kategoria</span>
      <select class="filter__select" id="category-filter">
        <option value="">Wszystkie</option>
        ${categories
          .map(
            (category) =>
              `<option value="${escapeHtml(category)}" ${category === state.category ? 'selected' : ''}>${escapeHtml(category)}</option>`,
          )
          .join('')}
      </select>
    </label>
  `;

  const select = container.querySelector<HTMLSelectElement>('#category-filter')!;
  select.addEventListener('change', () => {
    onChange({ ...state, category: select.value });
  });
}

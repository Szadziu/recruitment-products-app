import type { Product } from '../types/product';
import { escapeHtml } from '../utils/format';

export interface FiltersState {
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
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

    <label class="filter">
      <span class="filter__label">Cena od</span>
      <input class="filter__input" type="number" id="min-price-filter" min="0" step="0.01" value="${state.minPrice ?? ''}" placeholder="0" />
    </label>

    <label class="filter">
      <span class="filter__label">Cena do</span>
      <input class="filter__input" type="number" id="max-price-filter" min="0" step="0.01" value="${state.maxPrice ?? ''}" placeholder="9999" />
    </label>
  `;

  const select = container.querySelector<HTMLSelectElement>('#category-filter')!;
  select.addEventListener('change', () => {
    onChange({ ...state, category: select.value });
  });

  const minInput = container.querySelector<HTMLInputElement>('#min-price-filter')!;
  minInput.addEventListener('input', () => {
    onChange({ ...state, minPrice: minInput.value === '' ? null : Number(minInput.value) });
  });

  const maxInput = container.querySelector<HTMLInputElement>('#max-price-filter')!;
  maxInput.addEventListener('input', () => {
    onChange({ ...state, maxPrice: maxInput.value === '' ? null : Number(maxInput.value) });
  });
}

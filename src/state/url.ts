import type { FiltersState } from '../ui/filters';

export interface AppState extends FiltersState {
  page: number;
}

export function readStateFromUrl(): AppState {
  const params = new URLSearchParams(window.location.search);
  const minPriceRaw = params.get('minPrice');
  const maxPriceRaw = params.get('maxPrice');
  const pageRaw = params.get('page');

  return {
    category: params.get('category') ?? '',
    minPrice: minPriceRaw !== null && minPriceRaw !== '' ? Number(minPriceRaw) : null,
    maxPrice: maxPriceRaw !== null && maxPriceRaw !== '' ? Number(maxPriceRaw) : null,
    page: pageRaw !== null ? Math.max(1, Number(pageRaw)) : 1,
  };
}

export function writeStateToUrl(state: AppState): void {
  const params = new URLSearchParams();
  if (state.category) params.set('category', state.category);
  if (state.minPrice !== null) params.set('minPrice', String(state.minPrice));
  if (state.maxPrice !== null) params.set('maxPrice', String(state.maxPrice));
  if (state.page > 1) params.set('page', String(state.page));

  const query = params.toString();
  const newUrl = `${window.location.pathname}${query ? `?${query}` : ''}`;
  window.history.replaceState(null, '', newUrl);
}

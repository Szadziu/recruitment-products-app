import './styles/main.scss';
import type { Product } from './types/product';
import { fetchProducts } from './api/products';
import { renderLoading } from './ui/loading';
import { renderProducts } from './ui/productList';
import { renderError } from './ui/error';
import { renderEmpty } from './ui/empty';
import { renderFilters, getCategories, type FiltersState } from './ui/filters';
import { renderPagination } from './ui/pagination';

const PAGE_SIZE = 9;

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <header class="app-header">
    <h1>Lista produktów</h1>
  </header>

  <main class="app-main">
    <section class="filters" id="filters" aria-label="Filtry produktów"></section>
    <section class="products" id="products" aria-label="Lista produktów"></section>
    <nav class="pagination" id="pagination" aria-label="Paginacja"></nav>
  </main>
`;

const filtersContainer = document.querySelector<HTMLElement>('#filters')!;
const productsContainer = document.querySelector<HTMLElement>('#products')!;
const paginationContainer = document.querySelector<HTMLElement>('#pagination')!;

let allProducts: Product[] = [];
const filtersState: FiltersState = { category: '', minPrice: null, maxPrice: null };
let currentPage = 1;

function applyFilters(): void {
  const filtered = allProducts.filter((product) => {
    if (filtersState.category && product.category !== filtersState.category) return false;
    if (filtersState.minPrice !== null && product.price < filtersState.minPrice) return false;
    if (filtersState.maxPrice !== null && product.price > filtersState.maxPrice) return false;
    return true;
  });

  if (filtered.length === 0) {
    renderEmpty(productsContainer);
    paginationContainer.innerHTML = '';
    return;
  }

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  renderProducts(productsContainer, filtered.slice(start, start + PAGE_SIZE));
  renderPagination(paginationContainer, currentPage, totalPages, (page) => {
    currentPage = page;
    applyFilters();
  });
}

function setupFilters(products: Product[]): void {
  const categories = getCategories(products);
  renderFilters(filtersContainer, categories, filtersState, (newState) => {
    Object.assign(filtersState, newState);
    currentPage = 1;
    applyFilters();
  });
}

async function init(): Promise<void> {
  renderLoading(productsContainer);

  try {
    allProducts = await fetchProducts();
    setupFilters(allProducts);
    applyFilters();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd.';
    renderError(productsContainer, message, init);
  }
}

init();

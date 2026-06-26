import './styles/main.scss';
import { fetchProducts } from './api/products';
import { renderLoading } from './ui/loading';
import { renderProducts } from './ui/productList';
import { renderError } from './ui/error';

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

const productsContainer = document.querySelector<HTMLElement>('#products')!;

async function init(): Promise<void> {
  renderLoading(productsContainer);

  try {
    const products = await fetchProducts();
    renderProducts(productsContainer, products);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd.';
    renderError(productsContainer, message, init);
  }
}

init();

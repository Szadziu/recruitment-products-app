import './styles/main.scss';

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

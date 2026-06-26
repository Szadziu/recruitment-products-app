export function renderPagination(
  container: HTMLElement,
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
): void {
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <button type="button" class="btn btn--page" id="prev-page" ${currentPage === 1 ? 'disabled' : ''}>‹ Poprzednia</button>
    <span class="pagination__info">Strona ${currentPage} z ${totalPages}</span>
    <button type="button" class="btn btn--page" id="next-page" ${currentPage === totalPages ? 'disabled' : ''}>Następna ›</button>
  `;

  container.querySelector('#prev-page')!.addEventListener('click', () => onPageChange(currentPage - 1));
  container.querySelector('#next-page')!.addEventListener('click', () => onPageChange(currentPage + 1));
}

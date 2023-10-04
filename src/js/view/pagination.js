import { View, state } from '../model';
import { icons } from '../utils';
import { paginationContainer } from './domElements';

export const pagination = new View();
pagination.setParentElement(paginationContainer);
pagination.actionHandlers = {
  handlePagination(callback) {
    paginationContainer.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      callback(+btn.dataset.goTo);
    });
  },
};
pagination.setMarkupCallback(data => {
  const { currentPage, totalPages } = data;

  const prevBtn = `
    <button data-go-to="${
      currentPage - 1
    }"  class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
  `;

  const nextButton = `
    <button data-go-to="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
  `;

  return state.recipes.length > 0
    ? `
    ${currentPage > 1 ? prevBtn : ''}
    ${currentPage < totalPages ? nextButton : ''}
  `
    : '';
});

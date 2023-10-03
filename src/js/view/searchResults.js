import { View } from '../model';
import { icons } from '../utils';
import { searchResultsContainer, searchButton } from './domElements';

export const searchResults = new View();
searchResults.setParentElement(searchResultsContainer);
searchResults.actionHandlers = {
  getQuery(callback) {
    searchButton.addEventListener('submit', async function (e) {
      e.preventDefault();
      const query = e.target.querySelector('.search__field').value;
      await callback(query);
    });
  },
  setActiveRecipe() {
    const clearActiveRecipe = () =>
      document.querySelectorAll('preview').forEach(link => {
        link.closest('preview__link').classList.remove('preview__link--active');
      });
    ['hashchange', 'load'].forEach(event => {
      window.addEventListener(event, function () {
        const { hash } = window.location;
        const id = hash.slice(1);
        if (!id) return;
        const activeRecipe = document.getElementById(`preview-link-${id}`);
        if (!activeRecipe) return;
        clearActiveRecipe();
        activeRecipe.classList.add('preview__link--active');
      });
    });
    document.querySelectorAll('preview__link').forEach(link => {
      link.addEventListener('click', function (e) {
        clearActiveRecipe();
        e.target.classList.add('preview__link--active');
      });
    });
  },
};
searchResults.setMarkupCallback(data => {
  const { recipes } = data;
  if (!recipes.length) return;
  const markup = recipes.map(recipe => {
    const { id, title, publisher, image_url } = recipe;
    return `
        <li class="preview">
            <a id="preview-link-${id}" class="preview__link" href="#${id}">
            <figure class="preview__fig">
                <img src="${image_url}" alt="${title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${title}</h4>
                <p class="preview__publisher">${publisher}</p>
                <div class="preview__user-generated">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
            </div>
            </a>
        </li>
    `;
  });
  return markup.join('\n');
});

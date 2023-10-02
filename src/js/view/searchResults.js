import { View } from '../model';
import { icons } from '../utils';
import { searchResultsContainer, searchButton } from './domElements';

export const searchResults = new View();
searchResults.setParentElement(searchResultsContainer);
searchResults.actionHandlers.getQuery = callback =>
  searchButton.addEventListener('submit', async function (e) {
    e.preventDefault();
    const query = e.target.querySelector('.search__field').value;
    await callback(query);
  });
searchResults.setMarkupCallback(data => {
  const { recipes } = data;
  if (!recipes.length) return;
  const { hash } = window.location;
  const markup = recipes.map(recipe => {
    const { id, title, publisher, image_url } = recipe;
    return `
        <li class="preview">
            <a class="preview__link${
              hash.slice(1) === id ? ' preview__link--active' : ''
            }" href="#${id}">
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

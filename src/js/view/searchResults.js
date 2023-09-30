import { View } from '../model';
import { icons } from '../utils';
import { searchResultsContainer, searchButton } from './domElements';

export const searchResults = new View();
searchResults.setParentElement(searchResultsContainer);
searchResults.setActionElement(searchButton);
searchResults.setMarkupCallback(data => {
  const { recipes } = data;
  if (!recipes.length) return;
  const markup = recipes.map(recipe => {
    const { id, title, publisher, image_url } = recipe;
    return `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#${id}">
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

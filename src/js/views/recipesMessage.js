import icons from 'url:../../img/icons.svg';
import { View } from '../model';
import { recipeContainer } from './domElements';

export const recipesMessage = new View();
recipesMessage.setParentElement(recipeContainer);
recipesMessage.setMarkupCallback(data => {
  const className = data.isError ? 'error' : 'message';
  const icon = data.isError ? 'icon-alert-triangle' : 'icon-smile';
  return `
    <div class="${className}">
      <div>
        <svg>
          <use href="${icons}#${icon}"></use>
        </svg>
      </div>
      <p>${data.message}</p>
    </div>
  `;
});

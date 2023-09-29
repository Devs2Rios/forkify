import icons from 'url:../../img/icons.svg';
import { View } from '../model';

export const recipesError = new View();
recipesError.setMarkupCallback(
  error => `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${error.message}</p>
    </div>
  `
);

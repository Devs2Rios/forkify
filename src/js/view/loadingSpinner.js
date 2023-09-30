import { icons } from '../utils';
import { View } from '../model';
import { recipeContainer } from './domElements';

export const loadingSpinner = new View();
loadingSpinner.setParentElement(recipeContainer);
loadingSpinner.setMarkupCallback(
  _ => `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
    `
);

import icons from 'url:../../img/icons.svg';
import { View } from '../model';

export const loadingSpinner = new View();
loadingSpinner.setMarkupCallback(
  _ => `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
    `
);

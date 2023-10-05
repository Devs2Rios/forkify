import { View } from '../model';
import { bookmarkContainer } from './domElements';
import { icons } from '../utils';

export const bookmarkList = new View();
bookmarkList.setParentElement(bookmarkContainer);
bookmarkList.setMarkupCallback(
  bookmarks =>
    `
        <ul class="bookmarks__list">
            ${
              bookmarks.length > 0
                ? bookmarks
                    .map(recipe => {
                      const { id, title, publisher, image_url } = recipe;
                      return `
                            <li class="preview">
                            <a class="preview__link ${
                              id === window.location.hash.slice(1)
                                ? 'preview__link--active'
                                : ''
                            }" href="#${id}">
                                <figure class="preview__fig">
                                <img src="${image_url}" alt="${title}" />
                                </figure>
                                <div class="preview__data">
                                    <h4 class="preview__title">${title}</h4>
                                    <p class="preview__publisher">${publisher}</p>
                                    <div class="preview__user-generated hidden">
                                        <svg>
                                        <use href="${icons}#icon-user"></use>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                            </li>
                          `;
                    })
                    .join('\n')
                : `
                <div class="message">
                    <div>
                        <svg>
                        <use href="src/img/icons.svg#icon-smile"></use>
                        </svg>
                    </div>
                    <p>
                        No bookmarks yet. Find a nice recipe and bookmark it 😀
                    </p>
                </div>
                `
            }
        </ul>
    `
);

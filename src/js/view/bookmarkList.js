import { View } from '../model';
import { bookmarkContainer } from './domElements';

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
                      console.log(recipe);
                      return `
                          <li class="bookmarks__item">
                              <a href="#${id}" class="bookmarks__link">
                                  <figure class="bookmarks__fig">
                                      <img src="${image_url}" alt="${title}">
                                  </figure>
                                  <div class="bookmarks__data">
                                      <h4 class="bookmarks__name">${title}</h4>
                                      <p class="bookmarks__author">${publisher}</p>
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

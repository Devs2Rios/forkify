import { icons } from '../../utils';

export class View {
  #markupCallback = () => {};
  #parentElement = null;
  #data = null;
  actionHandlers = {};

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;
    this.#data = data;
    this.#clear();
    const markup = this.#generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  setParentElement(parentElement) {
    this.#parentElement = parentElement;
  }

  setMarkupCallback(markupCallback) {
    this.#markupCallback = markupCallback;
  }

  renderHandler(events, callback) {
    events.forEach(event => window.addEventListener(event, callback));
  }

  loadSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message, isError = false) {
    const className = isError ? 'error' : 'message';
    const icon = isError ? 'icon-alert-triangle' : 'icon-smile';
    const markup = `
      <div class="${className}">
        <div>
          <svg>
            <use href="${icons}#${icon}"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup() {
    return this.#markupCallback(this.#data);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

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

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderMessage(
        'There was a problem with the server, please reload the page and try again',
        true
      );
    this.#data = data;
    const newMarkup = this.#generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this.#parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        curEl.textContent = newEl.textContent;
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
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

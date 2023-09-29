export class View {
  #markupCallback = () => {};
  #parentElement = null;
  #data = null;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  setParentElement(parentElement) {
    this.#parentElement = parentElement;
  }

  setMarkupCallback(markupCallback) {
    this.#markupCallback = markupCallback;
  }

  #generateMarkup() {
    return this.#markupCallback(this.#data);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

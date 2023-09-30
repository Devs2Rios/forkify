export class View {
  #markupCallback = () => {};
  #parentElement = null;
  #actionElement = null;
  #data = null;
  isError = false;

  render(data) {
    this.#data = data;
    this.#clear();
    const markup = this.#generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  setParentElement(parentElement) {
    this.#parentElement = parentElement;
  }

  setActionElement(actionElement) {
    this.#actionElement = actionElement;
  }

  setMarkupCallback(markupCallback) {
    this.#markupCallback = markupCallback;
  }

  renderHandler(events, callback) {
    events.forEach(event => window.addEventListener(event, callback));
  }

  actionHandler(event, callback) {
    this.#actionElement.addEventListener(event, callback);
  }

  getQuery(element) {
    return element.querySelector('.search__field').value;
  }

  #generateMarkup() {
    return this.#markupCallback(this.#data);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

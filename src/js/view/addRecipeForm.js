import { View } from '../model';
import { icons } from '../utils';
import {
  upload,
  overlay,
  addRecipeWindow,
  addRecipeBtnOpen,
  addRecipeBtnClose,
} from './domElements';

const addRecipeEls = [overlay, addRecipeWindow];
const closeEls = [overlay, addRecipeBtnClose];

export const addRecipeForm = new View();
addRecipeForm.setParentElement(upload);
addRecipeForm.actionHandlers = {
  openWindow() {
    addRecipeBtnOpen.addEventListener('click', function () {
      addRecipeEls.forEach(el => el.classList.toggle('hidden'));
    });
  },
  closeWindow() {
    closeEls.forEach(el =>
      el.addEventListener('click', function () {
        addRecipeEls.forEach(el => el.classList.add('hidden'));
      })
    );
  },
  forceClose() {
    addRecipeEls.forEach(el => el.classList.add('hidden'));
  },
  uploadContent(callback) {
    upload.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      callback(data);
    });
  },
};
addRecipeForm.setMarkupCallback(
  _ => `
    <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="Mole Poblano" required name="title" type="text" />
        <label>URL</label>
        <input value="https://laroussecocina.mx/receta/mole-poblano-2/" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="https://laroussecocina.mx/wp-content/uploads/2017/12/mole-poblano-001-larousse-cocina_0-e1671586546996.jpg.webp" required name="image" type="text" />
        <label>Publisher</label>
        <input value="Larousse Cocina" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="50" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="24" required name="servings" type="number" />
    </div>
    <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
            value="0.5,kg,mole"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 2</label>
        <input
            value="24,pieces,chicken"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
            value="0.5,kg,tortillas"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 4</label>
        <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 5</label>
        <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 6</label>
        <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
        />
    </div>
    <button class="btn upload__btn">
        <svg>
            <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
    </button>
    `
);

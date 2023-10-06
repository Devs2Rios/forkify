export class Ingredient {
  constructor(ingredient) {
    if (!/\d*,[A-Za-z0-9]*,[A-Za-z0-9]*/.test(ingredient)) {
      throw new Error('Ingredient is not valid');
    }
    const [quantity, unit, description] = ingredient
      .replaceAll(' ', '')
      .split(',');
    this.quantity = quantity ? +quantity : null;
    this.unit = unit || null;
    this.description = description || null;
  }
}

export class Recipe {
  id = 0;
  title = '';
  servings = 0;
  cooking_time = 0;
  publisher = '';
  ingredients = [];
  image_url = '';
  source_url = '';
  bookmarked = false;
  key = null;

  fill(recipe) {
    const {
      id,
      title,
      servings,
      publisher,
      ingredients,
      image_url,
      source_url,
      key,
    } = recipe;
    this.id = id;
    this.title = title;
    this.servings = servings;
    this.publisher = publisher;
    this.ingredients = ingredients;
    this.image_url = image_url;
    this.source_url = source_url;
    this.key = key || null;
  }
}

export class RecipeRequest {
  constructor(formData) {
    const { title, sourceUrl, image, publisher, cookingTime, servings } =
      formData;
    this.title = title;
    this.publisher = publisher;
    this.servings = +servings;
    this.source_url = sourceUrl;
    this.image_url = image;
    this.cooking_time = +cookingTime;
    this.ingredients = Object.entries(formData)
      .filter(entry => entry[0].includes('ingredient') && entry[1] !== '')
      .map(entry => new Ingredient(entry[1]));
  }
}

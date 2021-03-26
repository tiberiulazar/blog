import { CategoriesActionTypes } from "./categories.types";

export const setCategories = (categories) => ({
  type: CategoriesActionTypes.SET_CATEGORIES,
  payload: categories,
});

export const addCategory = (category) => ({
  type: CategoriesActionTypes.ADD_CATEGORY,
  payload: category,
});

export const deleteCategory = (cateogryId) => ({
  type: CategoriesActionTypes.DELETE_CATEGORY,
  payload: cateogryId,
});

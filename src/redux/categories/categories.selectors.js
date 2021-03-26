import { createSelector } from "reselect";

const selectCategories = (state) => state.categoriesList;

export const selectCategoriesList = createSelector(
  [selectCategories],
  (categoriesList) => categoriesList.categories
);

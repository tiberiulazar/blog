import { CategoriesActionTypes } from "./categories.types";
import { addCategoryToList, deleteCategoryFromList } from "./categories.utils";

const INITIAL_STATE = {
  categories: [],
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoriesActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case CategoriesActionTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: addCategoryToList(state.categories, action.payload),
      };

    case CategoriesActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: deleteCategoryFromList(state.categories, action.payload),
      };
    default:
      return state;
  }
};

export default categoriesReducer;

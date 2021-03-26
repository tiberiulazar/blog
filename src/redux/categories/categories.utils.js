export const addCategoryToList = (categoriesList, categoryToAdd) => {
  const categoryExists = categoriesList.find(
    (category) => category.categoryName === categoryToAdd.categoryName
  );

  if (!categoryExists) {
    return [...categoriesList, categoryToAdd];
  }

  return categoriesList;
};

export const deleteCategoryFromList = (categoriesList, categoryId) => {
  const newCategoriesList = [];
  categoriesList.forEach((category) => {
    if (category.id !== categoryId) newCategoriesList.push(category);
  });
  return newCategoriesList;
};

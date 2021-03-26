import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CategoryCard from "../../components/category-card/category-card.component";

import { addCategoryToData } from "../../firebase/firebase.utils";
import { addCategory } from "../../redux/categories/categories.actions";

import { selectCategoriesList } from "../../redux/categories/categories.selectors";

import "./categories.style.scss";

const CategoriesPage = ({ categories, addCategory }) => {
  const [category, setCategory] = useState("");

  const handleAddCategory = async () => {
    console.log("category", category);
    const categoryKey = category.split(" ").join("");
    const currentTime = new Date();
    const categoryToAdd = {
      categoryName: category,
      createdAt: currentTime,
    };
    await addCategoryToData(categoryKey, categoryToAdd);
    setCategory("");
    addCategory({ ...categoryToAdd, id: categoryKey });
  };

  return (
    <div className="categories">
      <h1>Categories page</h1>
      <div className="add-category">
        <input
          type="text"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <button type="button" onClick={handleAddCategory}>
          Add category
        </button>

        {categories.map(({ categoryName, id }) => (
          <CategoryCard key={id} cid={id} categoryName={categoryName} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategoriesList,
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (category) => dispatch(addCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);

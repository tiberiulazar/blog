import { useState } from "react";
import { connect } from "react-redux";
import { deleteCategoryFromFirestore } from "../../firebase/firebase.utils";
import { deleteCategory } from "../../redux/categories/categories.actions";
import CategoryPopup from "../category-popup/category-popup.component";
import "./category-card.style.scss";

const CategoryCard = ({ categoryName, cid, deleteCategory }) => {
  const handleDelete = async () => {
    await deleteCategoryFromFirestore(cid, true);
    deleteCategory(cid);
  };

  const [editPopup, setEditPopup] = useState(false);

  return (
    <div className="category-card">
      <h2 className="category-card__name">{categoryName}</h2>
      <button type="button" onClick={() => setEditPopup(true)}>
        Edit
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>

      {editPopup ? (
        <CategoryPopup
          category={{ categoryName, cid }}
          handlePopupView={() => setEditPopup(false)}
        />
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
});

export default connect(null, mapDispatchToProps)(CategoryCard);

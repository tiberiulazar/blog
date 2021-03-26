import { useImperativeHandle, useState } from "react";
import { editCategoryName } from "../../firebase/firebase.utils";
import "./category-popup.style.scss";

const CategoryPopup = ({ handlePopupView, category }) => {
  const [newTitle, setNewTitle] = useState("");
  const handleUpdate = async () => {
    if (newTitle) {
      const categoryKey = newTitle.split(" ").join("");
      const createdAt = new Date();
      const newCategory = {
        ...category,
        categoryName: newTitle,
        createdAt,
      };
      delete newCategory.cid;
      await editCategoryName(category.cid, categoryKey, newCategory);
      handlePopupView();
    } else {
      console.log("Empty field!");
      return;
    }
  };

  return (
    <div className="category-card__edit">
      <p>Enter new title:</p>
      <input type="text" onChange={(e) => setNewTitle(e.target.value)} />
      <button type="button" onClick={handleUpdate}>
        Update
      </button>
      <button type="button" onClick={handlePopupView}>
        Close
      </button>
    </div>
  );
};

export default CategoryPopup;

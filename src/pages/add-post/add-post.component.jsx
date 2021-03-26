import { useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";

import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editor.constants";

import { addPostToFirebase } from "../../firebase/firebase.utils";
import { selectCategoriesList } from "../../redux/categories/categories.selectors";
import { addPost, setPosts } from "../../redux/posts/posts.actions";

import "./add-post.style.scss";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const AddPostPage = ({ categories, addPostToStore, history, currentUser }) => {
  const instanceRef = useRef(null);

  let categoryDefaultValue = "";
  categories.length > 0
    ? (categoryDefaultValue = categories[0].id)
    : (categoryDefaultValue = "null");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categoryDefaultValue);
  const [postText, setPostText] = useState("");

  const handleSubmit = async () => {
    const createdAt = new Date();

    const savedData = await instanceRef.current.save();
    const blocks = savedData.blocks;

    const postToAdd = {
      title,
      category,
      createdAt,
      blocks,
      author: currentUser.displayName,
    };

    if (!title || !category || !blocks.length > 0) {
      console.log("There are empty fields!");
      return;
    }

    try {
      ////let postForStore = await addPostToFirebase(postToAdd);
      //// addPostToStore(await addPostToFirebase(postToAdd));
      ////console.log("sa vad", await addPostToFirebase(postToAdd));
      addPostToFirebase(postToAdd, addPostToStore);
      // setTitle("");
      // setCategory("");
      // setPostText("");
      history.push("/admin/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-post">
      {categories.length > 0 ? (
        <div>
          <div className="add-post__header">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title..."
              value={title}
              className="add-post__title"
            />
            <select
              name="category"
              id=""
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {categories.map(({ categoryName, id }) => (
                <option value={id} key={id}>
                  {categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* <textarea
            name="postText"
            id=""
            cols="30"
            rows="10"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea> */}
          <div className="add-post__editor cdx-block">
            <EditorJs
              instanceRef={(instance) => (instanceRef.current = instance)}
              tools={EDITOR_JS_TOOLS}
              data={{}}
              autofocus={true}
              placeholder="Let's write an awesome story!"
            />
          </div>

          <div className="cdx-button add-post__submit" onClick={handleSubmit}>
            Add post
          </div>
        </div>
      ) : (
        <p>
          You can't add posts because there is no category! Add categories
          before.
        </p>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategoriesList,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addPostToStore: (post) => dispatch(addPost(post)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddPostPage)
);

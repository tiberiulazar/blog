import { useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";

import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../add-post/editor.constants";

import {
  addPostToFirebase,
  editExistingPost,
} from "../../firebase/firebase.utils";
import { selectCategoriesList } from "../../redux/categories/categories.selectors";
import { addPost, setPosts } from "../../redux/posts/posts.actions";

import "../add-post/add-post.style.scss";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectPostById } from "../../redux/posts/posts.selectors";

const EditPostPage = ({
  categories,
  addPostToStore,
  history,
  currentUser,
  currentPost,
}) => {
  console.log("current post", currentPost);
  const instanceRef = useRef(null);

  let categoryDefaultValue = currentPost.category;

  const [title, setTitle] = useState(currentPost.title);
  const [category, setCategory] = useState(categoryDefaultValue);

  const handleSubmit = async () => {
    const createdAt = new Date();

    const savedData = await instanceRef.current.save();
    const blocks = savedData.blocks;

    const newPost = {
      ...currentPost,
      title,
      category,
      blocks,
    };

    if (!title || !category || !blocks.length > 0) {
      console.log("There are empty fields!");
      return;
    }

    try {
      ////let postForStore = await addPostToFirebase(postToAdd);
      //// addPostToStore(await addPostToFirebase(postToAdd));
      ////console.log("sa vad", await addPostToFirebase(postToAdd));
      editExistingPost(newPost);
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
              data={{ blocks: currentPost.blocks }}
              autofocus={true}
              placeholder="Let's write an awesome story!"
            />
          </div>
          <div className="cdx-button add-post__submit" onClick={handleSubmit}>
            Update post
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

// // const mapStateToProps = createStructuredSelector({
// //   categories: selectCategoriesList,
// //   currentUser: selectCurrentUser,
// //   currentPost: state.postsList.posts.find(
//     (post) => post.id === ownProps.match.params.pageId
//     )
// // });

const mapStateToProps = (state, ownProps) => ({
  categories: state.categoriesList.categories,
  currentUser: state.user.currentUser,
  currentPost: state.postsList.posts.find(
    (post) => post.id === ownProps.match.params.pageId
  ),
});

const mapDispatchToProps = (dispatch) => ({
  addPostToStore: (post) => dispatch(addPost(post)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditPostPage)
);

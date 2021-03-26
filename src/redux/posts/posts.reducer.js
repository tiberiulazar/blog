import { PostsActionTypes } from "./posts.types";
import { addPostToList, deletePostFromList } from "./posts.utils";

const INITIAL_STATE = {
  posts: [],
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostsActionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case PostsActionTypes.ADD_POST:
      return {
        ...state,
        posts: addPostToList(state.posts, action.payload),
      };
    case PostsActionTypes.DELETE_POST:
      return {
        ...state,
        posts: deletePostFromList(state.posts, action.payload),
      };
    default:
      return state;
  }
};

export default postsReducer;

import { PostsActionTypes } from "./posts.types";

export const setPosts = (posts) => ({
  type: PostsActionTypes.SET_POSTS,
  payload: posts,
});

export const addPost = (post) => ({
  type: PostsActionTypes.ADD_POST,
  payload: post,
});

export const deletePost = (post) => ({
  type: PostsActionTypes.DELETE_POST,
  payload: post,
});

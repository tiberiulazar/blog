import { memoize } from "lodash";
import { createSelector } from "reselect";

const selectPosts = (state) => state.postsList;

export const selectPostsList = createSelector(
  [selectPosts],
  (postsList) => postsList.posts
);

export const selectPostById = memoize((postUrlId) => {
  createSelector([selectPostsList], (postsList) =>
    postsList.find((post) => post.id === postUrlId)
  );
});

import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectUserType = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    if (currentUser) return currentUser.userType;
  }
);

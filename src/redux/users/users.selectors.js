import { createSelector } from "reselect";

const selectUsers = (state) => state.usersList;

export const selectUsersList = createSelector(
  [selectUsers],
  (usersList) => usersList.users
);

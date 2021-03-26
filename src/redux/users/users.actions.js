import { UsersActionTypes } from "./users.types";

export const setUsers = (users) => ({
  type: UsersActionTypes.SET_USERS,
  payload: users,
});

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoriesReducer from "./categories/categories.reducer";
import postsReducer from "./posts/posts.reducer";
import userReducer from "./user/user.reducer";
import usersReducer from "./users/users.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  categoriesList: categoriesReducer,
  postsList: postsReducer,
  usersList: usersReducer,
});

export default persistReducer(persistConfig, rootReducer);

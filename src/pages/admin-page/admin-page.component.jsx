import { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import AdminMenu from "../../components/admin-menu/admin-menu.component";
import {
  convertUsersSnapshotToMap,
  firestore,
  getAllPosts,
  getCategories,
} from "../../firebase/firebase.utils";
import { setCategories } from "../../redux/categories/categories.actions";
import { setPosts } from "../../redux/posts/posts.actions";
import { selectUserType } from "../../redux/user/user.selectors";
import { setUsers } from "../../redux/users/users.actions";
import AddPostPage from "../add-post/add-post.component";
import CategoriesPage from "../categories/categories.component";
import EditPostPage from "../edit-post/edit-post.component";
import PostsPage from "../posts/posts.component";
import UsersPage from "../users/users.component";

const AdminPage = ({ match, setCategories, setPosts, setUsers, userType }) => {
  useEffect(() => {
    const usersRef = firestore.collection("users");
    usersRef.onSnapshot(async (snapshot) => {
      const usersMap = convertUsersSnapshotToMap(snapshot);
      setUsers(usersMap);
    });
  }, [setCategories, setPosts]);

  return (
    <div className="admin">
      <p>Admin page</p>
      <AdminMenu />
      <Switch>
        <Route
          exact
          path={`${match.path}/categories`}
          component={CategoriesPage}
        />
        <Route exact path={`${match.path}/posts`} component={PostsPage} />
        <Route
          path={`${match.path}/users`}
          render={() =>
            userType === "admin" ? <UsersPage /> : <Redirect to="/admin" />
          }
        />
        <Route exact path={`${match.path}/addPost`} component={AddPostPage} />
        <Route
          exact
          path={`${match.path}/posts/:pageId`}
          component={EditPostPage}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userType: selectUserType,
});

const mapDispatchToProps = (dispatch) => ({
  setUsers: (users) => dispatch(setUsers(users)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPage)
);

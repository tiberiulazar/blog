import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import AuthPage from "./pages/auth-page/auth-page.component";

import "./App.css";
import AdminPage from "./pages/admin-page/admin-page.component";
import React from "react";
import {
  auth,
  convertCategoriesSnapshotToMap,
  convertPostsSnapshotToMap,
  createUserProfileDocument,
  firestore,
} from "./firebase/firebase.utils";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser, selectUserType } from "./redux/user/user.selectors";
import { setCurrentUser } from "./redux/user/user.actions";
import { connect } from "react-redux";
import { setPosts } from "./redux/posts/posts.actions";
import { setCategories } from "./redux/categories/categories.actions";
import { selectCategoriesList } from "./redux/categories/categories.selectors";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, setPosts, setCategories } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    const postsRef = firestore.collection("posts").orderBy("createdAt", "desc");
    postsRef.onSnapshot(async (snapshot) => {
      const postsMap = convertPostsSnapshotToMap(snapshot);
      console.log("postsMap", postsMap);
      setPosts(postsMap);
      this.setState({ loading: false });
    });

    const categoriesRef = firestore.collection("categories");
    categoriesRef.onSnapshot(async (snapShot) => {
      const categoriesMap = convertCategoriesSnapshotToMap(snapShot);
      console.log("categoriesMap", categoriesMap);
      setCategories(categoriesMap);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (loading ? <p>Loading page</p> : <HomePage />)}
          />

          <Route
            exact
            path="/login"
            render={() => {
              if (
                this.props.userType === "admin" ||
                this.props.userType === "moderator"
              ) {
                return <Redirect to="/admin" />;
              } else if (this.props.currentUser) {
                return <Redirect to="/" />;
              } else {
                return <AuthPage />;
              }
            }}
          />
          <Route
            path="/admin"
            render={() =>
              this.props.userType === "admin" ||
              this.props.userType === "moderator" ? (
                <AdminPage />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userType: selectUserType,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setPosts: (posts) => dispatch(setPosts(posts)),
  setCategories: (categories) => dispatch(setCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

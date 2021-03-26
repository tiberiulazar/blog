import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBHFo2v1-qAc3ZxTuL9lXWQNtFnNtW-n_o",
  authDomain: "blog-a082e.firebaseapp.com",
  projectId: "blog-a082e",
  storageBucket: "blog-a082e.appspot.com",
  messagingSenderId: "314148314390",
  appId: "1:314148314390:web:501f4ede3776c4d0220437",
  measurementId: "G-K3K2JDYWJP",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    userRef
      .set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
      .then(() => console.log("User inregistrat cu succes!"))
      .catch((err) => console.log(err));
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const addPostToFirebase = async (post, fcnt) => {
  const categoryPostsRef = firestore.collection(`posts`);
  const categoryRef = firestore.doc(`categories/${post.category}`);
  const snapShot = await categoryRef.get();

  if (snapShot.exists) {
    const newDocRef = categoryPostsRef.doc();
    newDocRef
      .set(post)
      .then(() => {
        console.log("Post added succesifuly!");
        const postForStore = {
          ...post,
          id: newDocRef.id,
        };
        fcnt(postForStore);
      })
      .catch((err) => console.log(err));
  } else {
    console.log("Category does not exists!");
  }
};

export const editExistingPost = async (post) => {
  console.log(post);
  const postRef = firestore.doc(`posts/${post.id}`);
  const categoryRef = firestore.doc(`categories/${post.category}`);
  const snapShot = await categoryRef.get();

  if (snapShot.exists) {
    postRef
      .set(post, {
        merge: true,
      })
      .then(() => {
        console.log("Post updated succesifuly!");
      })
      .catch((err) => console.log(err));
  } else {
    console.log("Category does not exists!");
  }
};

export const deletePostFromFirebase = async (postId, fcnt) => {
  firestore
    .doc(`posts/${postId}`)
    .delete()
    .then(() => {
      console.log("Post deleted successfully!");
    })
    .catch((err) => console.log(err));
};

export const getAllPosts = () => {
  const postsRef = firestore.collection("posts");
  const posts = [];
  postsRef.onSnapshot(async (snapShot) =>
    snapShot.docs.map((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    })
  );
  return posts;
};

export const convertPostsSnapshotToMap = (posts) => {
  const transformedPosts = posts.docs.map((doc) => ({
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    id: doc.id,
  }));
  return transformedPosts;
};

export const convertCategoriesSnapshotToMap = (categories) => {
  const transformedCategories = categories.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return transformedCategories;
};

export const convertUsersSnapshotToMap = (users) => {
  const transformedUsers = [];
  users.docs.forEach((doc) => {
    if (doc.data().userType !== "admin") {
      transformedUsers.push({
        ...doc.data(),
        uid: doc.id,
      });
    }
  });
  return transformedUsers;
};

export const addCategoryToData = async (categoryKey, category) => {
  const categoryRef = firestore.doc(`categories/${categoryKey}`);
  const snapShot = await categoryRef.get();

  if (!snapShot.exists) {
    categoryRef
      .set(category)
      .then(() => {
        console.log("Category added succesfuly!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const deleteCategoryFromFirestore = async (
  categoryKey,
  deletePostsBool
) => {
  firestore
    .doc(`categories/${categoryKey}`)
    .delete()
    .then(() => {
      console.log("Category deleted!");
      if (deletePostsBool) {
        deletePostWithCategory(categoryKey);
      }
    })
    .catch((err) => console.log(err));
};

export const editCategoryName = async (oldKey, newKey, category) => {
  deleteCategoryFromFirestore(oldKey, false);
  addCategoryToData(newKey, category);
  editPostsCategory(oldKey, newKey);
};

export const deletePostWithCategory = async (categoryKey) => {
  const postsRef = firestore.collection("posts");
  (await postsRef.get()).docs.forEach((doc) => {
    if (doc.data().category === categoryKey) {
      firestore
        .doc(`posts/${doc.id}`)
        .delete()
        .then(() => "Post deleted!")
        .catch((err) => console.log(err));
    }
  });
};

export const editPostsCategory = async (oldCategoryKey, newCategoryName) => {
  const postsRef = firestore.collection("posts");
  (await postsRef.get()).docs.forEach((doc) => {
    if (doc.data().category === oldCategoryKey) {
      firestore.doc(`posts/${doc.id}`).set(
        {
          category: newCategoryName,
        },
        { merge: true }
      );
    }
  });
};

export const getCategories = () => {
  const categoriesRef = firestore.collection("categories");
  let categories = [];
  categoriesRef.onSnapshot(async (snapShot) =>
    snapShot.docs.map((doc) => {
      categories.push({ ...doc.data(), id: doc.id });
    })
  );
  return categories;
};

export const changeUserRole = async (userId, userRole) => {
  console.log("user role in fb funct", userRole);
  const userRef = firestore.doc(`users/${userId}`);
  userRef
    .set(
      {
        userType: userRole,
      },
      {
        merge: true,
      }
    )
    .then(() => console.log("User role has changed!"))
    .catch((err) => console.log(err));
};

export default firebase;

export const addPostToList = (postsList, postToAdd) => {
  const postExists = postsList.find((post) => {
    return post.id === postToAdd.id;
  });

  if (!postExists) {
    return [...postsList, postToAdd];
  }

  return postsList;
};

export const deletePostFromList = (postsList, postToDelete) => {
  console.log("1");
  const postExists = postsList.find((post) => {
    console.log("------------------------------------------------");
    console.log("posts list id", post.id);
    console.log("post to delete id", postToDelete);
    return post.id === postToDelete.id;
  });

  if (postExists) {
    return postsList.filter((post) => post.id !== postToDelete.id);
  } else {
    console.log("There is no such post!");
  }
  return postsList;
};

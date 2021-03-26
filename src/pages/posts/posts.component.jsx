import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import PostsList from "../../components/posts-list/posts-list.component";
import { selectPostsList } from "../../redux/posts/posts.selectors";

import "./posts.style.scss";

const PostsPage = ({ posts }) => {
  return (
    <div className="posts-page">
      <h1>Posts page</h1>
      <h2>Add post</h2>
      <Link to="/admin/addPost">Add new post</Link>
      <PostsList posts={posts} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  posts: selectPostsList,
});

export default connect(mapStateToProps)(PostsPage);

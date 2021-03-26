import { connect } from "react-redux";
import { withRouter } from "react-router";
import { deletePostFromFirebase } from "../../firebase/firebase.utils";
import { deletePost } from "../../redux/posts/posts.actions";
import "./post-admin.style.scss";

const PostCardAdmin = ({
  title,
  date,
  pid,
  deletePost,
  category,
  history,
  match,
}) => {
  const deletePostEvent = () => {
    deletePostFromFirebase(pid, deletePost);
  };

  return (
    <div className="post-card">
      <h2 className="post-card__title">{title}</h2>
      <p className="post-card__date">{date}</p>
      <p className="post-card__category">{category}</p>
      <button type="button" onClick={deletePostEvent}>
        Delete post
      </button>
      <button
        type="button"
        onClick={() => history.push(`${match.path}/${pid}`)}
      >
        Edit post
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deletePost: (post) => dispatch(deletePost(post)),
});

export default withRouter(connect(null, mapDispatchToProps)(PostCardAdmin));

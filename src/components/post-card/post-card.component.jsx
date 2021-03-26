import { withRouter } from "react-router";
import { deletePostFromFirebase } from "../../firebase/firebase.utils";
import "./post-card.style.scss";

const PostCard = ({ title, blocks, date, category, author, id, history }) => {
  const shortDescription =
    blocks.find((el) => el.type === "paragraph").data.text.slice(0, 146) +
    "...";

  return (
    <div className="post-card" onClick={() => history.push(`/posts/${id}`)}>
      <div className="post-card__img"></div>
      <h2 className="post-card__title">{title}</h2>
      <p className="post-card__description">{shortDescription}</p>
      <div className="post-card__info">
        <div className="post-card__about">
          <p className="post-card__author">{author}</p>
          <p className="post-card__date">{date}</p>
        </div>

        <p className="post-card__category">{category}</p>
      </div>
    </div>
  );
};

export default withRouter(PostCard);

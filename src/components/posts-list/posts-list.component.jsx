import { useState } from "react";
import { withRouter } from "react-router";
import PostCardAdmin from "../post-card-admin/post-admin.component";
import PostCard from "../post-card/post-card.component";

import "./posts-list.style.scss";

const PostsList = ({ posts, match }) => {
  return (
    <div className="postslist">
      {posts.map(({ title, id, createdAt, category, author, blocks }) => {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const postDate = `${createdAt.getDate()} ${
          months[createdAt.getMonth()]
        } ${createdAt.getFullYear()}`;
        return match.path === "/" ? (
          <PostCard
            title={title}
            key={id}
            date={postDate}
            blocks={blocks}
            id={id}
            author={author}
            category={category}
          />
        ) : (
          <PostCardAdmin
            title={title}
            key={id}
            date={postDate}
            author={author}
            pid={id}
            category={category}
          />
        );
      })}
    </div>
  );
};

export default withRouter(PostsList);

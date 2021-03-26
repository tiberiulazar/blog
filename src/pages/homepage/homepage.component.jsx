import { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PostsList from "../../components/posts-list/posts-list.component";

import { selectCategoriesList } from "../../redux/categories/categories.selectors";
import { selectPostsList } from "../../redux/posts/posts.selectors";

import "./homepage.style.scss";

const HomePage = ({ posts, categories }) => {
  const postsPerPage = 4;
  const [page, setPage] = useState(0);
  const [isMore, setIsMore] = useState(postsPerPage < posts.length);
  const [pagination, setPagination] = useState(true);
  const [search, setSearch] = useState("");

  const postsPagination = (pg, nr) => {
    return posts.slice(pg * nr, (pg + 1) * nr);
  };

  const [postsToShow, setPostsToShow] = useState(
    postsPagination(page, postsPerPage)
  );

  const filterByCategory = (categoryId) => {
    const filteredPosts = posts.filter((post) => post.category === categoryId);
    setPostsToShow(filteredPosts);
    setPagination(false);
    setPage(0);
  };

  const resetFilters = () => {
    setPostsToShow(postsPagination(page, postsPerPage));
    setPagination(true);
  };

  const handleSearch = (e) => {
    const searchedValue = e.target.value;
    setSearch(searchedValue);
    if (searchedValue) {
      setPagination(false);
      const foundPosts = posts.filter((post) => {
        console.log(post.title.includes(searchedValue));
        return post.title.toLowerCase().includes(searchedValue.toLowerCase());
      });
      setPostsToShow(foundPosts);
    } else {
      resetFilters();
    }
  };

  return (
    <div className="homepage">
      <h1 className="homepage__hero">The Blog</h1>
      <input
        className="homepage__search"
        type="text"
        placeholder="Search for post by title"
        value={search}
        onChange={(e) => handleSearch(e)}
      />
      <div className="homepage__filters">
        <div onClick={() => resetFilters()} className="homepage__filter">
          All
        </div>
        {categories.map(({ categoryName, id }) => (
          <div
            onClick={() => filterByCategory(id)}
            className="homepage__filter"
            key={id}
          >
            {categoryName}
          </div>
        ))}
      </div>
      {<PostsList posts={postsToShow} />}{" "}
      {pagination ? (
        <div className="pagination">
          {page > 0 ? (
            <div
              className="pagination__btn"
              onClick={() => {
                const prevPage = page - 1;
                setPage(prevPage);
                setPostsToShow(postsPagination(prevPage, postsPerPage));
                setIsMore((prevPage + 1) * postsPerPage < posts.length);
              }}
            >
              {page}
            </div>
          ) : null}
          <div className="pagination__current">{page + 1}</div>
          {isMore ? (
            <div
              className="pagination__btn"
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                setPostsToShow(postsPagination(nextPage, postsPerPage));
                setIsMore((nextPage + 1) * postsPerPage < posts.length);
              }}
            >
              {page + 2}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategoriesList,
  posts: selectPostsList,
});

// const mapDispatchToProps = (dispatch) => ({
//   setPosts: (posts) => dispatch(setPosts(posts)),
//   setCategories: (categories) => dispatch(setCategories(categories)),
// });

export default connect(mapStateToProps)(HomePage);

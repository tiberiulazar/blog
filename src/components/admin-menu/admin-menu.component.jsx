import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectUserType } from "../../redux/user/user.selectors";
import "./admin-menu.style.scss";

const AdminMenu = ({ match, userType }) => {
  return (
    <div className="admin-menu">
      <Link to={`${match.path}/categories`}>Categories</Link>
      <Link to={`${match.path}/posts`}>Posts</Link>
      {userType === "admin" ? (
        <Link to={`${match.path}/users`}>Users</Link>
      ) : null}
      <Link to={`/`}>Home</Link>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userType: selectUserType,
});

export default withRouter(connect(mapStateToProps)(AdminMenu));

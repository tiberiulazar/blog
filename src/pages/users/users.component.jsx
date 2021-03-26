import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import UserCard from "../../components/user-card/user-card.component";
import { selectUsersList } from "../../redux/users/users.selectors";

const UsersPage = ({ users }) => {
  console.log("in users:", users);
  return (
    <div className="users-page">
      <h1>Users page</h1>
      {users.map(({ displayName, userType, uid }) => (
        <UserCard
          displayName={displayName}
          userType={userType}
          key={uid}
          uid={uid}
        />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  users: selectUsersList,
});

export default connect(mapStateToProps)(UsersPage);

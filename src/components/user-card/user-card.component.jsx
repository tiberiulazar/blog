import { useState } from "react";
import { changeUserRole } from "../../firebase/firebase.utils";
import "./user-card.styles.scss";

const UserCard = ({ displayName, userType, uid }) => {
  const [userRole, setUserRole] = useState(userType);

  return (
    <div className="user-card">
      <h1>{displayName}</h1>
      <p>Role: {userType}</p>
      <select
        name="changeRole"
        value={userRole}
        onChange={(e) => {
          setUserRole(e.target.value);
          changeUserRole(uid, e.target.value);
        }}
      >
        <option value="moderator">Moderator</option>
        <option value="user">User</option>
      </select>
    </div>
  );
};

export default UserCard;

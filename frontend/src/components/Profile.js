import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../utils/helpers";

const Profile = () => {
  const user = getUser();
  console.log(user);
  return (
    <div className="profile-container">
      <img
        src={user.imageUrl}
        style={{ height: "150px", width: "150px", borderRadius: "50%" }}
      />
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>
        <Link to="/approve_password_change">Change password</Link>
      </p>
    </div>
  );
};

export default Profile;

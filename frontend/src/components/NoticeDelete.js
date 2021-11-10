import React from "react";
import { Link } from "react-router-dom";

const Deleted = () => {
  return (
    <div className="deleted">
      <h1>This post no longer exists</h1>
      <Link to="/">Back To Home</Link>
    </div>
  );
};

export default Deleted;

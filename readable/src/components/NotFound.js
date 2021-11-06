import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
      <div className="deleted">
        <h3>This page could not be found</h3>
        <Link to="/">Back To Home</Link>
      </div>
  );
};

export default PageNotFound;

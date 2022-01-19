import React from "react";
import { connect } from "react-redux";

const SuccessError = (props) => {
  const { authUser } = props.state;
  return (
    <>
      {authUser.error ? (
        <h4 style={{ color: "red" }}>{authUser.error}</h4>
      ) : authUser.message ? (
        <h4 style={{ color: "green" }}>{authUser.message}</h4>
      ) : null}
    </>
  );
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(SuccessError);

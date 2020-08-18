import React, { useContext } from "react";
import AuthContext from "../context/auth/authContext";

const Welcome = () => {
  const authContext = useContext(AuthContext);
  return (
    <h1 className="text-center p-4">
      Welcome{" "}
      <span className="text-primary">
        {authContext.user !== null ? authContext.user.name : null}!
      </span>
    </h1>
  );
};

export default Welcome;

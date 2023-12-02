import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <h1>PAGE NOT FOUND</h1>
      <Link to="/">
        <button className="login_btn">Back to Home</button>
      </Link>
    </>
  );
}

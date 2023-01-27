import React from "react";

function Container({ children }) {
  return (
    <div className="row">
      <div className="col">{children}</div>
    </div>
  );
}

export default Container;

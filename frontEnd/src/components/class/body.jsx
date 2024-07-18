import React from 'react';

const Body = ({ children }) => {
  return (
    <div className="" style={{ margin: "0", marginRight: "30px", marginLeft: "30px", minHeight: "calc(100vh - 170px)" }}>
      <div className="row gutters-sm" style={{ margin: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default Body;

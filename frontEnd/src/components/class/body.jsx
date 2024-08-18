import React from 'react';

const Body = ({ children }) => {
  return (
    <div className="" style={{ margin: "0", marginRight: "10px", marginLeft: "10px", minHeight: "calc(100vh - 170px)" }}>
      <div className="row gutters w-100" style={{ margin: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default Body;

import React from 'react';

const Container = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      {children}
    </div>
  );
}

export default Container;

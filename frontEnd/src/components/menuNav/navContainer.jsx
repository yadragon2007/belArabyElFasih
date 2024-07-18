import React from 'react';

const linksNav = ({ children }) => {

  return (
    <div className="card-header border-bottom mb-3 d-flex d-md-none">
      <ul
        className="nav nav-tabs card-header-tabs nav-gap-x-1"
        style={{ gap: "5px" }}
        role="tablist"
      >
      
        {children}

      </ul>
    </div>
  );
}

export default linksNav;

import "./nav.css";
import Link from 'next/link';

import React from 'react';

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light bg-dark m-1 ">
      <div className="container-fluid d-flex justify-content-center justify-content-md-end">
        <h2 className="">
          <Link
            className="navbar-brand"
            style={{ all: "unset", cursor: "pointer" }}
            href="/"
          >
            بالعربي الفصيح
          </Link>
        </h2>
      </div>
    </nav>

  );
}

export default Nav;

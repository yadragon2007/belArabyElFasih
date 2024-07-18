import React from 'react';
import Icon from '../icons/icons';
// import "./style.css"
// import "bootstrap/dist/css/bootstrap.css"

const sideBar = ({ children }) => {
  return (
    <div className="col-md-4 d-none d-md-block">
      <div className="card">
        <div className="card-body">
          <nav className="nav flex-column nav-pills nav-gap-y-1">

            {children}
            {/* <SideBarLinks
              icon={link.icon}
              label={link.title}
              href={link.link}
              Aclass={link.active}
            /> */}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default sideBar;

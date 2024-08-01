import { faChalkboardUser, faCirclePlus, faGears, faHouse, faSchoolCircleCheck, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import NavContainer from 'components/menuNav/navContainer';
import NavLinks from 'components/menuNav/navLinks';
import React from 'react';
import LinksNav from "components/sutdents/nav"

const RightSide = ({ children, title, active }) => {
  return (
    <div className="col-md-8">
      <div className="card">
        <LinksNav active={active} />
        <div className="card-body tab-content">
          <div className="tab-pane fade show active " id="home">
            <h6>{title}</h6>
            <hr />
            <div className="" style={{justifyContent: "center", alignItems: "center" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSide;

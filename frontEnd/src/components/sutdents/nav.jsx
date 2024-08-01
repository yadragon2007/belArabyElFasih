import React from 'react';
import SideBarLinks from './sideBarLinks';
import { faUsers, faUserPlus, faMagnifyingGlass, faUserPen } from '@fortawesome/free-solid-svg-icons';
// import "bootstrap/dist/css/bootstrap.css"

const linksNav = ({ active }) => {
  let links = [
    {
      id: "Students",
      icon: faUsers,
      title: "Students",
      link: "/students",
      active: ""
    },
    {
      id: "addStudent",
      icon: faUserPlus,
      title: "Add Student",
      link: "/students/add-stydent",
      active: ""
    },
    {
      id: "updateStudent",
      icon: faUserPen,
      title: "Update Student",
      link: "/students/update",
      active: ""
    },
    {
      id: "GetAStudent",
      icon: faMagnifyingGlass,
      title: "Get A Student",
      link: "/students/acctive-sessions",
      active: ""
    }
  ]
  const index = links.findIndex((link) => link.id == active)
  links[index].active = "active"
  return (
    <div className="card-header border-bottom mb-3 d-flex d-md-none">
      <ul
        className="nav nav-tabs card-header-tabs nav-gap-x-1"
        style={{ gap: "5px" }}
        role="tablist"
      >
        {links.map((link) => {
          return (
            <li className="nav-item" key={link.id}>
              <SideBarLinks
                icon={link.icon}
                label=""
                href={link.link}
                Aclass={link.active}
              />
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default linksNav;

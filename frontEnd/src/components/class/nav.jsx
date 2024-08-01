import React from 'react';
import Icon from './icons';
import SideBarLinks from './sideBarLinks';
import { faChalkboardUser, faCirclePlus, faSchoolCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import "bootstrap/dist/css/bootstrap.css"

const linksNav = ({ active }) => {
  let links = [
    {
      id: "sessions",
      icon: faChalkboardUser,
      title: "sessions",
      link: "/class",
      active: ""
    },
    {
      id: "addSessions",
      icon: faCirclePlus,
      title: "Add session",
      link: "/class/add-session",
      active: ""
    },
    {
      id: "acctiveSessions",
      icon: faSchoolCircleCheck,
      title: "acctive sessions",
      link: "/class/acctive-sessions",
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

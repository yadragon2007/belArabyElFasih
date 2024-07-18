import React from 'react';
import Icon from '../icons/icons';
import "./style.css"
import SideBarLinks from '../sideBar/sideBarLinks';
import { faGears, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
// import "bootstrap/dist/css/bootstrap.css"

const linksNav = ({ active }) => {
  let links = [
    {
      id: "home",
      icon: faHouse,
      title: "Home",
      link: "/setting",
      active: ""
    },
    {
      id: "addAssistant",
      icon: faUser,
      title: "Add Assistant",
      link: "/setting/add-assistant",
      active: ""
    },
    {
      id: "assistant",
      icon: faUsers,
      title: "Assistants",
      link: "/setting/assistants",
      active: ""
    },
    {
      id: "account",
      icon: faGears,
      title: "Account Settings",
      link: "/setting/account",
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

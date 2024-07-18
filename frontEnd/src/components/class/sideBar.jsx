import React from 'react';
import Icon from './icons';
import SideBarLinks from './sideBarLinks';
import { faAngleDown, faGears, faHouse, faUser, faUsers, faChalkboardUser, faCirclePlus, faSchoolCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import "bootstrap/dist/css/bootstrap.css"

const sideBar = ({ active }) => {
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
      link: "/setting/acctive-sessions",
      active: ""
    }
  ]
  const index = links.findIndex((link) => link.id == active)
  console.log(links[index].id);
  links[index].active = "active"

  return (
    <div className="col-md-4 d-none d-md-block">
      <div className="card">
        <div className="card-body">
          <nav className="nav flex-column nav-pills nav-gap-y-1">

            {links.map((link) => {
              return (
                <SideBarLinks
                  key={link.id}
                  icon={link.icon}
                  label={link.title}
                  href={link.link}
                  Aclass={link.active}
                />
              )
            })}


            {/* <SideBarLinks
              icon={faUser}
              label="Add Assistant"
              href="/setting/add-assistant"
              Aclass=""
            />
            <SideBarLinks
              icon={faGears}
              label="Account Settings"
              href="#account"
              Aclass=""
            /> */}


          </nav>
        </div>
      </div>
    </div>
  );
}

export default sideBar;

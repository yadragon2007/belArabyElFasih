import React from 'react';
// import Icon from './icons';
import SideBarLinks from './sideBarLinks';
import { faAngleDown, faGears, faHouse, faUser, faUsers, faChalkboardUser, faCirclePlus, faSchoolCircleCheck, faUserPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import "bootstrap/dist/css/bootstrap.css"

const sideBar = ({ active }) => {
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
      id: "GetAStudent",
      icon: faMagnifyingGlass,
      title: "Get A Student",
      link: "/students/acctive-sessions",
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
          </nav>
        </div>
      </div>
    </div>
  );
}

export default sideBar;

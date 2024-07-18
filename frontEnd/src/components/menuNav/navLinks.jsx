import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import "bootstrap/dist/css/bootstrap.css"

const Input = ({ icon, href, Aclass }) => {
  return (
    <li className="nav-item">
      <Link
        href={href}
        data-toggle="tab"
        className={"nav-item nav-link has-icon nav-link-faded " + Aclass}
      >
        <FontAwesomeIcon icon={icon} style={{ margin: "0 10px" }} />
      </Link>
    </li>

  );
}

export default Input;

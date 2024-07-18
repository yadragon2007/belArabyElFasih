import React from 'react';
import Icon from '../icons/icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import "bootstrap/dist/css/bootstrap.css"

const Input = ({ icon, label, href, Aclass }) => {
  return (
    <Link
      href={href}
      data-toggle="tab"
      className={"nav-item nav-link has-icon nav-link-faded " + Aclass}
    >
      <FontAwesomeIcon icon={icon} style={{ margin: "0 10px" }} />
      {label}
    </Link>
  );
}

export default Input;

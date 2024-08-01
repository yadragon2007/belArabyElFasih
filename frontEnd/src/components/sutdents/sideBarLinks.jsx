import React from 'react';
import Icon from './icons';
import Link from 'next/link';
// import "bootstrap/dist/css/bootstrap.css"

const Input = ({ icon, label, href, Aclass }) => {
  return (
    <Link
      href={href}
      data-toggle="tab"
      className={"nav-item nav-link has-icon nav-link-faded " + Aclass}
    >
      <Icon icon={icon} />
      {label}
    </Link>
  );
}

export default Input;

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




const Icon = ({ icon }) => {
  return (
    <>
      <FontAwesomeIcon icon={icon}  style={{margin:"0 10px"}}/>  
  </>

  );
}

export default Icon;

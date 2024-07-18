import React from 'react'
import "./loader.css";
import Nav from 'components/nav/nav';
import Footer from 'components/footer/footer';


const Loader = () => {
  return (
    <div className="row flex-column justify-content-center" style={{ margin: "0", height:"100%" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="loader"></div>
      </div>
    </div>)
}

export default Loader;

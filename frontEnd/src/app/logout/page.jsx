"use server"
import Footer from 'components/footer/footer';
import Nav from 'components/nav/nav';
import Link from 'next/link';
import React from 'react';



const logOut = () => {
  const removeToken = () => {
    localStorage.removeItem("Token")
  }
  removeToken();
  return (
    <div className="row flex-column align-items-center" style={{ margin: "0" }}>
      <Nav />
      <div className="row flex-column align-items-center justify-content-center col-12" style={{ minHeight: "calc(100vh - (170px))", margin: "0" }}>
        <h2>you loged out successfully</h2>
        <Link href="/login" className='btn btn-primary col-12 col-md-2 col-lg-2'>login again</Link>
      </div>
      <Footer />
    </div>
  );
}

export default logOut;

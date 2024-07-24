"use client"
import Footer from 'components/footer/footer';
import Nav from 'components/nav/nav';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Cookie from 'cookie-universal'



const logOut = () => {
  const cookies = Cookie()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This code runs only in the browser
      cookies.remove("Token")
    }
  }, []);
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
function setData(storedData) {
  throw new Error('Function not implemented.');
}


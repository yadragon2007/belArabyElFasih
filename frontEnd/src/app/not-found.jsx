import Footer from 'components/footer/footer';
import Nav from 'components/nav/nav';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className='d-flex flex-column justify-content-between' style={{ height: "100vh" }}>
      <Nav />
      <div className="">
        <div className="row justify-content-center">
          <h3>this page not found</h3>
        </div>
        <div className="row justify-content-center align-items-center">
          <img src="/img/404.png" className="" style={{ width: 350 }} alt="" />
        </div>
        <div className="row justify-content-center mt-2">
          <Link href="/" className="btn btn-primary">
            back to home page
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;

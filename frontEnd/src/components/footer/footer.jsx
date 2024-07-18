import React from 'react';
import "./footer.css"
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="d-flex flex-column">
      <div className="row mt-3 text-secondary justify-content-center">
        <div className="col-12 col-m-4">
          <p>
            ©{" "}
            <Link href="/" className="btn-link" target="_blank">
              in-fluent-arabic 2.0
            </Link>{" "}
            2024 . all right reserved.
          </p>
        </div>
        <div className="col-12 col-m-4">
          <p>
            designed and developed by{" "}
            <a
              href="https://www.instagram.com/dragon.fire.web/"
              className="btn-link"
              target="_blank"
            >
              Dragon
            </a>
            .
          </p>
        </div>
      </div>
    </footer>

  );
}

export default Footer;

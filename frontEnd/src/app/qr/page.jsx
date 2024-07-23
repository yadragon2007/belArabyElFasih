"use client"
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrCodeScanner = () => {
  const [decoded, setdecoded] = useState("");
  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 60, qrbox: { width: 250, height: 250 } },
      false
    );

    html5QrcodeScanner.render(
      (decodedText) => {
        console.log(decodedText);
        setdecoded(decodedText)
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      html5QrcodeScanner.clear();
    };
  }, []);

  return (
    <div>
      <div id="reader" style={{ width: '500px', height: '500px', position: 'relative', zIndex: 1 }}></div>
      <p>{decoded}</p>
    </div>
  );
};

export default QrCodeScanner;
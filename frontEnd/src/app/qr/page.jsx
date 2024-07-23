"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QRCode } from 'react-qrcode-logo';

const QrCodeScanner = () => {
  const [decoded, setdecoded] = useState("");
  const qrref = useRef(null)
  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
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
  const download = () => {
    qrref.current.download()
  }
  return (
    <div>
      <div id="reader" style={{ width: '500px', height: '500px', position: 'relative', zIndex: 1 }}></div>
      <p>{decoded}</p>
      <QRCode ref={qrref} value='0' />
      <button onClick={() => {
        download()
      }}>d</button>
    </div>
  );
};

export default QrCodeScanner;
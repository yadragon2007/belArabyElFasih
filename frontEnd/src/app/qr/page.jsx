"use client"
import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QRCode } from 'react-qrcode-logo';
import { useRouter } from 'next/navigation'

const QrCodeScanner = () => {
  const router = useRouter()
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
        qrref.current.style.display = "none"
        router.push(`/${decodedText}`)
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
      <div id="reader" ref={qrref} style={{ width: '500px', height: '500px', position: 'relative', zIndex: 1 }}></div>
      <p>{decoded}</p>
    </div>
  );
};

export default QrCodeScanner;
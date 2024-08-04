import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect } from 'react';

const StudentCodeQr = ({ success }) => {
  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 24, qrbox: { width: 250, height: 250 } },
      false
    );

    html5QrcodeScanner.render(
      success,
      (error) => {
        console.warn(error);
      }
    );

  }, [])

  return (
    <>
      <div id="reader" style={{ width: '100%', height: "250", position: 'relative', zIndex: 1 }}></div>
    </>
  );
}

export default StudentCodeQr;

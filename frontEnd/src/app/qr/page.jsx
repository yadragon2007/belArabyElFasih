"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QRCode } from 'react-qrcode-logo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Footer from 'components/footer/footer';

const QrCodeScanner = () => {
  const array = Array.from({ length: 600 }, (_, i) => i);

  const download = () => {
    // array.forEach((image, index) => {
    // const input = document.getElementById('qr0');

    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF({
    //     orientation: 'portrait',
    //     unit: 'px',
    //     format: [canvas.width, canvas.height],
    //   });
    //   pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    //   pdf.addPage("a4")
    //   pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    //   pdf.save(`belArabyElFasi7Qr${0}.pdf`);
    // });
    // })

    const input = document.getElementById('pdf-content');
    console.log(input);
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF('p', 'pt', 'a4'); // 'p' for portrait, 'pt' for points, 'a4' for size

      const imgData = canvas.toDataURL('image/png');
      setTimeout(() => {
        console.log(imgData);  // Log the image data to ensure it's valid

        const imgWidth = 595.28; // A4 width in pt
        const pageHeight = 841.89; // A4 height in pt
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`belAraByElFasi7QrCodeFrom${array[0]}To${array[array.length - 1]}.pdf`);
      }, 5000);

    });

  }
  return (
    <div>
      {/* <button onClick={download}>download</button> */}
      <div className="row justify-content-around bg-light " style={{ width: "1350px", rowGap:"79px" }} id='pdf-content'>
        {
          array.map((item, index) => {
            return (
              <div key={index} id={"qr" + index} className='bg-light d-flex flex-column justify-content-between align-items-center'>
                <div className="d-flex justify-content-center align-items-center flex-column" style={{ border: "3px solid black" }}>
                  <QRCode value={`${item}`} size={300} />
                  <p style={{ fontWeight: "700", fontSize: "40px", letterSpacing: "2px" }} className='text-dark'>{item}</p>
                </div>
              </div>
            )

          })
        }
      </div>


    </div>
  );
};

export default QrCodeScanner;
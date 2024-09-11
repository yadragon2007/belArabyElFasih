"use client"
import "app/class/style.css"
import Container from 'components/class/container';
import Nav from 'components/nav/nav';
import { useEffect, useState } from 'react';
import Body from 'components/class/body';
import Footer from 'components/footer/footer';
import RightSide from "components/profile/rightSide";
import { useRouter } from "next/navigation";
import Cookie from 'cookie-universal'
import Axios from "api/axios";
import { Html5QrcodeScanner } from 'html5-qrcode';
import StudentCodeQr from "components/studentCodeQr/studentCodeQr";

import env from "dotenv";
env.config();

import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CYPTR_KEY);

const Page = () => {
  const router = useRouter()
  const cookies = Cookie()
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [code, setCode] = useState();
  const [isError, setError] = useState("");

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

  async function success(code) {
    const Code = parseInt(code)
    setError("جاري التحميل")
    if (!Number.isNaN(Code)) {
      try {
        const student = await Axios.get(`/api/student/${code}`)
        if (!student)
          setError("هذا الطالب غير موجود")
        else {
          const encryptedString = cryptr.encrypt(code);
          console.log(encryptedString);
          router.push(`/students/profile/${encryptedString}`)
        }
      } catch (error) {
        setError("هذا الطالب غير موجود")
      }
    } else {
      setError("invalid Qr")
    }
  }


  return (
    <Container>
      <Nav />
      <Body>
        <RightSide title={"SEARCH"}>
          <StudentCodeQr success={success} />
          <p>{isError}</p>
        </RightSide>
      </Body>
      <Footer />
    </Container>
  );
}

export default Page;

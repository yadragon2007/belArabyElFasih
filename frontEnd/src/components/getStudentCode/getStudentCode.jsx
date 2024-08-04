"use client"
import Axios from 'api/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookie from "cookie-universal"
import Loader from 'components/loader/loader';
import Container from 'components/class/container';
import Nav from "components/nav/nav";
import Footer from "components/footer/footer";
import Body from "components/class/body";
import { Html5QrcodeScanner } from 'html5-qrcode';
import RightSide from "components/class/rightSide";
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { faChalkboardUser, faCirclePlus, faSchoolCircleCheck } from "@fortawesome/free-solid-svg-icons";


const GetStudentCode = ({ sessionId, successPageUrl }) => {
  const router = useRouter()
  const cookies = Cookie()


  const [isError, setError] = useState("")
  const [code, setCode] = useState("");

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
    if (!Number.isNaN(Code)) {
      try {
        const student = await Axios.get(`/api/student/${code}`)
        const session = await Axios.get(`/api/sessions/${sessionId}`)
        const studentAddedBefore = session.data.history[session.data.history.length - 1].students.find((savedStudent) => savedStudent.studentId._id === student.data._id)
        if (studentAddedBefore != undefined) {
          setError("هذا الطالب تمت اضافته الي هذه المحاضرة من قبل")
          return
        }
        if (student.data.grade._id === session.data.grade._id) {
          setError("")
          router.push(`/class/acctive-sessions/${sessionId}/${Code}`)
        } else {
          setError("هذا الطالب ليس في هذه المرحلة")
        }
      } catch (error) {
        router.push(`/students/addStudent/${Code}`)
      }
    } else {
      setError("invalid Qr")
    }
  }
  return (
    <>
      <div id="reader" style={{ width: '100%', height: "250", position: 'relative', zIndex: 1 }}></div>
      <p>{isError}</p>
      <div className="w-100 d-flex justify-content-between align-items-center" style={{ margin: "20px 0" }}>
        <div className="col-4" style={{ borderBottom: "1px solid #fff" }}></div>
        <div className="col-4" style={{ textAlign: "center" }}>OR</div>
        <div className="col-4" style={{ borderBottom: "1px solid #fff" }}></div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="name">كود الطالب</label>
          <input type="number" className="form-control" id="code" name="code" placeholder="كود الطالب" onChange={(e) => setCode(e.target.value)} />
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-primary" onClick={() => { success(code) }}>ارسال</button>
        </div>
      </div>
    </>
  );
}

export default GetStudentCode;

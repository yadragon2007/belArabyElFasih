"use client"
import "app/class/style.css"

import Axios from 'api/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookie from "cookie-universal"
import Loader from 'components/loader/loader';
import Container from 'components/class/container';
import Nav from "components/nav/nav";
import Footer from "components/footer/footer";
import Body from "components/class/body";
import RightSide from "components/class/rightSide";
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { faChalkboardUser, faCirclePlus, faSchoolCircleCheck } from "@fortawesome/free-solid-svg-icons";


const Page = ({ params }) => {
  const router = useRouter()
  const cookies = Cookie()

  const [userData, setUserData] = useState(null)
  const [session, setsession] = useState({
    history: [{ examGrade: "" }],
    _id: ""
  });
  const [isLoading, setLoading] = useState(true)
  const [student, setStudent] = useState({
    fullName: "",
    _id: ""

  });
  const [inputsData, setInputsData] = useState({
    studentExamGrade: "",
    homeWork: false
  });
  const [error, setError] = useState("");
  useEffect(() => {
    if (!cookies.get('Token')) router.push("/login")
    Axios.get("/api/accounts/user")
      .then((response) => {
        setUserData(response.data.data)
      })
    Axios.get(`/api/sessions/${params.sessionId}`)
      .then((response) => {
        setsession(response.data)
      })
    Axios.get(`/api/student/${params.studentCode}`)
      .then((response) => {
        setStudent(response.data)
        setLoading(false)
      })
  }, [])


  const addStudentToSession = async () => {
    if (session.history[session.history.length - 1].examGrade == "noExam") {
      setInputsData({
        ...inputsData,
        studentExamGrade: "noExam"
      })
    } else {
      if (inputsData.studentExamGrade === "") {
        setError("student grade is required")
        return;
      }
    }
    try {
      await Axios.post("/api/sessions/add/sutdent", {
        "sessionId": session._id,
        "studentId": student._id,
        "homeWork": inputsData.homeWork,
        "studentExamGrade": inputsData.studentExamGrade
      })
      router.push(`/class/acctive-sessions/${session._id}`)
    } catch (error) {
      console.log(error);
    }

  }
  if (isLoading) return <Loader />
  if (!userData) return router.push("/login")

  return (
    <Container>
      <Nav />
      <Body>
        <SideBarContainer>
          <SideBarLinks icon={faChalkboardUser} label={"Sessions"} href={"/class"} Aclass={""} />
          <SideBarLinks icon={faCirclePlus} label={"Add Sessionsession"} href={"/class/add-session"} Aclass={""} />
          <SideBarLinks icon={faSchoolCircleCheck} label={"Active Sessions"} href={"/class/acctive-sessions"} Aclass={"active"} />
        </SideBarContainer>
        <RightSide title={"ADD STUDENT"} active={"acctiveSessions"}>
          <form>
            <div className="w-100 d-flex justify-content-center">
              <p style={{ fontSize: "24px" }}>{student.fullName}</p>
            </div>
            {session.history[session.history.length - 1].examGrade != "noExam" ? (
              <div className="input-group mb-3 d-flex justify-content-center">
                <div className="input-group-prepend">
                  <span className="input-group-text">درجة امتحان الطالب</span>
                </div>
                <input
                  type="number"
                  className="form-control col-12"
                  onChange={(e) => {
                    if (e.target.value != "") {
                      setInputsData({
                        ...inputsData,
                        studentExamGrade: e.target.value
                      })
                    } else {
                      delete inputsData.studentExamGrade
                    }

                  }}
                  placeholder={session.history[session.history.length - 1].examGrade}
                />
                <div className="input-group-append">
                  <span className="input-group-text">/{session.history[session.history.length - 1].examGrade}</span>
                </div>
              </div>

            ) : (<></>)}

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  الواجب
                </div>
              </div>
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input type="checkbox" onChange={(e) => {
                    setInputsData({
                      ...inputsData,
                      homeWork: e.target.checked
                    })
                  }} aria-label="Checkbox for following text input" />
                </div>
              </div>
            </div>
            <p className="text-danger">{error}</p>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={addStudentToSession}>حفظ</button>
            </div>
          </form>
        </RightSide>
      </Body>
      <Footer />
    </Container>
  );
}

export default Page;

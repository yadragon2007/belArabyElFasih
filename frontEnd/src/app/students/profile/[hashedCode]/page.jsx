"use client"
import "app/class/style.css"
import Container from 'components/class/container';
import Nav from 'components/nav/nav';
import { useEffect, useState } from 'react';
import Body from 'components/class/body';
import Footer from 'components/footer/footer';
import { faCheck, faCircleInfo, faUserPen, faUserPlus, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import RightSide from "components/profile/rightSide";
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { useRouter } from "next/navigation";
import Loader from "components/loader/loader";
import Cookie from 'cookie-universal'
import Axios from "api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import env from "dotenv";
env.config();

import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CYPTR_KEY);

const Page = ({ params }) => {
  const router = useRouter()
  const cookies = Cookie()
  const [student, setStudent] = useState(null);
  const [isLoading, setLoading] = useState(true)
  const [sessions, setSessions] = useState([])
  const [session, setSession] = useState({
    sessionId: {},
    quiz: {},
    Date: "",
    time: "",
    homeWork: ""
  })
  let daysOfWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

  // const [isError, setError] = useState("");

  useEffect(() => {
    const studentCode = cryptr.decrypt(params.hashedCode)
    Axios.get(`/api/student/${studentCode}/public`)
      .then((response) => {
        setStudent(response.data)
        const sessions = response.data.sessions.reverse()
        setSessions(sessions)
        setLoading(false)

        console.log(response.data);
      }).catch(() => {
        router.push("/login")
      })

  }, [])

  if (isLoading) return <Loader />

  return (
    <Container>
      <Nav />
      <Body>
      
        <RightSide title={student.fullName}>






          {/* active session modal */}
          <div
            className="modal fade"
            id="activeSession"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog ">
              <div className="modal-content cardBg">
                <div className="modal-header">
                  <h5 className="modal-title d-flex" style={{ gap: "10px" }}>
                    <p style={{ margin: "0" }}>بينات الحصة</p>
                  </h5>
                  <button
                    type="button"
                    className="close text-light"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row justify-content-center" style={{ margin: "0", gap: "20px" }}>
                    <div className="col-12 d-flex justify-content-between" style={{ gap: "5px" }}>
                      <div className="">يوم:</div>
                      <div className="">{daysOfWeek[session.sessionId.day]}</div>
                    </div>
                    <div className="col-12 d-flex justify-content-between" style={{ gap: "5px" }}>
                      <div className="">الساعة</div>
                      <div className="">{session.sessionId.hour} : {session.sessionId.min}  {session.sessionId.AmPm}</div>
                    </div>
                    <div className="w-100" style={{ borderBottom: "1px solid #fff" }}></div>
                    <div className="col-12 d-flex justify-content-between" style={{ gap: "5px" }}>
                      <div className="">تاريخ الحضور:</div>
                      <div className="">{session.Date}</div>
                    </div>
                    <div className="col-12 d-flex justify-content-between" style={{ gap: "5px" }}>
                      <div className="">وقت الحضور</div>
                      <div className="">{session.time}</div>
                    </div>
                    <div className="w-100" style={{ borderBottom: "1px solid #fff" }}></div>
                    <div className="col-12 d-flex justify-content-between" style={{ gap: "5px" }}>
                      <div className="">الواجب:</div>
                      {
                        session.homeWork ? (
                          <div className="">
                            <span className="badge badge-success"><FontAwesomeIcon icon={faCheck} /></span>
                          </div>
                        ) : (
                          <div className="">
                            <span className="badge badge-danger"><FontAwesomeIcon icon={faXmark} /></span>

                          </div>
                        )
                      }
                    </div>
                    <div className="col-12 d-flex justify-content-between" style={{ gap: "5px" }}>
                      <div className="">الأمتحان:</div>
                      <div className="">{session.quiz.maxGrade}/{session.quiz.studentGrade}</div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    اغلاق
                  </button>
                </div>
              </div>
            </div>
          </div>








          <div className="row justify-content-center" style={{ margin: "0", gap: "20px" }}>
            <div className="col-12 col-lg-8 d-flex justify-content-between" style={{ gap: "5px" }}>
              <div className="">الكود:</div>
              <div className="">{student.code}</div>
            </div>
            <div className="col-12 col-lg-8 d-flex justify-content-between" style={{ gap: "5px" }}>
              <div className="">اسم الطالب:</div>
              <div className="">{student.fullName}</div>
            </div>
            <div className="col-12 col-lg-8 d-flex justify-content-between" style={{ gap: "5px" }}>
              <div className="">رقم الهاتف:</div>
              <div className="">{student.phone}</div>
            </div>
            <div className="col-12 col-lg-8 d-flex justify-content-between" style={{ gap: "5px" }}>
              <div className="">رقم هاتف ولي الأمر:</div>
              <div className="">{student.GuardianPhone}</div>
            </div>
            <div className="col-12 col-lg-8 d-flex justify-content-between" style={{ gap: "5px" }}>
              <div className="">المدرسة:</div>
              <div className="">{student.school}</div>
            </div>
            <div className="col-12 col-lg-8 d-flex justify-content-between" style={{ gap: "5px" }}>
              <div className="">المرحلة:</div>
              <div className="">{student.grade.name}</div>
            </div>
          </div>

          
          <hr />
          <div className=" table-responsive-sm">
            <table className="table w-100 text-light">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">اليوم</th>
                  <th scope="col">الساعة</th>
                  <th scope="col">التاريخ</th>
                  <th scope="col">التفاصيل</th>
                </tr>
              </thead>
              <tbody>
                {
                  sessions.map((session, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {daysOfWeek[session.sessionId.day]}
                        </td>
                        <td>{session.sessionId.hour} : {session.sessionId.min}  {session.sessionId.AmPm}</td>
                        <td>{session.Date}</td>
                        <td><button data-toggle="modal" data-target="#activeSession" onClick={(e) => {
                          setSession(session)
                        }} className="btn btn-primary"><FontAwesomeIcon icon={faCircleInfo} /></button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

          </div>
        </RightSide>
      </Body>
      <Footer />
    </Container>
  );
}

export default Page;

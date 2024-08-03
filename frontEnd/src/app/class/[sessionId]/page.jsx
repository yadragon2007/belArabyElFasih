"use client"
import "app/class/style.css"
import Container from 'components/class/container';
import Nav from 'components/nav/nav';
import { useEffect, useState } from 'react';
import Body from 'components/class/body';
import Footer from 'components/footer/footer';
import { faAngleDown, faChalkboardUser, faCheck, faCircleInfo, faCirclePlus, faPlay, faSchool, faSchoolCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import RightSide from "components/class/rightSide";
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { notFound, useRouter } from "next/navigation";
import Loader from "components/loader/loader";
import { useRef } from 'react';
import Cookie from 'cookie-universal'
import Axios from "api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";



const Page = ({ params }) => {
  const router = useRouter()
  const activeRef = useRef(null)
  const cookies = Cookie()
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [history, setHistory] = useState([]);
  const [activeData, setActiveData] = useState({
    examGrade: ""
  });
  const [sessionInfo, setSessionInfo] = useState({
    Date: "",
    from: "",
    to: "",
    examGrade: "",
    students: [],
  })
  const [session, setSession] = useState({
    _id: "",
    day: "",
    hour: "",
    min: "",
    AmPm: "",
    grade: {},
    active: "",
    history: []
  });
  const [active, setActive] = useState(null)
  let daysOfWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];


  useEffect(() => {
    if (!cookies.get('Token')) router.push("/login")
    Axios.get("/api/accounts/user")
      .then((response) => {
        setUserData(response.data)
        setLoading(false)
      })
    Axios.get(`/api/sessions/${params.sessionId}`)
      .then((response) => {
        setSession(response.data)
        const history = response.data.history.reverse()
        setHistory(history)
        setLoading(false)
      }).catch(() => {
        router.push("/class/")
      })
  }, [])

  if (isLoading) return <Loader />
  if (!userData) return router.push("/login")


  const activeSession = async () => {
    try {
      await Axios.patch("/api/sessions/active", {
        sessionId: session._id,
        examGrade: activeData.examGrade
      })

      if (activeRef.current.getAttribute("data-target") == "#activeSession") {
        activeRef.current.setAttribute('data-target', "#unActiveModal")
        activeRef.current.className = "btn btn-success"
      } else {
        activeRef.current.setAttribute('data-target', "#activeSession")
        activeRef.current.className = "btn btn-danger"
      }
    } catch (error) {
      console.log(error)
    }
  }
  const retutnToStudentPage = (studnetCode) => {
    router.push(`/students/search/${studnetCode}`)
  }
  const deleteSession = async () => {
    try {
      await Axios.delete(`/api/sessions/${session._id}`)
      router.push("/class/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Nav />
      <Body>
        <SideBarContainer>
          <SideBarLinks icon={faChalkboardUser} label={"Sessions"} href={"/class"} Aclass={"active"} />
          <SideBarLinks icon={faCirclePlus} label={"Add Sessionsession"} href={"/class/add-session"} Aclass={""} />
          <SideBarLinks icon={faSchoolCircleCheck} label={"Active Sessions"} href={"/class/acctive-sessions"} Aclass={""} />
        </SideBarContainer>
        <RightSide title={"SESSIONS"} active={"sessions"}>

          {/* info session modal */}
          <div
            className="modal fade"
            id="infoSession"
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
                      <div className="">{daysOfWeek[session.day]}</div>
                    </div>
                    <div className="col-12 d-flex justify-content-between" style={{ gap: "5px" }}>
                      <div className="">الساعة:</div>
                      <div className="">{session.hour} : {session.min}  {session.AmPm}</div>
                    </div>
                    <div className="w-100" style={{ borderBottom: "1px solid #fff" }}></div>
                    <div className="col-12 d-flex justify-content-between" style={{ gap: "5px" }}>
                      <div className="">التاريخ:</div>
                      <div className="">{sessionInfo.Date}</div>
                    </div>
                    <div className="col-12 d-flex justify-content-between" style={{ gap: "5px" }}>
                      <div className="">بدأت:</div>
                      <div className="">{sessionInfo.from}</div>
                    </div>
                    <div className="col-12 d-flex justify-content-between" style={{ gap: "5px" }}>
                      <div className="">أنتهت:</div>
                      <div className="">{sessionInfo.to}</div>
                    </div>
                    <div className="w-100" style={{ borderBottom: "1px solid #fff" }}></div>
                    <div className="w-100 row justify-content-center" style={{ margin: "0", gap: "20px" }}>
                      {
                        sessionInfo.students.map((student, index) => {
                          return (
                            <div className="col-12 row justify-content-between align-items-center p-2" style={{ margin: "0", border: "2px solid black", borderRadius: "10px" }}>
                              {/* student name */}
                              <button
                                className="btn btn-link text-light"
                                data-dismiss="modal"
                                onClick={() => {
                                  retutnToStudentPage(student.studentId.code)
                                }}
                              >
                                {student.studentId.fullName}
                              </button>
                              <div className="d-flex" style={{ margin: "0", gap: "10px" }}>
                                {
                                  student.homeWork ? (
                                    <span className="badge badge-success">الواجب</span>
                                  ) : (
                                    <span className="badge badge-danger ">الواجب</span>

                                  )
                                }
                                {
                                  sessionInfo.examGrade != "noExam" ? (
                                    <span className="badge badge-primary">{sessionInfo.examGrade}/{student.studentExamGrade}</span>
                                  ) : (
                                    <></>
                                  )
                                }

                              </div>
                            </div>
                          )
                        })
                      }

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


          {/* active session modal */}
          <div
            className="modal fade "
            id="activeSession"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog ">
              <div className="modal-content cardBg">
                <div className="modal-header">
                  <h5 className="modal-title d-flex" style={{ gap: "10px" }} id="activeSession">
                    <p style={{ margin: "0" }}>{daysOfWeek[session.day]}</p>
                    <p style={{ margin: "0" }}>{session.hour} : {session.min} {session.AmPm}</p>
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
                  <form>
                    <div className="form-group">
                      <label htmlFor="recipient-name" className="col-form-label">
                        درجة الإمتحان :
                      </label>
                      <input type="number" className="form-control" onChange={(e) => {
                        setActiveData({ sessionId: session._id, examGrade: e.target.value })
                      }} id="recipient-name" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    إلغاء
                  </button>
                  <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={activeSession}>
                    حفظ
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* un active modal */}
          <div
            className="modal fade "
            id="unActiveModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog ">
              <div className="modal-content cardBg">
                <div className="modal-header">
                  <h5 className="modal-title d-flex" style={{ gap: "10px" }} id="exampleModalLabel">
                    <p style={{ margin: "0" }}>{daysOfWeek[session.day]}</p>
                    <p style={{ margin: "0" }}>{session.hour} : {session.min} {session.AmPm}</p>
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
                  <div className="">
                    <p>هل من انهاءالحصة</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    إلغاء
                  </button>
                  <button type="button" data-dismiss="modal" className="btn btn-danger" onClick={activeSession}>
                    انهاء الحصة
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* delete modal */}
          <div
            className="modal fade "
            id="deleteSession"
            tabIndex={-1}
            aria-labelledby="deleteSession"
            aria-hidden="true"
          >
            <div className="modal-dialog ">
              <div className="modal-content cardBg">
                <div className="modal-header">
                  <h5 className="modal-title d-flex" style={{ gap: "10px" }} id="exampleModalLabel">
                    <p style={{ margin: "0" }}>{daysOfWeek[session.day]}</p>
                    <p style={{ margin: "0" }}>{session.hour} : {session.min} {session.AmPm}</p>
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
                  <div className="">
                    <p>هل انت متأكد من حذف الحصة</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    إلغاء
                  </button>
                  <button type="button" data-dismiss="modal" onClick={() => {
                    deleteSession()
                  }} className="btn btn-danger" >
                    حذف الحصة
                  </button>
                </div>
              </div>
            </div>
          </div>







          <div className="row justify-content-center" style={{ margin: "0", gap: "20px" }}>
            <div className="col-12 col-lg-8 d-flex justify-content-between" style={{ gap: "5px" }}>
              <div className="">اليوم:</div>
              <div className="">{daysOfWeek[session.day]}</div>
            </div>
            <div className="col-12 col-lg-8 d-flex justify-content-between" style={{ gap: "5px" }}>
              <div className="">الساعة:</div>
              <div className="">{session.hour} : {session.min} {session.AmPm}</div>
            </div>
            <div className="col-12 col-lg-8 d-flex justify-content-between" style={{ gap: "5px" }}>
              <div className="">المرحلة:</div>
              <div className="">{session.grade.name}</div>
            </div>
          </div>

          <hr />

          <div className="row justify-content-center" style={{ margin: "0", gap: "10px" }}>
            <Link href={"/class/" + params.sessionId + "/edit/"} className="btn btn-primary">
              تعديل
            </Link>

            <button className="btn  btn-danger" data-toggle="modal" data-target="#deleteSession">حذف</button>

            {session.active ? (
              <button data-toggle="modal" ref={activeRef} data-target="#unActiveModal" className="btn btn-success">
                Deactivate
              </button>
            ) : (
              <button data-toggle="modal" ref={activeRef} data-target="#activeSession" className="btn btn-danger">
                Active
              </button>
            )}
          </div>
          <hr />

          <div className=" table-responsive-sm">
            <table className="table w-100 text-light">
              <thead>
                <tr>
                  <th style={{ textAlign: "center", verticalAlign: "middle" }} scope="col">#</th>
                  <th style={{ textAlign: "center", verticalAlign: "middle" }} scope="col">التاريخ</th>
                  <th style={{ textAlign: "center", verticalAlign: "middle" }} scope="col">من</th>
                  <th style={{ textAlign: "center", verticalAlign: "middle" }} scope="col">إلي</th>
                  <th style={{ textAlign: "center", verticalAlign: "middle" }} scope="col">التفاصيل</th>
                </tr>
              </thead>
              <tbody>
                {
                  history.map((histroySession, index) => {
                    return (
                      <tr>
                        <th scope="row" style={{ textAlign: "center", verticalAlign: "middle" }}>{index + 1}</th>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                          {histroySession.Date}
                        </td>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>{histroySession.from}</td>
                        {
                          histroySession.to ? (
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>{histroySession.to}</td>
                          ) : (
                            <td style={{ textAlign: "center", verticalAlign: "middle" }}>-----</td>
                          )
                        }
                        <td style={{ textAlign: "center", verticalAlign: "middle" }}><button data-toggle="modal" data-target="#infoSession" onClick={(e) => {
                          setSessionInfo(histroySession)
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

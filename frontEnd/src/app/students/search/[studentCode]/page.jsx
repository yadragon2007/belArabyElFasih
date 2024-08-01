"use client"
import "app/class/style.css"
import Container from 'components/class/container';
import Nav from 'components/nav/nav';
import { useEffect, useState } from 'react';
import Body from 'components/class/body';
import Footer from 'components/footer/footer';
import { faAngleDown, faCheck, faCircleInfo, faMagnifyingGlass, faUserPen, faUserPlus, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import RightSide from "components/sutdents/rightSide";
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { useRouter } from "next/navigation";
import Loader from "components/loader/loader";
import Cookie from 'cookie-universal'
import Axios from "api/axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Page = ({ params }) => {
  const router = useRouter()
  const cookies = Cookie()
  const [userData, setUserData] = useState(null)
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
    if (!cookies.get('Token')) router.push("/login")
    Axios.get("/api/accounts/user")
      .then((response) => {
        setUserData(response.data)
      }).catch(() => {
        router.push("/login")
      })
    Axios.get(`/api/student/${params.studentCode}`)
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
  if (!userData) return router.push("/login")



  const deleteStudent = async () => {
    try {
      await Axios.delete(`api/student/${params.studentCode}`)
      router.push("/students/search")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Nav />
      <Body>
        <SideBarContainer>
          <SideBarLinks icon={faUsers} label={"Students"} href={"/students"} Aclass={""} />
          <SideBarLinks icon={faUserPlus} label={"Add Student"} href={"/students/addStudent"} Aclass={""} />
          <SideBarLinks icon={faUserPen} label={"Update A Student"} href={"/students/update"} Aclass={""} />
          <SideBarLinks icon={faMagnifyingGlass} label={"Get A Student"} href={"/students/search"} Aclass={"active"} />
        </SideBarContainer>
        <RightSide title={student.fullName} active={"GetAStudent"}>



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

          {/* delete student */}

          <div
            className="modal fade"
            id="deleteStudent"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog ">
              <div className="modal-content cardBg">
                <div className="modal-header">
                  <h5 className="modal-title d-flex" style={{ gap: "10px" }}>
                    <p style={{ margin: "0" }}>{student.fullName}</p>
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
                  <p>هل انت متأكد من حذف بينات هذا الطالب</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteStudent()}
                  >
                    حذف
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
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

          <div className="row justify-content-center" style={{ margin: "0", gap: "10px" }}>
            <Link href={"/students/update/" + params.studentCode} className="btn btn-primary">
              تعديل
            </Link>
            <button data-toggle="modal" data-target="#deleteStudent" className="btn btn-danger">حذف</button>
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

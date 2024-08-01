import { faCircleInfo, faFilter, faPen, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Loader from 'components/loader/loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Cookie from 'cookie-universal'
import Axios from 'api/axios';



const getSessions = async () => {
  const cookies = Cookie()
  const sessions = await axios.get("http://localhost:8080/api/sessions/", {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${cookies.get('token')}`
    }

  })
  return sessions
}


const AllSessions = () => {
  const cookies = Cookie()

  const router = useRouter()
  const activeRef = useRef([])
  const [constSessions, setConstSessions] = useState()
  const [sessions, setSessions] = useState([])
  const [activatedSession, setActivatedSession] = useState({
    _id: '',
    AmPm: "",
    min: "",
    grade: { name: "" },
    hour: "",
    day: "",
    examGrade: "",
    active: "",
    index: ""
  });
  const [isLoading, setLoading] = useState(true)
  const daysOfWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

  useEffect(() => {
    const getSessions = () => {
      Axios.get("/api/sessions/"
      ).then((respons) => {
        const data = respons.data
        setSessions(data)
        setConstSessions(data)
        setLoading(false)
      })
    }

    getSessions()
  }, [])

  const activeSession = async () => {
    const session = activatedSession;
    try {
      await Axios.patch("/api/sessions/active", {
        sessionId: session._id,
        examGrade: session.examGrade
      })

      if (activeRef.current[session.index].getAttribute("data-target") == "#activeSession") {
        activeRef.current[session.index].setAttribute('data-target', "#unActiveModal")
        activeRef.current[session.index].className = "btn btn-success"
      } else {
        activeRef.current[session.index].setAttribute('data-target', "#activeSession")
        activeRef.current[session.index].className = "btn btn-danger"
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filterSessions = async (day) => {
    if (day === false) {
      setSessions(constSessions)
    } else {
      // @ts-ignore
      const newSessions = constSessions.filter((session) => session.day == day)
      setSessions(newSessions)
    }

  }


  if (isLoading) return <Loader />
  if (!sessions) return router.push("/login")

  return (
    <>
      <div className="w-100 row justify-content-center justify-content-lg-between align-items-center border-dark pb-2 pt-2" style={{ minHeight: "100%", margin: "10px 0" }}>
        <div className="dropdown show">
          <a className="btn btn-primary" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <FontAwesomeIcon icon={faFilter} />
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <button className="dropdown-item" onClick={() => {
              filterSessions(false)
            }}>الكل</button>
            <button className="dropdown-item" onClick={() => {
              filterSessions(0)
            }}>الأحد</button>
            <button className="dropdown-item" onClick={() => {
              filterSessions(1)
            }}>الإثنين</button>
            <button className="dropdown-item" onClick={() => {
              filterSessions(2)
            }}>الثلاثاء</button>
            <button className="dropdown-item" onClick={() => {
              filterSessions(3)
            }}>الأربعاء</button>
            <button className="dropdown-item" onClick={() => {
              filterSessions(4)
            }}>الخميس</button>
            <button className="dropdown-item" onClick={() => {
              filterSessions(5)
            }}>الجمعة</button>
            <button className="dropdown-item" onClick={() => {
              filterSessions(6)
            }}>السبت</button>
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
                <p style={{ margin: "0" }}>{daysOfWeek[activatedSession.day]}</p>
                <p style={{ margin: "0" }}>{activatedSession.hour} : {activatedSession.min} {activatedSession.AmPm}</p>
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
                    setActivatedSession({ ...activatedSession, examGrade: e.target.value })
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
                <p style={{ margin: "0" }}>{daysOfWeek[activatedSession.day]}</p>
                <p style={{ margin: "0" }}>{activatedSession.hour} : {activatedSession.min} {activatedSession.AmPm}</p>
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

      {sessions.map((session, index) => {
        return (
          <div key={index} className="w-100 row justify-content-center justify-content-lg-between align-items-center border-dark pb-2 pt-2" style={{ minHeight: "100%", margin: "10px 0", border: "4px solid", borderRadius: "10px" }}>
            <div className="w-100 row justify-content-center justify-content-lg-between align-items-center mt-2 mb-2 col-md-12 col-lg-4">
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{daysOfWeek[session.day]}</p>
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{session.hour} : {session.min} {session.AmPm}</p>
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{session.grade.name}</p>
            </div>
            <div className=" d-flex justify-content-around align-items-center col-md-12 col-lg-3">

              {session.active ? (
                <button data-toggle="modal" data-target="#unActiveModal" ref={el => activeRef.current[index] = el} onClick={(e) => {
                  setActivatedSession({ ...session, index })
                }} id={session._id} className="btn btn-success">
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              ) : (
                <button data-toggle="modal" data-target="#activeSession" ref={el => activeRef.current[index] = el}
                  onClick={(e) => {
                    setActivatedSession({ ...session, index })
                  }} id={session._id} className="btn btn-danger">
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              )}


              <Link href="" className="btn btn-primary">
                <FontAwesomeIcon icon={faPen} />
              </Link>
              <Link href={"/class/" + session._id} className="btn btn-primary">
                <FontAwesomeIcon icon={faCircleInfo} />
              </Link>
            </div>
          </div >
        )
      })}
    </>
  );
}

export default AllSessions;

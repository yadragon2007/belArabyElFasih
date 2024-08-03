import { faCircleInfo, faFilter, faPen, faPlay, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Loader from 'components/loader/loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Cookie from 'cookie-universal'
import Axios from 'api/axios';


const activeSessions = () => {
  const cookies = Cookie()

  const router = useRouter()
  const activeRef = useRef([])
  const [constSessions, setConstSessions] = useState()
  const [sessions, setSessions] = useState([])
  const [isLoading, setLoading] = useState(true)
  const daysOfWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

  useEffect(() => {
    const getSessions = () => {
      Axios.get("/api/sessions/?active=true").then((respons) => {
        const data = respons.data
        setSessions(data)
        setConstSessions(data)
        setLoading(false)
      })
    }

    getSessions()
  }, [])

  const activeSession = async (sessionId, index) => {
    try {
      await Axios.patch("/api/sessions/active", {
        sessionId: sessionId
      })
      activeRef.current[index].style.display = "none"
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
      {sessions.map((session, index) => {
        return (
          <div key={index} ref={el => activeRef.current[index] = el} className="w-100 row justify-content-center justify-content-lg-between align-items-center border-dark pb-2 pt-2" style={{ minHeight: "100%", margin: "10px 0", border: "4px solid", borderRadius: "10px" }}>
            <div className="w-100 row justify-content-center justify-content-lg-between align-items-center mt-2 mb-2 col-md-12 col-lg-4">
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{daysOfWeek[session.day]}</p>
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{session.hour} : {session.min} {session.AmPm}</p>
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{session.grade.name}</p>
            </div>
            <div className=" d-flex justify-content-around align-items-center col-md-12 col-lg-2">




              <Link href={"/class/acctive-sessions/" + session._id} className="btn btn-primary">
                <FontAwesomeIcon icon={faUserPlus} />
              </Link>



              <Link className="btn btn-primary" href={"/class/" + session._id} >
                <FontAwesomeIcon icon={faCircleInfo} />
              </Link>


            </div>
          </div >
        )
      })}
    </>
  );
}

export default activeSessions;

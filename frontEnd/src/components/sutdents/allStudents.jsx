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


const allStudents = () => {
  const cookies = Cookie()
  const router = useRouter()
  const [students, setStudents] = useState(null)

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    Axios.get("/api/student/"
    ).then((respons) => {
      const data = respons.data
      setStudents(data)
      setLoading(false)
    })
  }, [])



  if (isLoading) return <Loader />
  if (!students) return router.push("/login")

  return (
    <>


      {students.map((student, index) => {
        return (
          <div key={index} className="w-100 row justify-content-center justify-content-lg-between align-items-center border-dark pb-2 pt-2" style={{ minHeight: "100%", margin: "10px 0", border: "4px solid", borderRadius: "10px" }}>
            <div className="w-100 row justify-content-center justify-content-lg-between align-items-center mt-2 mb-2 col-md-12 col-lg-4">
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{student.fullName}</p>
              {/* <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{session.hour} : {session.min} {session.AmPm}</p> */}
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{student.grade.name}</p>
            </div>
            <div className=" d-flex justify-content-around align-items-center col-md-12 col-lg-3">
              <Link href={"/students/update/" + student.code} className="btn btn-primary">
                <FontAwesomeIcon icon={faPen} />
              </Link>
              <Link href={"/students/search/" + student.code} className="btn btn-primary">
                <FontAwesomeIcon icon={faCircleInfo} />
              </Link>
            </div>
          </div >
        )
      })}
    </>
  );
}

export default allStudents;

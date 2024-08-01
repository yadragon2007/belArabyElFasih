"use client"
import { faCircleInfo, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Loader from 'components/loader/loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Cookie from 'cookie-universal'
import Axios from 'api/axios';



const Assistants = () => {
  const cookies = Cookie()
  // ref
  const assistantRef = useRef([])

  // check userData
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [assistants, setAssistant] = useState([])


  useEffect(() => {
    if (!cookies.get('Token')) router.push("/login")

    Axios.get("/api/accounts/user").then((response) => {
      setUserData(response.data.data)
      setLoading(false)
    })

    Axios.get("/api/accounts/users").then((response) => {
      setAssistant(response.data)
    }).catch((error) => {
      console.log(error);
    })


  }, [])

  async function deleteAssistant(id, index) {

    try {
      assistantRef.current[index].className = "d-none"
      await Axios.delete(`/api/accounts/${id}`)
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) return <Loader />
  if (!userData || !userData.admin) return router.push("/login")

  return (
    <>

      {assistants.map((assistant, index) => {
        return (
          <div key={assistant._id} ref={el => assistantRef.current[index] = el} className="w-100 row justify-content-center justify-content-lg-between align-items-center border-dark pb-2 pt-2" style={{ minHeight: "100%", margin: "10px 0", border: "4px solid", borderRadius: "10px" }}>
            <div className="w-100 row justify-content-center justify-content-lg-between align-items-center mt-2 mb-2 col-md-12 col-lg-4">
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{assistant.fullName}</p>
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{assistant.userName}</p>
            </div>
            <div className=" d-flex justify-content-around align-items-center col-md-12 col-lg-3">
              <button onClick={(e) => {
                deleteAssistant(assistant._id, index)
              }} id={assistant._id} className="btn btn-danger">
                <FontAwesomeIcon icon={faTrash} />
              </button>

              <Link href="" className="btn btn-primary">
                <FontAwesomeIcon icon={faPen} />
              </Link>
              <Link href="" className="btn btn-primary">
                <FontAwesomeIcon icon={faCircleInfo} />
              </Link>
            </div>
          </div >
        )
      })}
    </>

  );
}

export default Assistants;

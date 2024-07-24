"use client"
import { faCircleInfo, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Loader from 'components/loader/loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookie from 'cookie-universal'



const Assistants = () => {
  const cookies = Cookie()

  // check userData
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [assistants, setAssistant] = useState([])


  useEffect(() => {
    if (!cookies.get('Token')) router.push("/login")

    fetch('http://localhost:8080/api/accounts/user', {
      method: "get", headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + cookies.get('Token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data)
        setLoading(false)

        axios.get("http://localhost:8080/api/accounts/users", {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${cookies.get('Token')}`
          }
        }).then((response) => {
          setAssistant(response.data)
        }).catch((error) => {
          console.log(error);
        })
      })




  }, [])

  async function deleteAssistant(id) {

    try {
      const response = await axios.delete(`http://localhost:8080/api/accounts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('Token')}`
        }
      })
      const index = assistants.find((assistant) => assistant._id === id)
      let newAssistants = assistants
      newAssistants.splice(index, 1)
      setAssistant(newAssistants)
      console.log(assistants);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) return <Loader />
  if (!userData || !userData.admin) return router.push("/login")

  return (
    <>

      {assistants.map((assistant) => {
        return (
          <div key={assistant._id} className="w-100 row justify-content-center justify-content-lg-between align-items-center border-dark pb-2 pt-2" style={{ minHeight: "100%", margin: "10px 0", border: "4px solid", borderRadius: "10px" }}>
            <div className="w-100 row justify-content-center justify-content-lg-between align-items-center mt-2 mb-2 col-md-12 col-lg-4">
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{assistant.fullName}</p>
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{assistant.userName}</p>
            </div>
            <div className=" d-flex justify-content-around align-items-center col-md-12 col-lg-3">
              <button onClick={(e) => {
                deleteAssistant(assistant._id)
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

import Nav from 'components/nav/nav';
import SideBar from 'components/setting/sideBar';
import React from 'react';
import LinksNav from "components/setting/nav";
import Footer from 'components/footer/footer';
import Loader from 'components/loader/loader';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const Container = ({ children }) => {
  // check userData
  const router = useRouter()

  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem("Token")) router.push("/login")

    fetch('http://localhost:8080/api/accounts/user', {
      method: "get", headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("Token")

      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data)
        // if (!data.data.admin) router.push("/login")
        setLoading(false)
      })
  }, [])

  if (isLoading) return <Loader />
  if (!userData || !userData.admin) return router.push("/login")



  return (
    <>
      <div className='row justify-content-between flex-column'>
        <Nav />

        <div className="" style={{ margin: "0", marginRight: "30px", marginLeft: "30px", minHeight: "calc(100vh - 170px)" }}>
          <div className="row gutters-sm">
            <SideBar active="assistant" />
            <div className="col-md-8">
              <div className="card">
                <LinksNav active="assistant" />
                <div className="card-body tab-content">
                  <div className="tab-pane active" id="addAssistant">
                    <h6>ADD NEW ASSISTANTS</h6>
                    <hr />
                    <div className="w-100 h-100 row justify-content-center" style={{ margin: "0" }} >
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>



        <Footer />
      </div>
    </>
  );
}

export default Container;

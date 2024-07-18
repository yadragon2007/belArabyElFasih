"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


import Nav from 'components/nav/nav.jsx'
import Footer from 'components/footer/footer'
import Card from 'components/homeLinks/homeLinks.jsx'

import "bootstrap/dist/css/bootstrap.css"
import "@flaticon/flaticon-uicons/css/all/all.css";
import Loader from 'components/loader/loader.jsx'


function Profile() {
  const router = useRouter()
  const [data, setData] = useState(null)
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
        setData(data.data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <Loader />
  if (!data) return router.push("/login")

  return (
    <div className="row flex-column" style={{ margin: "0" }}>
      <Nav />
      <div className="row flex-column align-items-center col-12" style={{ minHeight: "calc(100vh - (170px))" }}>
        <div className="col-12 row justify-content-center justify-content-lg-start" style={{ margin: "0 0 30px 0", }}>
          <h1>welcome <span style={{ fontSize: "18px" }}>{data.fullName}</span></h1>
        </div>
        <div className="row col-12 justify-content-center justify-content-lg-between" style={{ gap: "0px" }}>
          <Card link={"/class"} content={{ title: "ادارة الحصص", content: "145" }} />
          <Card link={"/students"} content={{ title: "ادارة الطلاب", content: "145" }} />
          {data.admin ? (
            <Card link={"/setting"} content={{ title: "الأعدادات", icon: "fi fi-ss-settings" }} />
          ) : ("")}
        </div>

      </div>


      <Footer />
    </div>
  )
}

export default Profile



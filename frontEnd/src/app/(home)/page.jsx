"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookie from 'cookie-universal'
import axios from '../../api/axios.js'

import Nav from 'components/nav/nav.jsx'
import Footer from 'components/footer/footer'
import Card from 'components/homeLinks/homeLinks.jsx'

import "bootstrap/dist/css/bootstrap.css"
import "@flaticon/flaticon-uicons/css/all/all.css";
import Loader from 'components/loader/loader.jsx'
import Axios from '../../api/axios.js'


function Profile() {
  const router = useRouter()
  const cookies = Cookie()

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!cookies.get('Token')) router.push("/login")
    Axios.get("/api/accounts/user/")
      .then((res) => {
        setData(res.data.data);
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
          <Card link={"/class"} content={{ title: "ادارة الحصص", icon: "fi fi-sr-workshop" }} />
          <Card link={"/students"} content={{ title: "ادارة الطلاب", icon: "fi fi-ss-users-alt" }} />
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



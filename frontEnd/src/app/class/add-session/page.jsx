"use client"

import { faAngleDown, faCalendarDays, faChalkboardUser, faCirclePlus, faClock, faFilter, faSchoolCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Body from 'components/class/body';
import Container from 'components/class/container';
import RightSide from 'components/class/rightSide';
import Footer from 'components/footer/footer';
import Nav from 'components/nav/nav';
import SideBarContainer from 'components/sideBar/sideBarContainer';
import SideBarLinks from 'components/sideBar/sideBarLinks';
import React, { useEffect, useState } from 'react';
import AddClassForm from "components/class/classForm";
import "app/class/style.css"
import { useRouter } from 'next/navigation';
import Cookie from 'cookie-universal'
import Loader from 'components/loader/loader';
import Input from 'components/setting/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClassForm from 'components/class/classForm';
import Btn from 'components/loginBtn/btn';
import axios from 'axios';
import Axios from 'api/axios';

const Page = () => {

  const router = useRouter()
  const cookies = Cookie()
  const [userData, setUserData] = useState(null)
  const [grades, setGrades] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [form, setForm] = useState({
    day: null,
    hour: '',
    min: "",
    AmPm: null,
    grade: null,
  });
  const [validation, setValidation] = useState("");
  let daysOfWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

  function newData(name, value) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  const addSession = async () => {
    if (form.day === null || form.hour === "" || form.min === "" || form.AmPm === null || form.grade === null) {
      setValidation("there is some thing wrong in your data")
    } else {
      const response = await Axios.post("/api/sessions/", {
        day: form.day,
        hour: form.hour,
        min: form.min,
        AmPm: form.AmPm,
        grade: grades[form.grade]._id,
      })
      if (response.status === 201) {
        setValidation("session added successfully")
        setForm({
          day: null,
          hour: '',
          min: "",
          AmPm: null,
          grade: null,
        })
      }
      else {
        setValidation("there is some thing wrong in your data")
      }
    }

  }

  useEffect(() => {
    if (!cookies.get('Token')) router.push("/login")
    Axios.get("/api/accounts/user").then((response) => {
      setUserData(response.data.data)
      setLoading(false)
    })
    Axios.get("/api/grades/").then((response) => {
      setGrades(response.data.grades)
    })
  }, [])

  if (isLoading) return <Loader />
  if (!userData) return router.push("/login")

  return (
    <>
      <Container>
        <Nav />
        <Body>
          <SideBarContainer>
            <SideBarLinks icon={faChalkboardUser} label={"Sessions"} href={"/class"} Aclass={""} />
            <SideBarLinks icon={faCirclePlus} label={"Add Sessionsession"} href={"/class/add-session"} Aclass={"active"} />
            <SideBarLinks icon={faSchoolCircleCheck} label={"Active Sessions"} href={"/class/acctive-sessions"} Aclass={""} />
          </SideBarContainer>
          <RightSide title={"SESSIONS"} active={"addSessions"}>
            <ClassForm >
              <div className="form-group w-100 d-flex flex-column flex-sm-row justify-content-between align-items-start" style={{ gap: "10px" }}>
                <div className="dropdown">
                  <a className="btn btn-primary" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {
                      form.day != null ? daysOfWeek[form.day] : "اليوم"
                    }
                    <FontAwesomeIcon icon={faCalendarDays} style={{ margin: "0 10px" }} />
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <button type='button' className="dropdown-item" onClick={() => {
                      newData("day", 0)
                    }}>الأحد</button>
                    <button type='button' className="dropdown-item" onClick={() => {
                      newData("day", 1)
                    }}>الإثنين</button>
                    <button type='button' className="dropdown-item" onClick={() => {
                      newData("day", 2)
                    }}>الثلاثاء</button>
                    <button type='button' className="dropdown-item" onClick={() => {
                      newData("day", 3)
                    }}>الأربعاء</button>
                    <button type='button' className="dropdown-item" onClick={() => {
                      newData("day", 4)
                    }}>الخميس</button>
                    <button type='button' className="dropdown-item" onClick={() => {
                      newData("day", 5)
                    }}>الجمعة</button>
                    <button type='button' className="dropdown-item" onClick={() => {
                      newData("day", 6)
                    }}>السبت</button>
                  </div>
                </div>
                <div className="dropdown">
                  <a className="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {
                      form.AmPm != null ? form.AmPm : "Am || Pm"
                    }
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                    <button type='button' className="dropdown-item" onClick={() => {
                      newData("AmPm", "AM")
                    }}>Am</button>
                    <button type='button' className="dropdown-item" onClick={() => {
                      newData("AmPm", "PM")
                    }}>Pm</button>
                  </div>
                </div>

                <div className="dropdown">
                  <a className="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {
                      form.grade != null ? grades[form.grade].name : "المرحلة الدراسية"
                    }
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {
                      grades.map((grade, index) => {
                        return (
                          <button type='button' className="dropdown-item" onClick={() => {
                            newData("grade", index)
                          }}>{grade.name}</button>
                        )
                      })
                    }
                  </div>
                </div>

              </div>
              <div className="form-group">
                <label htmlFor="hour">الساعة</label>
                <input
                  type="number"
                  className={"form-control "}
                  id="hour"
                  name="hour"
                  aria-describedby={"hour" + "Help"}
                  placeholder={"الساعة"}
                  onChange={(e) => {
                    if ((e.target.value > 0 && e.target.value < 13) || e.target.value === "")
                      newData("hour", e.target.value)

                  }}
                  value={form.hour}
                />
                <div className="invalid-feedback">{validation.msg}</div>
                <small id={"hour" + "Help"} className="form-text text-muted">
                  {""}
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="min">الدقائق</label>
                <input
                  type="number"
                  className={"form-control "}
                  id="min"
                  name="min"
                  aria-describedby={"min" + "Help"}
                  placeholder={"الدقائق"}
                  onChange={(e) => {
                    if ((e.target.value >= 0 && e.target.value < 60) || e.target.value === "")
                      newData("min", e.target.value)
                  }}
                  value={form.min}
                />
                <div className="invalid-feedback">{validation.msg}</div>
                <small id={"min" + "Help"} className="form-text text-muted">
                  {""}
                </small>
              </div>
              <small className="form-text text-muted mt-1 mb-3">
                {validation}
              </small>
              <Btn submitForm={addSession} btn={{ type: "button", className: "btn btn-primary", value: "add session" }} />
            </ClassForm>
          </RightSide>
        </Body>
        <Footer />
      </Container>
    </>
  );
}

export default Page;

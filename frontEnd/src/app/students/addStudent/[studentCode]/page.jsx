"use client"
import "app/class/style.css"

import Axios from 'api/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookie from "cookie-universal"
import Container from 'components/class/container';
import Nav from "components/nav/nav";
import Footer from "components/footer/footer";
import Body from "components/class/body";
import RightSide from "components/class/rightSide";
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { faChalkboardUser, faCirclePlus, faSchoolCircleCheck, faUserPen } from "@fortawesome/free-solid-svg-icons";
import ClassForm from "components/class/classForm";
import Btn from "components/loginBtn/btn";


const Page = ({ params }) => {
  const router = useRouter()
  const cookies = Cookie()

  const [userData, setUserData] = useState(null)
  // const [session, setSession] = useState(null);
  const [isLoading, setLoading] = useState(true)
  const [grades, setGrades] = useState([]);
  const [isError, setError] = useState("")
  const [data, setData] = useState({
    code: params.studentCode,
    fullName: "",
    phone: "",
    GuardianPhone: "",
    school: "",
    grade: {
      name: "",
      _id: "",
    },
  })
  useEffect(() => {
    if (!cookies.get('Token')) router.push("/login")
    Axios.get("/api/accounts/user")
      .then((response) => {
        setUserData(response.data)
      })
      .catch(() => {
        router.push("/login")
      })
    Axios.get(`/api/student/${params.studentCode}`).then((response) => {
      // setData(response.data)
      router.back()
    }).catch((error) => { })

    Axios.get(`/api/grades/`)
      .then((response) => {
        // console.log(response.data);
        setGrades(response.data.grades)
        setLoading(false)
      })
  }, [])


  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  const handleSubmit = async () => {
    if (data.GuardianPhone != "" && data.code != "" && data.fullName != "" && data.GuardianPhone != ""
      || data.phone != "" && data.school != "" && data.grade.name != "") {
      const Code = parseInt(data.code)
      if (!Number.isNaN(Code)) {
        try {

          await Axios.post("/api/student/", {
            ...data,
            grade: data.grade._id,
            code: Code
          })
          router.back()
        } catch (error) {
          setError("there is some thing wrong in your inputs")
          console.log(error);
        }
      }
    } else {
      setError("قم بملئ كل البيانات")
    }
  }
  return (
    <Container>
      <Nav />
      <Body>
        <SideBarContainer>
          <SideBarLinks icon={faChalkboardUser} label={"Sessions"} href={"/class"} Aclass={""} />
          <SideBarLinks icon={faCirclePlus} label={"Add Sessionsession"} href={"/class/add-session"} Aclass={""} />
          <SideBarLinks icon={faUserPen} label={"Update A Student"} href={"/students/update"} Aclass={""} />
          <SideBarLinks icon={faSchoolCircleCheck} label={"Active Sessions"} href={"/class/acctive-sessions"} Aclass={"active"} />
        </SideBarContainer>
        <RightSide title={"ADD STUDENT"} active={"acctiveSessions"}>
          <ClassForm >

            <div className="form-group">
              <label htmlFor="code">كود الطالب</label>
              <input
                type="number"
                className={"form-control"}
                id="code"
                name="code"
                aria-describedby={"code" + "Help"}
                placeholder={"كود الطالب"}
                value={data.code}
              />
              <div className="invalid-feedback"></div>
              <small id={"hour" + "Help"} className="form-text text-muted">
                {/* كود الطالب */}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="fullName">اسم الطالب</label>
              <input
                type="text"
                className={"form-control "}
                id="fullName"
                name="fullName"
                aria-describedby={"fullName" + "Help"}
                placeholder={"اسم الطالب"}
                value={data.fullName}
                onChange={handleData}
              />
              <div className="invalid-feedback"></div>
              <small id={"fullName" + "Help"} className="form-text text-muted">
                {""}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="phone">رقم الطالب</label>
              <input
                type="number"
                className={"form-control "}
                id="phone"
                name="phone"
                aria-describedby={"phone" + "Help"}
                placeholder={"رقم الطالب"}
                value={data.phone}
                onChange={handleData}
              />
              <div className="invalid-feedback"></div>
              <small id={"phone" + "Help"} className="form-text text-muted">
                {""}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="GuardianPhone">رقم ولي الأمر</label>
              <input
                type="number"
                className={"form-control "}
                id="GuardianPhone"
                name="GuardianPhone"
                aria-describedby={"GuardianPhone" + "Help"}
                placeholder={"رقم ولي الأمر"}
                value={data.GuardianPhone}
                onChange={handleData}
              />
              <div className="invalid-feedback"></div>
              <small id={"GuardianPhone" + "Help"} className="form-text text-muted">
                {""}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="school">المدرسة</label>
              <input
                type="text"
                className={"form-control "}
                id="school"
                name="school"
                aria-describedby={"school" + "Help"}
                placeholder={"المدرسة"}
                value={data.school}
                onChange={handleData}
              />
              <div className="invalid-feedback"></div>
              <small id={"school" + "Help"} className="form-text text-muted">
                {""}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="">المرحلة الدراسية</label>
              <div className="dropdown">
                <a className="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {
                    data.grade.name == "" ? "المرحلة الدراسية" : data.grade.name
                  }
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  {
                    grades.map((grade, index) => {
                      return (
                        <button key={index} type='button' className="dropdown-item" onClick={() => {
                          setData({ ...data, grade })
                        }}>{grade.name}</button>
                      )
                    })
                  }
                </div>
              </div>
              <div className="invalid-feedback"></div>
              <small id={"المدرسة" + "Help"} className="form-text text-muted">
                {""}
              </small>
            </div>
            <small className="form-text text-muted mt-1 mb-3">
              {isError}
            </small>
            <Btn submitForm={handleSubmit} btn={{ type: "button", className: "btn btn-primary", value: "اضافت طالب" }} />

          </ClassForm>
        </RightSide>

      </Body>
      <Footer />
    </Container>
  );
}

export default Page;

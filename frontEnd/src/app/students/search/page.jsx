"use client"
import "app/class/style.css"
import Container from 'components/class/container';
import Nav from 'components/nav/nav';
import { useEffect, useState } from 'react';
import Body from 'components/class/body';
import Footer from 'components/footer/footer';
import { faMagnifyingGlass, faUserPen, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import RightSide from "components/sutdents/rightSide";
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { useRouter } from "next/navigation";
import Loader from "components/loader/loader";
import Cookie from 'cookie-universal'
import Axios from "api/axios";
import { Html5QrcodeScanner } from 'html5-qrcode';
import StudentCodeQr from "components/studentCodeQr/studentCodeQr";

const Page = () => {
  const router = useRouter()
  const cookies = Cookie()
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [code, setCode] = useState();
  const [isError, setError] = useState("");

  useEffect(() => {
    if (!cookies.get('Token')) router.push("/login")
    Axios.get("/api/accounts/user")
      .then((response) => {
        setUserData(response.data)
        setLoading(false)
      })

  }, [])

  async function success(code) {
    const Code = parseInt(code)
    if (!Number.isNaN(Code)) {
      try {
        const student = await Axios.get(`/api/student/${code}`)
        router.push(`/students/search/${Code}`)
      } catch (error) {
        setError("هذا الطالب غير موجود")
      }
    } else {
      setError("invalid Qr")
    }
  }
  if (isLoading) return <Loader />
  if (!userData) return router.push("/login")

  return (
    <Container>
      <Nav />
      <Body>
        <SideBarContainer>
          <SideBarLinks icon={faUsers} label={"Students"} href={"/students"} Aclass={"active"} />
          <SideBarLinks icon={faUserPlus} label={"Add Student"} href={"/students/addStudent"} Aclass={""} />
          <SideBarLinks icon={faUserPen} label={"Update A Student"} href={"/students/update"} Aclass={""} />
        </SideBarContainer>
        <RightSide title={"SEARCH"} active={"Students"}>
          <StudentCodeQr success={success} />
          <p>{isError}</p>
          <div className="w-100 d-flex justify-content-between align-items-center" style={{ margin: "20px 0" }}>
            <div className="col-4" style={{ borderBottom: "1px solid #fff" }}></div>
            <div className="col-4" style={{ textAlign: "center" }}>OR</div>
            <div className="col-4" style={{ borderBottom: "1px solid #fff" }}></div>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="name">كود الطالب</label>
              <input type="number" className="form-control" id="code" name="code" placeholder="كود الطالب" onChange={(e) => setCode(e.target.value)} />
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={() => { success(code) }}>ارسال</button>
            </div>
          </div>
        </RightSide>
      </Body>
      <Footer />
    </Container>
  );
}

export default Page;

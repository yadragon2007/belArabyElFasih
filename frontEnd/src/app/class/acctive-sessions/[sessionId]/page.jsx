"use client"
import "app/class/style.css"

import Axios from 'api/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookie from "cookie-universal"
import Loader from 'components/loader/loader';
import Container from 'components/class/container';
import Nav from "components/nav/nav";
import Footer from "components/footer/footer";
import Body from "components/class/body";
import { Html5QrcodeScanner } from 'html5-qrcode';
import RightSide from "components/class/rightSide";
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { faAngleDown, faChalkboardUser, faCirclePlus, faSchoolCircleCheck } from "@fortawesome/free-solid-svg-icons";
import GetStudentCode from "components/getStudentCode/getStudentCode";


const Page = ({ params }) => {
  const router = useRouter()
  const cookies = Cookie()

  const [userData, setUserData] = useState(null)
  const [session, setSession] = useState(null);
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    if (!cookies.get('Token')) router.push("/login")
    Axios.get("/api/accounts/user")
      .then((response) => {
        setUserData(response.data)
      })
    Axios.get(`/api/sessions/${params.sessionId}`)
      .then((response) => {
        setSession(response.data)
        setLoading(false)

      })
  }, [])


  if (isLoading) return <Loader />
  if (!userData) return router.push("/login")

  return (
    <Container>
      <Nav />
      <Body>
        <SideBarContainer>
          <SideBarLinks icon={faChalkboardUser} label={"Sessions"} href={"/class"} Aclass={""} />
          <SideBarLinks icon={faCirclePlus} label={"Add Sessionsession"} href={"/class/add-session"} Aclass={""} />
          <SideBarLinks icon={faSchoolCircleCheck} label={"Active Sessions"} href={"/class/acctive-sessions"} Aclass={"active"} />
        </SideBarContainer>
        <RightSide title={"ADD STUDENT"} active={"acctiveSessions"}>
          <GetStudentCode sessionId={params.sessionId} successPageUrl={"/class/acctive-sessions/" + params.sessionId} />
        </RightSide>

      </Body>
      <Footer />
    </Container>
  );
}

export default Page;

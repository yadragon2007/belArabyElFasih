"use client"
import "app/class/style.css"
import Container from 'components/class/container';
import Nav from 'components/nav/nav';
import { useEffect, useState } from 'react';
import Body from '../../../components/class/body';
import Footer from 'components/footer/footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser, faCirclePlus, faSchool, faSchoolCircleCheck } from "@fortawesome/free-solid-svg-icons";
import RightSide from "components/class/rightSide";
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { useRouter } from "next/navigation";
import Loader from "components/loader/loader";
import { useRef } from 'react';
import AllSessions from "components/class/allSessions/allSessions";
import Cookie from 'cookie-universal'
import Axios from "api/axios";

const Page = () => {
  const router = useRouter()
  const cookies = Cookie()
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!cookies.get('Token')) router.push("/login")
    Axios.get("/api/accounts/user")
      .then((response) => {
        setUserData(response.data)
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
          <SideBarLinks icon={faChalkboardUser} label={"Sessions"} href={"/class"} Aclass={"active"} />
          <SideBarLinks icon={faCirclePlus} label={"Add Sessionsession"} href={"/class/add-session"} Aclass={""} />
          <SideBarLinks icon={faSchoolCircleCheck} label={"Active Sessions"} href={"/class/acctive-sessions"} Aclass={""} />
        </SideBarContainer>
        <RightSide title={"SESSIONS"} active={"sessions"}>

          <AllSessions />
        </RightSide>
      </Body>
      <Footer />
    </Container>
  );
}

export default Page;

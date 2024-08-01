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
import AllStudents from "components/sutdents/allStudents";
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
          <SideBarLinks icon={faUsers} label={"Students"} href={"/students"} Aclass={"active"} />
          <SideBarLinks icon={faUserPlus} label={"Add Student"} href={"/students/addStudent"} Aclass={""} />
          <SideBarLinks icon={faUserPen} label={"Update A Student"} href={"/students/update"} Aclass={""} />
          <SideBarLinks icon={faMagnifyingGlass} label={"Get A Student"} href={"/students/search"} Aclass={""} />
        </SideBarContainer>
        <RightSide title={"STUDENTS"} active={"Students"}>
          <AllStudents />
        </RightSide>
      </Body>
      <Footer />
    </Container>
  );
}

export default Page;

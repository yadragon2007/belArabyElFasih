"use client"

import { useEffect, useState } from 'react';
import "../style.css"
import Nav from 'components/nav/nav.jsx';
import Footer from 'components/footer/footer.jsx';
import Input from 'components/setting/input';
import { useRouter } from 'next/navigation';
import Loader from 'components/loader/loader';
import Btn from 'components/loginBtn/btn';
import LinksNav from "components/setting/nav";
// icons
import { faUser, faGears, faGear, faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
import Icon from 'components/icons/icons';
import Link from 'next/link';
import SideBarContainer from 'components/sideBar/sideBarContainer';
import SideBarLinks from 'components/sideBar/sideBarLinks';
import NavContainer from 'components/menuNav/navContainer';
import NavLinks from 'components/menuNav/navLinks';
import Cookie from 'cookie-universal'
import Axios from 'api/axios';


const Page = () => {
  const cookies = Cookie()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!cookies.get("Token")) router.push("/login")

    Axios.get("/api/accounts/user").then((response) => {
      setUserData(response.data.data)
      setLoading(false)
    })
  }, [])

  if (isLoading) return <Loader />
  if (!userData || !userData.admin) return router.push("/login")





  return (<div className='row justify-content-between flex-column'>
    <Nav />

    <div className="" style={{ margin: "0", marginRight: "30px", marginLeft: "30px", minHeight: "calc(100vh - 170px)" }}>
      <div className="row gutters-sm" style={{ margin: 0 }}>
        <SideBarContainer>
          <SideBarLinks icon={faHouse} label={"home"} href={"/setting"} Aclass={""} />
          <SideBarLinks icon={faUser} label={"Add Assistant"} href={"/setting/add-assistant"} Aclass={""} />
          <SideBarLinks icon={faUsers} label={"Assistants"} href={"/setting/assistants"} Aclass={""} />
          <SideBarLinks icon={faGears} label={"Account Settings"} href={"/setting/account"} Aclass={"active"} />
        </SideBarContainer>
        <div className="col-md-8">
          <div className="card">
            <NavContainer>
              <NavLinks icon={faHouse} href={"/setting"} Aclass={""} />
              <NavLinks icon={faUser} href={"/setting/add-assistant"} Aclass={""} />
              <NavLinks icon={faUsers} href={"/setting/assistants"} Aclass={""} />
              <NavLinks icon={faGears} href={"/setting/account"} Aclass={"active"} />
            </NavContainer>
            <div className="card-body tab-content">
              <div className="tab-pane fade show active" style={{ height: "100%" }} id="account">
                <h6>ACCOUNT SETTINGS</h6>
                <hr />
                <form>
                  <Link href="/logout" className="btn btn-danger" type="button">
                    logOut
                  </Link>
                  <small id="usernameHelp" className="form-text text-muted">
                    After loging out, you wont be able to vist this site until you log in again.
                  </small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>



    <Footer />
  </div>

  );
}

export default Page;

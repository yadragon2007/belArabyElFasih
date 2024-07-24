"use client"

import { useEffect, useState } from 'react';
import "../style.css"
import Nav from 'components/nav/nav.jsx';
import Footer from 'components/footer/footer.jsx';
import { useRouter } from 'next/navigation';
import Loader from 'components/loader/loader';
// icons
import { faUser, faGears, faGear, faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
import Icon from 'components/icons/icons';
import Link from 'next/link';
import SideBarContainer from 'components/sideBar/sideBarContainer';
import SideBarLinks from 'components/sideBar/sideBarLinks';
import NavContainer from 'components/menuNav/navContainer';
import NavLinks from 'components/menuNav/navLinks';
import Cookie from 'cookie-universal'


const Page = () => {
  const cookies = Cookie()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!cookies.get("Token")) router.push("/login")

    fetch('http://localhost:8080/api/accounts/user', {
      method: "get", headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + cookies.get("Token")

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





  return (<div className='row justify-content-between flex-column'>
    <Nav />

    <div className="" style={{ margin: "0", marginRight: "30px", marginLeft: "30px", minHeight: "calc(100vh - 170px)" }}>
      <div className="row gutters-sm" style={{ margin: 0 }}>
        {/* <SideBar active="home" /> */}
        <SideBarContainer>
          <SideBarLinks icon={faHouse} label={"home"} href={"/setting"} Aclass={"active"} />
          <SideBarLinks icon={faUser} label={"Add Assistant"} href={"/setting/add-assistant"} Aclass={""} />
          <SideBarLinks icon={faUsers} label={"Assistants"} href={"/setting/assistants"} Aclass={""} />
          <SideBarLinks icon={faGears} label={"Account Settings"} href={"/setting/account"} Aclass={""} />
        </SideBarContainer>
        <div className="col-md-8">
          <div className="card">
            <NavContainer>
              <NavLinks icon={faHouse} href={"/setting"} Aclass={"active"} />
              <NavLinks icon={faUser} href={"/setting/add-assistant"} Aclass={""} />
              <NavLinks icon={faUsers} href={"/setting/assistants"} Aclass={""} />
              <NavLinks icon={faGears} href={"/setting/account"} Aclass={""} />
            </NavContainer>
            <div className="card-body tab-content">
              <div className="tab-pane fade show active " id="home">
                <h6>SETTING</h6>
                <hr />
                <div className="" style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                  <h1 className=''>
                    <Icon icon={faGear} />
                  </h1>
                  <span className="" style={{ margin: "0" }}>setting</span>
                  <div className="form-group small text-muted" style={{ margin: "0" }}>
                    welcome to setting {userData.userName}
                  </div>
                </div>

              </div>


              <div className="tab-pane" id="security">
                <h6>SECURITY SETTINGS</h6>
                <hr />
                <form>
                  <div className="form-group">
                    <label className="d-block">Change Password</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your old password"
                    />
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="New password"
                    />
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Confirm new password"
                    />
                  </div>
                </form>
                <hr />
                <form>
                  <div className="form-group">
                    <label className="d-block">Two Factor Authentication</label>
                    <button className="btn btn-info" type="button">
                      Enable two-factor authentication
                    </button>
                    <p className="small text-muted mt-2">
                      Two-factor authentication adds an additional layer of security
                      to your account by requiring more than just a password to log
                      in.
                    </p>
                  </div>
                </form>
                <hr />
                <form>
                  <div className="form-group mb-0">
                    <label className="d-block">Sessions</label>
                    <p className="font-size-sm text-secondary">
                      This is a list of devices that have logged into your account.
                      Revoke any sessions that you do not recognize.
                    </p>
                    <ul className="list-group list-group-sm">
                      <li className="list-group-item has-icon">
                        <div>
                          <h6 className="mb-0">San Francisco City 190.24.335.55</h6>
                          <small className="text-muted">
                            Your current session seen in United States
                          </small>
                        </div>
                        <button
                          className="btn btn-light btn-sm ml-auto"
                          type="button"
                        >
                          More info
                        </button>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
              <div className="tab-pane" id="notification">
                <h6>NOTIFICATION SETTINGS</h6>
                <hr />
                <form>
                  <div className="form-group">
                    <label className="d-block mb-0">Security Alerts</label>
                    <div className="small text-muted mb-3">
                      Receive security alert notifications via email
                    </div>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                        defaultChecked
                      />
                      <label className="custom-control-label" htmlFor="customCheck1">
                        Email each time a vulnerability is found
                      </label>
                    </div>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck2"
                        defaultChecked
                      />
                      <label className="custom-control-label" htmlFor="customCheck2">
                        Email a digest summary of vulnerability
                      </label>
                    </div>
                  </div>
                  <div className="form-group mb-0">
                    <label className="d-block">SMS Notifications</label>
                    <ul className="list-group list-group-sm">
                      <li className="list-group-item has-icon">
                        Comments
                        <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch1"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch1"
                          />
                        </div>
                      </li>
                      <li className="list-group-item has-icon">
                        Updates From People
                        <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch2"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch2"
                          />
                        </div>
                      </li>
                      <li className="list-group-item has-icon">
                        Reminders
                        <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch3"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch3"
                          />
                        </div>
                      </li>
                      <li className="list-group-item has-icon">
                        Events
                        <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch4"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch4"
                          />
                        </div>
                      </li>
                      <li className="list-group-item has-icon">
                        Pages You Follow
                        <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch5"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch5"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
              <div className="tab-pane" id="billing">
                <h6>BILLING SETTINGS</h6>
                <hr />
                <form>
                  <div className="form-group">
                    <label className="d-block mb-0">Payment Method</label>
                    <div className="small text-muted mb-3">
                      You have not added a payment method
                    </div>
                    <button className="btn btn-info" type="button">
                      Add Payment Method
                    </button>
                  </div>
                  <div className="form-group mb-0">
                    <label className="d-block">Payment History</label>
                    <div className="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm">
                      You have not made any payment.
                    </div>
                  </div>
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

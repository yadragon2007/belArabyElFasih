"use client"

import "../style.css"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import Link from 'next/link';


import Nav from 'components/nav/nav.jsx';
import Footer from 'components/footer/footer.jsx';
import Input from 'components/setting/input';
import Loader from 'components/loader/loader';
import Btn from 'components/loginBtn/btn';
import LinksNav from "components/setting/nav"
import SideBarContainer from "components/sideBar/sideBarContainer";
import SideBarLinks from "components/sideBar/sideBarLinks";
import { faGears, faHouse, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import Cookie from 'cookie-universal'
import Axios from "api/axios";


// icons

const Page = () => {
  const cookies = Cookie()

  // check userData
  const router = useRouter()



  const [form, setForm] = useState({
    fullName: '',
    userName: '',
    password: '',
  });
  const [validation, setValidation] = useState({
    validation: '',
  });
  const [success, setSuccess] = useState("")
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

  function newData(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function addAssistant() {
    try {
      const response = await Axios.post("/api/accounts/", {
        fullName: form.fullName,
        userName: form.userName,
        password: form.password,
      })

      setForm({
        fullName: '',
        userName: '',
        password: '',
      })
      setSuccess("assistant added successfully")
      setValidation({ validation: "" })
    } catch (error) {
      console.log(error);
      setValidation({ validation: 'is-invalid' });
    }
  }
  return (<div className='row justify-content-between flex-column'>
    <Nav />

    <div className="" style={{ margin: "0", marginRight: "30px", marginLeft: "30px", minHeight: "calc(100vh - 170px)" }}>
      <div className="row gutters-sm">
        <SideBarContainer>
          <SideBarLinks icon={faHouse} label={"home"} href={"/setting"} Aclass={""} />
          <SideBarLinks icon={faUser} label={"Add Assistant"} href={"/setting/add-assistant"} Aclass={"active"} />
          <SideBarLinks icon={faUsers} label={"Assistants"} href={"/setting/assistants"} Aclass={""} />
          <SideBarLinks icon={faGears} label={"Account Settings"} href={"/setting/account"} Aclass={""} />
        </SideBarContainer>
        <div className="col-md-8">
          <div className="card">
            <LinksNav active="addAssistant" />
            <div className="card-body tab-content">
              <div className="tab-pane active" id="addAssistant">
                <h6>ADD NEW ASSISTANTS</h6>
                <hr />
                <form>
                  <Input
                    label={{ for: "fullName", content: "Full-Name" }}
                    input={{ type: "text", id: "fullName", name: "fullName", placeholder: "Enter full name", value: form.fullName }}
                    validation={{ class: validation.validation, msg: "" }}
                    msg="Enter Assistant Full Name (unable to Update)"
                    newData={newData} />
                  <Input
                    label={{ for: "userName", content: "User-Name" }}
                    input={{ type: "text", id: "userName", name: "userName", placeholder: "Enter user name", value: form.userName }}
                    validation={{ class: validation.validation, msg: "" }}
                    msg="Enter Assistant User Name (unable to Update)"
                    newData={newData} />

                  <Input
                    label={{ for: "password", content: "password" }}
                    input={{ type: "password", id: "password", name: "password", placeholder: "Enter password", value: form.password }}
                    validation={{ class: validation.validation, msg: "" }}
                    msg="Enter Assistant password (unable to Update)"
                    newData={newData} />
                  <div className="form-group small text-success">
                    {success}
                  </div>
                  <div className="form-group small text-muted">
                    All of the fields on this page are reqiered ,
                    you're giving us consent to
                    share this data wherever your user profile appears.
                  </div>

                  <Btn
                    btn={{ type: "button", className: "btn btn-primary", value: "Add Assistant" }}
                    submitForm={addAssistant} />
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

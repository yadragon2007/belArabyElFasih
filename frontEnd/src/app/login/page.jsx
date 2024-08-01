"use client"


import axios from "axios";
import AxiosLogin from "../../api/axiosLogin.js"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import "bootstrap/dist/css/bootstrap.css";
import Footer from 'components/footer/footer.jsx';
import Nav from 'components/nav/nav.jsx';
import input from "components/inputAndLable/input.jsx"
import Btn from "components/loginBtn/btn.jsx";
import Cookie from 'cookie-universal'

const { Input, sendData } = input;

const Page = () => {
  const router = useRouter()
  const cookies = Cookie()
  const [form, setForm] = useState({
    userName: '',
    password: '',
  });
  const [validation, setValidation] = useState({
    validation: '',
  });

  function newData(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function login() {
    try {
      const response = await AxiosLogin.post("/api/accounts/login", {
        userName: form.userName,
        password: form.password,
      })

      console.log(response.data);
      // localStorage.setItem("Token", response.data.Token)
      cookies.set('Token', response.data.Token, {
        secure: true,
        maxAge: 30 * 24 * 60 * 60
      })


      router.push('/')
    } catch (error) {
      setValidation({ validation: 'is-invalid' });
    }
  }



  return (
    <div className='row justify-content-between flex-column' style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Nav />
      <div className="mt-5 mb-5 row justify-content-around ">
        <div className="col-lg-4 col-11 mb-5 mb-lg-0">
          <h1 style={{ fontSize: 35 }}>login</h1>
          <form className="">
            <Input
              inputData={{ type: "text", vlidation: validation.validation, name: "userName", id: "userName" }}
              labelData={{ for: "userName", value: "userName" }}
              newData={newData}
            />
            <Input
              inputData={{ type: "password", vlidation: validation.validation, name: "password", id: "password" }}
              labelData={{ for: "password", value: "password" }}
              newData={newData}
            />

            <div className="d-flex justify-content-start flex-column">
              <Btn
                submitForm={login}
                btn={{ type: "button", className: "btn btn-primary col-12 col-md-2 col-lg-3", value: "login" }} />

            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;

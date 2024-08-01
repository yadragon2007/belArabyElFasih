
"use client"
import React, { useEffect, useState } from 'react';
import Cookie from 'cookie-universal'
import { useRouter } from 'next/navigation';

import InputA from 'components/inputAndLable/input';
import Btn from 'components/loginBtn/btn';

const ClassForm = ({ children }) => {
  // const cookies = Cookie()



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


  function newData(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }


  return (

    <form>
      {children}
    </form>

  );
}

export default ClassForm;

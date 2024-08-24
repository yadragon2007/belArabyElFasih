import { faCircleInfo, faFilter, faPen, faPlay, faQrcode, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from 'components/loader/loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookie from 'cookie-universal'
import Axios from 'api/axios';


const allStudents = () => {
  const cookies = Cookie()
  const router = useRouter()
  const [students, setStudents] = useState(null)
  const [constStudents, setConstStudents] = useState([])
  const [grades, setGrades] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [gradeFilter, setGradeFilter] = useState({
    name: ""
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    Axios.get(`/api/grades/`)
      .then((response) => {
        setGrades(response.data.grades)
      })
    Axios.get("/api/student/"
    ).then((respons) => {
      const data = respons.data
      setStudents(data)
      setConstStudents(data)
      setLoading(false)
    })
  }, [])

  const Fillter = async (grade, search) => {
    if (grade == "all" || grade.name == "") {
      setStudents(constStudents)
      searchFillter(constStudents, search)
    } else {
      const fillteredStudents = constStudents.filter((student) => student.grade._id === grade._id)
      setStudents(fillteredStudents)
      searchFillter(fillteredStudents, search)
    }
  }

  const searchFillter = (studentsAfterGradeFillter, searchData) => {
    if (searchData != "") {
      const fillteredStudents = studentsAfterGradeFillter.filter((student) => {
        return student.fullName.includes(searchData) || student.phone.includes(searchData) || student.GuardianPhone.includes(searchData) || student.school.includes(searchData)
      })
      setStudents(fillteredStudents)
    } else return


  }


  if (isLoading) return <Loader />
  if (!students) return router.push("/login")

  return (
    <>
      {/* fillter */}

      <div className="form-group">
        <label htmlFor="search">بحث</label>
        <div className="row justify-content-lg-between" style={{ margin: "0" }}>
          <div className="input-group col-12 col-lg-8 p-0">
            <input
              type="text"
              className="form-control"
              placeholder="search"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={
                (e) => {
                  setSearch(e.target.value)
                  Fillter(gradeFilter, e.target.value)
                }
              }
            />
            <div className="input-group-append">
              <Link
                href="/students/search"
                className="btn btn-primary"
                type="button"
                id="button-addon2"
              >
                <FontAwesomeIcon icon={faQrcode} />
              </Link>
            </div>
          </div>

          <div className="form-group col-12 col-lg-3 mt-2 mt-lg-0 " style={{ padding: "0", margin: "0" }}>
            <div className="dropdown w-100">
              <a className="btn btn-primary dropdown-toggle m-0 w-100" href="#" role="button"
                id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {
                  gradeFilter.name == "" ? "المرحلة الدراسية" : gradeFilter.name
                }
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <button type='button' className="dropdown-item" onClick={() => {
                  Fillter("all", search)
                  setGradeFilter({
                    name: ""
                  })
                }}>الكل</button>
                {
                  grades.map((grade, index) => {
                    return (
                      <button key={index} type='button' className="dropdown-item" onClick={() => {
                        Fillter(grade, search)
                        setGradeFilter({ ...grade })
                      }}>{grade.name}</button>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>

        <small id="searchHelp" className="form-text text-muted">
          البحث باسم الطالب او المدرسة او رقم الهاتف او المرحلة
        </small>
      </div>
      {/* students */}
      {students.map((student, index) => {
        return (
          <div key={index} className="w-100 row justify-content-center justify-content-lg-between align-items-center border-dark pb-2 pt-2" style={{ minHeight: "100%", margin: "10px 0", border: "4px solid", borderRadius: "10px" }}>
            <div className="w-100 row justify-content-center justify-content-lg-between align-items-center mt-2 mb-2 col-md-12 col-lg-4">
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>{student.fullName}</p>
              <p className="col-12 row justify-content-center" style={{ margin: "0" }}>
                {student.grade.name}
              </p>
            </div>
            <div className=" d-flex justify-content-around align-items-center col-md-12 col-lg-3">
              <Link href={"/students/update/" + student.code} className="btn btn-primary">
                <FontAwesomeIcon icon={faPen} />
              </Link>
              <Link href={"/students/search/" + student.code} className="btn btn-primary">
                <FontAwesomeIcon icon={faCircleInfo} />
              </Link>
            </div>
          </div >
        )
      })}
    </>
  );
}

export default allStudents;

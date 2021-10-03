import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCourses } from "../../services/courseService";
import DeleteCourse12 from "./dialogs/DeleteCourse12";




const CourseTable = ({ setSearch, filteredCourses , courses, setCourses }) => {

  const [currentCourse, setCurrentCourse] = useState({});
  const [cId, setCId] = useState();

  const [show, setShow] = useState(false);



  const handleClose = () => setShow(false);
  const handleShow = () => { setShow(true); }



  useEffect(() => {
    getCourses()
    .then(({data}) =>
      setCourses(data.courses))
  }, []);

  
  


  return (
    <div id='cTable' className='body-ctable'>
      <div className='row-ctable row'>


        <ul className="nav nav2 mb-5 col-12 ">
          <li className="nav-item ml-2">
            <Link to='/' className="btn btn-outline-light border-danger">خانه</Link>
          </li>
        </ul>



        <div className=" a-dark1 row">

          <Link to='/createcourse'
            className="btn btn-primary mx-auto form-control col-5">ساخت دوره</Link>

          <form className=" col-7 p-0 row position-relative" >
            <input onChange={(e) => { setSearch(e.target.value) }} className='form-control mx-auto col-10 ' type="text" placeholder='دنبال چه دوره ای هستی' />
            <button style={{ left: '1.2rem' }} className='border  label-search fa fa-search position-absolute'></button>
          </form>
        </div>



        <Table className='table-ctable' bsPrefix bordered hover >
          <thead className='ttab thead1'>
            <tr className='ttab tr1'>
              <th className='text-center'> # </th>
              <th className='text-center'> عنوان دوره</th>
              <th className='text-center'> نمایش دوره</th>
              <th className='text-center'>قسمت جدید</th>
              <th className='text-center'> ویرایش دوره</th>
              <th className='text-center'>حذف دوره</th>
            </tr>
          </thead>


          {filteredCourses.map((course, index) => (
            <tbody className='tbody ttab' key={course._id}>
              <tr className='tr ttab tr2-tr'>
                <td className='tr2-td badge cbadge mt-2'>{index + 1} </td>
                <td className='tr2-td c-teacher'> {course.title.charAt(0).toUpperCase() + course.title.slice(1)}</td>
                <td className='tr2-td'><Link to={`/singlecourse/${course._id}`} className='btn btn-primary form-control w-75 textdark'>مشاهده</Link> </td>
                <td className='tr2-td'><Link to={`/newpart/${course._id}`} className='btn btn-success form-control w-75 textdark'>افزودن</Link> </td>
                <td className='tr2-td'><Link to={`/edite/${course._id}`} className='btn btn-warning form-control w-75 textdark'>ویرایش</Link> </td>
              
                <td ><button className="btn btn-danger" onClick={() => { setCId(course._id); setCurrentCourse(course.title);handleShow() }}>حذف</button>
                  < DeleteCourse12 cId={cId} setCourses={setCourses} courses={courses} handleClose={handleClose}
                  handleShow={handleShow} currentCourse={currentCourse} show={show} setShow={setShow} />
                </td>
              </tr>
            </tbody>
          ))}


        </Table>
      </div>
    </div>
  );
};


export default CourseTable;

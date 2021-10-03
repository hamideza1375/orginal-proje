import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Pagination from './Pagination'
import moment from 'jalali-moment'
import { getCourses } from '../../services/courseService'



const Courses = ({  history, currentPage, perPage, handlePageChange, filteredCourses, courses,setCourses, courseData}) => {
 
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  useEffect(() => {
    getCourses()
      .then(({ data }) =>
        setCourses(data.courses))
  }, [/*courss*/]);





  // useEffect(() => {
   
  // }, [])




  return (

    <div id='courses' class='body-course'>


      <div className="col-12 div-fa m-0">
        <i className="i-fa-2 fa fa-instagram fa-4x"></i>
        <i className="i-fa-2 fa fa-language fa-4x"></i>
        <i className="i-fa-2 fa fa-dashboard fa-4x"></i>
        <i className="i-fa-2 fa fa-video-camera fa-4x"></i>
        <i className="i-fa-2 fa fa-ils fa-4x"></i>
      </div>

      <br />



      {/* <section class="bg-primary">

          <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark navbar-offcanvas">
            <button class="navbar-toggler d-block" type="button" id="navToggle">
            <span class="navbar-toggler-icon"  onClick={() => {
              document.getElementById("mySidenav").style.width = "250px";
              document.getElementById("mySidenav").style.background = "rgba(0,0,11)";
              document.getElementById("main").style.marginLeft = "250px";
            }}></span>
            </button>
          </nav>

      </section> */}











{/* <div> */}

        {/* <div>
          <div id="mySidenav" className="sidenav">
          <Link to='' href="/javascript:void(0)" className="closebtn" onClick={()=>{
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";}}>×
            </Link>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
          </div>
          <div id="main">
            <h2>Sidenav Push Example</h2>
            <p>Click on the element below to open the side navigation menu, and push this content to the right.</p>
     
          ☰
          </div>
        </div> */}

{/* </div> */}











      {/*  <div key={course._id} class='course-div col-sm-6 col-md-4 col-lg-3 col-auto' > */}

      <div className=" course-row"> 


        {courseData.map((course) => (

          <div key={course._id} class='course-div'  >


            <article onClick={() => {history.push(`/singlecourse/${course._id}`)}} class="course-article" >
              <img class='course-img' src={`http://localhost:4000/upload/${course.imageUrl}`} />
              <div class="div-row-star mt-3" >
                <Link to={`/singlecourse/${course._id}`} class='course-link '><i> {course.title}  </i></Link>
                <span class='span-star' >
                  <i class='i-star fa fa-star'></i>
                  <i class='i-star fa fa-star'></i>
                  <i class='i-star fa fa-star'></i>
                  <i class='i-star fa fa-star'></i>
                  <i class='i-star fa fa-star'></i>
                </span>
              </div>
              <hr class="mb-2 mt-2" />
              <div class="row row-div-course1 ">
                <i class='zmdi zmdi-account col-12 teacher mb-1 '>
                  <span class='ml-1'>مدرس: </span> teacher </i>
                <div class='row row11' >
                  <i class=' text-danger fa fa-heart heart '>
                    <span class="text-dark">
                      <strong> {course.like.filter((l) => l.like === true).length} </strong></span>  </i>
                  <i class='ml-1 fa fa-thumbs-up like'></i>
                </div>
              </div>
              <div class='div-link1'>
                <Link to={`/singlecourse/${course._id}`} class='course-link1 '> {course.price !== 0 ? course.price : "رایگان"}</Link>
                <Link to={`/singlecourse/${course._id}`} class='course-link3 '> {moment(course.createdAt).locale("fa").format(" YYYY / MM / DD ")}</Link>
              </div>
            </article>
          </div>

        ))}


      </div>


      <Pagination totalCourse={filteredCourses.length} currentPage={currentPage} perPage={perPage} onPageChange={handlePageChange} />
      <br />
      {/* <div id='row' class="row course-row"></div> */}


    </div >
  )
}

export default withRouter(Courses)

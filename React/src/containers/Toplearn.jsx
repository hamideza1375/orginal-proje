import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import CourseTable from "../components/admin/CourseTable";
import Dashboard from "../components/admin/Dashboard";
import NewCourseDialog from "../components/admin/dialogs/NewCourseDialog";
// import { Body } from "../components/common/Body";
import NotFound from "../components/common/NotFound";
import Courses from "../components/courses/Courses";
import SingleCourse from "../components/courses/SingleCourse";
import Layout from "../components/layout/Layout";
import Logout from "../components/user/Logout";
import UserLayout from "../components/user/UserLayout";
import UserProfile from "../components/user/UserProfile";
import EditCourseDialog from "../components/admin/dialogs/EditCourseDialog";
import NewPart from "../components/admin/dialogs/NewPart";
import ForgetPass from "../components/user/ForgetPass";
import ResetPass from "../components/user/ResetPass";
import { paginate } from '../utils/paginate'
import EditPart11 from "../components/admin/dialogs/EditPart11";
import Chat from "./socket/Chat";
import Login from "./socket/Login";
// import DeleteCourse12 from "../components/admin/dialogs/DeleteCourse12";



const Toplearn = () => {

 const [courses, setCourses] = useState([])
 const [currentPage, setCurrentPage] = useState(1);
 const [perPage] = useState(8);
 const [search, setSearch] = useState("");

 const [course, setCourse] = useState({});
 const [part, setPart] = useState([]);
 const [recaptcha, setRecaptcha] = useState("");
 const [token, setToken] = useState({})


 const [partTitle, setPartTitle] = useState();
 const [partPrice, setPartPrice] = useState();
 const [partInfo, setPartInfo] = useState();



   const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [info, setInfo] = useState();

  const [setId, setSetId] = useState()





 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setToken(token)
   const users = jwt.decode(token, { complete: true });
   const dateNow = Date.now() / 1000;
   if (users.payload.exp < dateNow) {
    localStorage.removeItem("token");
      setToken({})
   }
  }
 }, [token]);



 const handlePageChange = (page) => { setCurrentPage(page); };

 const filteredCourses = courses.filter((course) => course.title.includes(search.toLowerCase()));

 const courseData = paginate(filteredCourses, currentPage, perPage);






 const onreCaptchaExpire = () => { setRecaptcha("") };
 const onreCaptchaChange = (e) => { setRecaptcha(e) };





 return (
  <div className='container-fluid11 text-center'>

   <Layout setSearch={setSearch} >
       <Switch>

    <Route path="/chat1" exact render={() => <Login />} />
    <Route path="/chat2" exact render={() => <Chat />} />
    <Route path="/resetpass:/id" exact render={() => <ResetPass />} />
    <Route path="/forgetpass" exact render={() => <ForgetPass />} />
    <Route path="/edite/:id" exact render={() => <EditCourseDialog setCourses={setCourses} courses={courses} />} />

                 {/* <Route path="/deletecourse12/:id" exact render={() => <DeleteCourse12/> } /> */}


    <Route path="/createcourse" exact render={() => <NewCourseDialog 
    title={title} setTitle={setTitle} price={price} setPrice={setPrice} info={info} setInfo={setInfo} />} />


     <Route path="/dashboard" exact render={() => <Dashboard />} />
     <Route path="/profile" exact render={() => <UserProfile />} />
     <Route path="/logout" exact render={() => <Logout />} />
     <Route path="/register" exact render={() => <UserLayout />} />
     <Route path="/login" exact render={() => <UserLayout />} />
    <Route path="/admin" exact render={() => <CourseTable setCourses={setCourses} courses={courses} setSearch={setSearch} filteredCourses={filteredCourses} />} />

     <Route path="/editpart11/:id" exact component={()=> <EditPart11 part={part} setPart={setPart}/> } />

     <Route path="/newpart/:id" exact render={() => <NewPart part={part} setPart={setPart}
      partTitle={partTitle} setPartTitle={setPartTitle} partPrice={partPrice}
      setPartPrice={setPartPrice} partInfo={partInfo} setPartInfo={setPartInfo}/>} />

         <Route path="/singlecourse/:id" exact render={() => <SingleCourse
           course={course} setCourse={setCourse} recaptcha={recaptcha} setId={setId} setSetId={setSetId}
      part={part} setPart={setPart} token={token} onreCaptchaExpire={onreCaptchaExpire}
      onreCaptchaChange={onreCaptchaChange}  />} />

    <Route path="/" exact render={() => <Courses courses={courses} setCourses={setCourses} perPage={perPage} currentPage={currentPage}
      handlePageChange={handlePageChange} filteredCourses={filteredCourses} courseData={courseData} />} 
      setId={setId} setSetId={setSetId}/>
   
     {/* <Route path='/' exact component={Body} /> */}
     <Route exact component={NotFound} />
    </Switch>
   </Layout>

  </div>
 );
};

export default withRouter(Toplearn);




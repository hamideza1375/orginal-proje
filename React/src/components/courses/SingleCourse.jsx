import React, { useEffect, useRef, useState } from 'react'
import { Redirect, withRouter } from 'react-router';
import { Navbar } from '../common/Navbar'
import { courseIdValidator } from '../../IdValidator'
import {getTrueLike, editlikecourse,getComment, getCourse, getPartCourse, payment } from '../../services/courseService'
import Comment from './Comment';
import GetComment from './GetComment';
import { toast } from 'react-toastify';
import GetPart from './GetPart';






const SingleCourse = ({history, token, match, course, setCourse, part, setPart, recaptcha, onreCaptchaExpire, onreCaptchaChange }) => {

  const [like, setLike] = useState();
  const [likeCourse, setLikeCourse] = useState([]);
  
  const [message, setMessage] = useState("");



  const ref = useRef()


  useEffect(() => {      
    getTrueLike(match.params.id)
      .then(({ data }) => {
       if(ref) ref.current.className = (like) ? 'fa fa-heart text-danger fa-2x m-1' : 'fa fa-heart-o text-danger fa-2x m-1'
           setLike(data.like2); 
            console.log(`{ ${data.like2} }` ) 
      }).catch((err) => { 
        //  ref.current.className ='fa fa-heart-o text-danger fa-2x m-1';
        console.log(err.message) })
  }, [like])



  const handleLike = async() => {
    try{
    const like1 = editlikecourse(match.params.id, { like: !like })
    const { data, status } = await like1;
    if (status === 200) {
       setLike(!like)
      console.log(`{( ${data.like } })`);
    }
  } catch(err){
      setLike(false)
      toast.error('بری پسندیدن ابتدا باید در دوره ثبت نام کنید') 
      console.log(err)
  }
  }




  useEffect(() => {
    if (courseIdValidator(match.params.id)){
     getCourse(match.params.id).then((c) => {
       if(c) {
       setCourse(c)
         const sisi = c.like.filter((l)=>l.like === true)
         setLikeCourse(sisi.length)
       } else return history.go(-1)
      })
    } else { return history.go(-1)}
  }, [/*course*/like])




  useEffect(() => {
      getPartCourse(match.params.id).then(({ data }) => {
        setPart(data.part)
      })
  }, [part])

  if (!courseIdValidator(match.params.id)) return <Redirect to="/404" />;



 const onSubmitForm = async (e) => {
  e.preventDefault();
  try {
   if (!token) {
    return toast.warn('برای دسترسی ابتدا ثبت نام و ورود کنید')
   }
   const getCode = payment(match.params.id);
   const { status, data } = await getCode;
   if (status === 200) {
    toast.success("موفق");
    window.location = data;
   } else toast.error('مشکلی پیش آمد')

  } catch (err) {
   toast.error('مشکلی پیش آمد')
   console.log(err);
  }
 }



 return (
  <div id='single'>

   <Navbar />

   <div style={{ position: "relative", zIndex: '2', transform: 'translatey(-5px)' }} className="col-12 div-fa m-0">
    <i className="i-fa-2 fa fa-instagram col-2 fa-4x"></i>
    <i className="i-fa-2 fa fa-language col-2 fa-4x"></i>
    <i className="i-fa-2 fa fa-dashboard col-2 fa-4x"></i>
    <i className="i-fa-2 fa fa-video-camera col-2 fa-4x"></i>
    <i className="i-fa-2 fa fa-ils col-2 fa-4x"></i>
   </div>

   <div className='row single-div-row '>
    <div className='single-div col-12'>
     <div className='single-div2 single-div222 row'>


      <div className="col-lg-4 col-sm-12 alert-secondary border-top-0">
       <div className='pt-5 pb-5' >
        <ul className="ul-teacher " >
         <li><strong> مدرس: </strong>محمد حامدی</li>
         <li><strong> تعداد دانشجو: </strong>980 نفر</li>
         <li><strong> آخرین بروزرسانی: </strong>28/5/1400</li>
         <li><strong> سطح دوره: </strong>حرفه ای</li>
         <li><strong> قیمت: </strong>310000</li>
         <li><strong> پسند ها: </strong> {likeCourse} </li>
          </ul>    

        <div className="div-info">
         <strong>توضیحات:</strong>
         <div> {(course.info)}</div>
        </div>



        <form onSubmit={onSubmitForm}>
         <button className="btn btn-danger2 btn-danger form-control">خرید دوره</button>
        </form>       </div>
      </div>
       



      <div className='single-div3 col-lg-8 col-sm-12'>
       {/* <video width='96%' className='video-single' controls>
              <source src="{`http://localhost:4000/upload/${course.videoUrl}`}" type="video/mp4" />
              </video> */}
       <embed className='embed' id="info-c" src={`http://localhost:4000/upload/${course.videoUrl}`} type="video/mp4" />
       <button onClick={handleLike} className='btn mt-3 p-0 mx-auto border border-dark'>
               <i ref={ref} className='fa fa-heart-o text-danger fa-2x m-1'
        //  className={like ? 'fa fa-heart text-danger fa-2x m-1' : 'fa fa-heart-o text-danger fa-2x m-1'} 
        >
        </i>
        <i className="p-0 fa fa-thumbs-up fa-2x m-1"></i>
       </button>


      </div>


     </div>
    </div>




    <div className='single-div col-12'>
     <div className='single-div2 row'>






      <div className="single-table col-lg-4 col-sm-12 alert-secondary">
      </div>









           <GetPart part={part} />








     </div>
    </div>

    <div className='single-div col-12'>
     <div className='single-div2 row'>

      <div className='col-lg-4 col-sm-12 alert-secondary '>

       <div className="div-4-b">
        <h3 className='col-12'>دوره های مشابه</h3>

        <table>
         <tr>
          <th className=' text-center p-2'>توضیحات</th>
          <th className=' text-center p-2'>قیمت</th>
         </tr>

         <tr>
          <td className='p-2'>آموزش</td>
          <td className='p-2'>350000</td>
         </tr>

         <tr>
          <td className='p-2'>آموزش</td>
          <td className='p-2'>200000</td>
         </tr>
        </table>

       </div>

      </div>



      <div className="div-pors col-lg-8 col-sm-12">

             <Comment message={message} setMessage={setMessage} />
       <br />
       <hr className='bg-light' />




       <div className=" row flex-column"
        style={{
         padding: '2rem 1rem', border:
          '5px solid rgb(119, 2, 27)', background: 'white', width: '99.5%', margin: '0 0 0 auto'
        }}>

          <GetComment message={message} setMessage={setMessage}/>


       </div>
      </div>
     </div>
    </div>
   </div>


{/* 
     <div style={{ height: '100px' }} className='col-12 '>
       {getlike.map((like, index) => (
         <span key={index}
           onMouseMove={() => {
             for (let i = 0; i >= index; i++) {
               document.getElementById('likeIndex').innerHtml = i;
               console.log(i);
             }
           }}>ssssssssssssssssssssssssss
         </span>
       ))}
     </div> */}



  </div>
 )



}

export default withRouter(SingleCourse)

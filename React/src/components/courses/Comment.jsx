import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { commentCourse } from "../../services/courseService";
import ReCAPTCHA from "react-google-recaptcha";





const Comment = ({ message, setMessage, match, recaptcha, onreCaptchaExpire, onreCaptchaChange}) => {



  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
 


  const handleSubmit = async (event) =>{
    event.preventDefault();
  //  if (recaptcha === "" || recaptcha === undefined)
    //  toast.error("لطفا من ربات نیستم را انتخاب نمائید");
   
 try{
   const data1 = { fullname, email, message /*,recaptcha*/ }
   const { data, status } = await commentCourse(match.params.id, data1);
   if (status === 200) {
     setFullname('')
     setEmail('')
     setMessage('')
     toast.success("ساخته شد")
     
   }
  } catch(err){
     toast.error("ارسال نظر موفقیت آمیز نبود.");
        console.log(err); 
    }
}


return(
< >
    
    <form id='comment' onSubmit={handleSubmit} className='bg-form-comment'>
        <fieldset className="mx-auto  ">
          <legend className="text-center">ارسال نظر</legend>
          {/* fullname input*/}
          <div className="form-group">
            <label className=" control-label" htmlFor="name">نام</label>
            <div className>
              <input id="name" value={fullname} onChange={e => setFullname(e.target.value)} type="text" placeholder="نام و نام خانوادگی" className="form-control" />
            </div>
          </div>
          {/* Email input*/}
          <div className="form-group">
            <label className=" control-label" htmlFor="email">آدرس ایمیل</label>
            <div className>
              <input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="ایمیل شما" className="form-control" />
            </div>
          </div>
          {/* message message */}
          <div className="form-group">
            <label className=" control-label" htmlFor="message">پیام شما</label>
            <div>
              <textarea className="form-control" value={message} onChange={e => setMessage(e.target.value)} id="message" name="message" placeholder="لطفاً پیام را در اینجا نوشته و ارسال کنید" rows={5} defaultValue={""}></textarea>
            </div>
          </div>
          {/* Form actions */}
          <div className="form-group mt-4">

          <div>
                <ReCAPTCHA
                    sitekey="6Lcs0Q0aAAAAACw0Kznf2C8aNmrOi0PcrB5rgobS"
                    onChange={onreCaptchaChange}
              onExpired={onreCaptchaExpire} />
            </div>

            <button type="submit" className="btn btn-danger form-control ">
              ارسال پیام
            </button>
          </div>
        </fieldset>
      </form>

</>
)
}


export default withRouter(Comment);

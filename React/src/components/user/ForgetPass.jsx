import React, { useState } from 'react'
import { toast } from 'react-toastify';
import  { forgetpassword } from '../../services/userService'


export const ForgetPass = () => {

  const [email, setEmail] = useState('')

const handle= async ()=>{
  try {
    const ax = forgetpassword(email)
    const {status} = await ax
    if(status === 200){
    toast.success("موفق بود")
    window.open('https://mail.google.com/mail/u/0/#inbox', "_blank","top=000,left=400,width=450,height=450")
  }}
   catch (err) {
    toast.error("نا موفق بود دوباره امتحان کنید")
     console.log(err);
    }
}

  return (
    <div>
    <form onSubmit={handle} className="form-signin p-5 " >
      <h1 className="h3 mb-3 font-weight-normal">فراموشی رمز عبور</h1>
        <label htmlFor="inputEmail" className="">آدرس ایمیل</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control
           mb-2" placeholder="آدرس ایمیل" required autofocus />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
        ریست پسورد
      </button>
    </form>
    </div>
  )
}

export default ForgetPass
import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/userService';




const Register = ({ register, history, location}) => {

  const [fullname, setFullname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [checkBox, setCheckBox] = useState(false)
  const [show, setShow] = useState(true)

  
  

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      if (checkBox){
      const {data} = await registerUser({ fullname, email, password });

      toast.success(data.message);
      window.location.assign('/login')
      // history.replace("/login")
    } else {toast.error("موافقت با قوانین الزامی هست")}
  } catch (err) {
      if (err.message == "Request failed with status code 400") toast.error("ایمیل یا نام کاربری قبلا وارد شده")
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleRegister} ref={register} id="register" className="input-group">
      <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" className="input-field pl-2" placeholder="نام کاربری" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input-field pl-2" placeholder="ایمیل" />
   
   <div style={{position:"relative"}}>
        <label onClick={(e) => { setShow(!show); e.target.className = show ? 'fa fa-eye p-2' : 'p-2 fa fa-eye-slash'; e.type = show ? 'text' : 'password';console.log(e);}
}     style={{position:'absolute', left:".5rem", top:'.65rem'}} htmlFor="password" className='p-2 fa fa-eye-slash'></label>
        <input style={{ width: "280px" }} value={password} onChange={(e) => setPassword(e.target.value)} type="password"
          className="input-field pl-2" placeholder="رمز عبور" name='password' id='password'/>
    </div>
    
      <div className="check-box1" >
        <input value={checkBox} onClick={(e) => setCheckBox(e.target.checked)} id='checkbox' type="checkbox" />
        <label className="check-label" for="checkbox">موافقت با قوانین</label>
        <br />

      </div>

      <button type="submit" className="submit-btn mt-3">ثبت نام</button>
    </form>
  );
}


export default withRouter(Register);
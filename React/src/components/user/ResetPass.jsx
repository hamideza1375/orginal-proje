import React, { useState } from 'react'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { resetpassword } from '../../services/userService';



export const ResetPass = ({ match }) => {

  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const handleReset = async (e) => {
    e.preventDefault()
    try {
      const ax = resetpassword(match.params.id, { password, confirmPassword })
      const { status } = await ax
      if (status === 200) {
        toast.success("تغییر رمز موفق آمیز بود")
      }
    } catch (err) {
      toast.success("مشکلی پیش آمد")
      console.log(err);
    }
  }
  

  return (
    <div>
      <form onSubmit={handleReset} id="loginForm" className="form-signin" >
        <h1 className="h3 mb-3 font-weight-normal">تغییر رمز عبور</h1>
        <label htmlFor="inputPassword" className="sr-only">کلمه عبور</label>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" id="inputPassword" className="form-control mb-2" placeholder="کلمه عبور" required />
        <label htmlFor="inputConfirmPassword" className="sr-only">تکرار کلمه عبور</label>
        <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" name="confirmPassword" id="inputConfirmPassword" className="form-control mb-2" placeholder="تکرار کلمه عبور" required />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          تغییر رمز عبور
        </button>
      </form>
    </div>
  )
}
export default withRouter(ResetPass)
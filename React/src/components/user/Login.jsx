import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import { loginUser } from '../../services/userService';
import { Link } from 'react-router-dom';



const Login = ({ login, history }) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [remember, setRemember] = useState('1h')
    const [captcha, setCaptcha] = useState("");




    const handleLogin = async (e) => {
        e.preventDefault()


        try {
            const { data } = await loginUser({ email, password, captcha, remember });

            localStorage.setItem("token", data.token);

            toast.success('data.message')
            window.location.assign("/")
            // history.push("/");

        } catch (err) {
            toast.error("مشخصات وارد شده اشتباه هست")
        }
    }




    return (
        <form onSubmit={handleLogin} ref={login} id="login" className="input-group">
            <input style={{ marginTop: '-11%' }} value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="input-field pl-2" placeholder="نام کاربری" />
            <input style={{ marginTop: '-0%' }} value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input-field pl-2" placeholder="رمز عبور" />

            <div className="div-captcha-login text-center alert-info">
                <img className="img-captcha mt-2" src="http://localhost:4000/captcha.png" alt="captcha" />
                <input className=" form-control border-top-0 border-left-0 border-right-0" type="text" onChange={e => setCaptcha(e.target.value)} value={captcha} placeholder="کد امنیتی" />
            </div>

            <div className="mt-3">
                <input  id='chck' type="checkbox" onClick={() => setRemember('150h')} />
                <label for='chck' className="ml-2 text-secondary"> مرا بخاطر بسپار</label>
            </div>

            <Link style={{marginLeft:'11rem'}} className=" btn-block" to='/forgetpass'>فراموشی رمز عبور</Link>
            <button type="submit" className="submit-btn mt-3">ورود</button>
        </form>
    );
}



export default withRouter(Login);
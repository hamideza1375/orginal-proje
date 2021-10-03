import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import Login from './Login'
import Register from './Register'
import jwt from 'jsonwebtoken'




const UserLayout = ({ location, history }) => {

    const account_btn = useRef();
    const login = useRef();
    const register = useRef();

    useEffect(() => {

        if (location.pathname === "/register") {
            account_btn.current.style.left = "110px";
            register.current.style.left = "50px";
            login.current.style.left = "-400px";
        }
        else {
            account_btn.current.style.left = "0px";
            register.current.style.left = "450px";
            login.current.style.left = "50px";
        }
    }, [])

    const sum1 = () => {
        account_btn.current.style.left = "110px";
        register.current.style.left = "50px";
        login.current.style.left = "-400px";
    }

    const sum2 = () => {
        account_btn.current.style.left = "0px";
        register.current.style.left = "450px";
        login.current.style.left = "50px";
    }


     const getUser = () => {
        const token = localStorage.getItem("token");
        const user = jwt.decode(token, { complete: true })
        if (user) { return history.push("/") }
    }

    getUser()

    return (
        <div className='main0'>

                <ul className="nav nav1 m-0 border-0 ">
                    <Link to='/' className="btn btn-outline-light border-danger btn-block fa-2x">خانه</Link>
                </ul>

                <Helmet>
                    <title>ورود و ثبت نام</title>
                </Helmet>

            <div className='main1'>


                <div className="main-box">
                    <div className="form-box">

                        <div className="form-box22"></div>


                        <div className="button-box">
                            <div ref={account_btn} id="account-btn" />
                            <Link to="/register" id='toggle-btn1' onClick={sum1} className="toggle-btn text-dark">ثبت نام</Link>
                            <Link to="/login" id='toggle-btn2' onClick={sum2} className="toggle-btn text-dark">ورود</Link>
                        </div>
                        <div className="social-icons">
                            <i className="fa fa-facebook" />
                            <i className="fa fa-instagram" />
                            <i className="fa fa-youtube" />
                        </div>

                        <Register register={register} />
                        <Login login={login} />
                    </div>
                </div>

                </div>

        </div>
    )
}


export default withRouter(UserLayout)
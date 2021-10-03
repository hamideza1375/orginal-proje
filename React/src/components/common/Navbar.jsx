import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

    const token = localStorage.getItem("token");


    return (
        <div className='header-div2'>
            <div className='header-row2 row'>

                {(!token) ?
                    <ul id='navbar' className="nav nav2 justify-content-end">
                        <form className="form-search form-search2 form-search3 row" >
                            <input className='col-8 form-control border-danger' type="text" placeholder='دنبال چه دوره ای هستی' />
                            <button className='label-search fa fa-search border-danger'></button>
                        </form>

                        <li className="nav-item mr-2">
                            <Link to='/' className="btn btn-outline-light border-danger">خانه</Link>
                        </li>
                        <li className="nav-item mr-2 ">
                            <Link to='/login' className="btn btn-outline-light border-danger">ورود</Link>
                        </li>
                        <li className="nav-item mr-4">
                            <Link to='/register' className="btn btn-outline-light border-danger">ثبت نام</Link>
                        </li>
                    </ul>


                    :

                    <ul className="nav nav1 ">
                        <li className="nav-item ml-2" >
                            <Link to='/' className="btn btn-outline-light border-danger">خانه</Link>
                        </li>
                        <li className="nav-item ml-2">
                            <Link to='/profile' className="btn btn-outline-light border-danger">پروفایل</Link>
                        </li>
                        <li className="nav-item ml-2">
                            <Link to='/course' className="btn btn-outline-light border-danger">دوره منتخب</Link>
                        </li>
                        <li className="nav-item ml-2">
                            <Link to='/dashboard' className="btn btn-outline-light border-danger">داشبورد</Link>
                        </li>

                        <form className="form-search form-search3 row" >
                            <input className='col-8 form-control border-danger' type="text" placeholder='دنبال چه دوره ای هستی' />
                            <button className='label-search fa fa-search border-danger'></button>
                        </form>
                    </ul>
                }

                <div className='head'></div>
                <div className='head2'></div>
                <div className='head33'></div>
                <div className='head4 '></div>
                <div className='circle1 '></div>
                <div className='circle2 '></div>
                <div className='circle3 '></div>
            </div>
        </div>
    )
}

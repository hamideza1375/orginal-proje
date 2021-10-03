import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const Header = ({ setSearch}) => {


    const mySidenav = useRef()


 const openDrop =()=>{ mySidenav.current.style.width = "250px"; }

 const closeDrop =()=>{ mySidenav.current.style.width = "0"; }




    useEffect(() => {
        return () => { setSearch('') }
    }, [])




    const token = localStorage.getItem("token");


    return (

        <div className='div-vw'>
            <header className='row row-header'>


        {(token) ?

                    <ul id='navbarHeader' className="nav-f nav1 ">
                     <li className="nav-item ml-3">
                         <Link to='/' className="nav-link btn btn-outline-light mr-2 border-danger" >خانه</Link>
                     </li>
                     <li className="nav-item">
                         <Link to='/profile' className="nav-link btn btn-outline-light mr-2 border-danger" >پروفایل</Link>
                     </li>
                     <li className="nav-item">
                         <Link to='/dashboard' className="nav-link btn btn-outline-light border-danger" >داشبورد</Link>
                     </li>


   



                        


                     <form className="form-search row" >
                         <input onChange={(e) => { setSearch(e.target.value) }} id="in-serch" className='col-8 form-control border-danger' type="text" placeholder='دنبال چه دوره ای هستی' />
                            <button onClick={(e) => { e.preventDefault();window.scroll(0, 400)} } className='label-search fa fa-search border-danger'></button>
                     </form>

            <span className="drapdown11">
                <Link type='button' onClick={openDrop} className='nav-link btn btn-outline-light   mt-1'> ☰ </Link>
            </span>

                 </ul> 
:
                
            <ul className="nav nav2 ">
                    <form className="form-search form-search2 row " >
                        <input className='col-8 form-control border-danger' type="text" placeholder='دنبال چه دوره ای هستی' />
                        <button className='label-search fa fa-search border-danger'></button>
                        </form>

                    <li className="nav-item mr-2">
                    <Link to='/login' className="nav-link btn btn-outline-light border-danger">ورود</Link>
                </li>
                        <li className="nav-item mr-2">
                        <Link style={{width:'200px'}} to='/register' className="nav-link btn btn-outline-light border-danger">ثبت نام</Link>
                </li>

                    <li className="nav-item mr-4">
                        <Link to='/' className=" nav-link btn btn-outline-light border-danger">خانه</Link>
                    </li>
            </ul>
            }

                <div className='head'></div>
                <div className='head2'></div>
                <div className='head3'></div>
                <div className='head4 '></div>
                <div className='circle1 '></div>
                <div className='circle2 '></div>
                <div className='circle3 '></div>
            </header>






            <div>
                <div ref={mySidenav} className="sidenav">
                    <Link to='' onClick={closeDrop} className="closebtn"> × </Link>
                    <Link className='text-canvase' to="/profile">پروفایل</Link>
                    <Link className='text-canvase' to="/dashboard">داشبورد</Link>
                    <Link className='text-canvase' to="/dashboard">دوره های شما</Link>
                    <Link className='text-canvase' to="#">تخفیف ها</Link>
                    <Link className='text-canvase' to="chat1">چت برنامه نویسان</Link>
                    <Link className='text-canvase' to="/logout">خروج</Link>
                </div>
 
            </div>



        </div>
    )
}

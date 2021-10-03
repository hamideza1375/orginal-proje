import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Navbar } from "../common/Navbar";



const UserProfile = ({ history }) => {


  const [userFullname, setUserFullname] = useState("")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return history.push('/')

    const user = jwt.decode(token, { complete: true });
    setUserFullname(user.payload.fullname)
    setUserEmail(user.payload.email)
  }, []);



  return (
    <div id='profile'>

      <ul style={{ borderRadius: '6px', height: '44px' }} className="border border-danger nav pt-1 nav2 col-12 fixed-top pr-1 pl-1">
          <Link style={{border:'hidden', padding:'0 0 1.6rem'}} to='/' className=" mt-1 mt-1 btn btn-outline-light form-control">خانه</Link>
      </ul>

      <div className='profile-row row '>


        <Card className='card-col4 col-md-4 col-sm-12 card-profile' >
          <Card.Body className='card-body1 '>
            <Card.Title style={{ paddingTop: '10vh' }} className=' text-justify ' ><strong>نام :</strong> {userFullname} </Card.Title>
            <Card.Text className=' text-justify '><strong>ایمیل: </strong> {userEmail} </Card.Text>
            <Card.Text className=' text-justify '><strong>تاریخ عضویت :</strong> 2/7/1400 </Card.Text>
          </Card.Body>
        </Card>


        <Card className='card-col8 col-md-8 col-sm-12 card-profile' >
          <Card.Body className='card-body2'>
            <Card.Img className='mx-auto mt-2 card-img-profile' style={{ width: '11vw', height: '9rem', borderRadius: '50%', paddingTop: '5%', marginBottom: '3%' }} src="image/avatar.jpg" />
            <Card.Title ><strong>نام :</strong> {userFullname} </Card.Title>
            <Card.Text ><strong>ایمیل :</strong> {userEmail} </Card.Text>
            <Card.Text><strong>تاریخ عضویت :</strong> 2/7/1400 </Card.Text>
          </Card.Body>
        </Card>


      </div>
    </div>
  );
};

export default withRouter(UserProfile);

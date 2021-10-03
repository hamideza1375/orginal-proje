import React, { useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import jwt from 'jsonwebtoken'



function Dashboard({ history }) {

  const [admin, setAdmin] = useState(false)

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) return history.push('/')
    const users = jwt.decode(token, { complete: true });
    setAdmin(users.payload.isAdmin)
    console.log(users.payload.isAdmin);
  }, [])



  return (
    <div id='dashboard' style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>

      <Card style={{ height: '100vh' }}>

        <Card.Header className='p-0'>

          <ul className="nav nav1 ">
            <li className="nav-item ml-3">
              <Link to='/' className="nav-link btn btn-outline-light mr-2 border-danger" >خانه</Link>
            </li>
            <li className="nav-item ml-3">
              <Link to='/course' className="nav-link btn btn-outline-light mr-2 border-danger" > دوره منتخب</Link>
            </li>
            <li className="nav-item ml-3">
              <Link to='/profile' className="nav-link btn btn-outline-light mr-2 border-danger" >پروفایل</Link>
            </li>

          </ul>



        </Card.Header>

        <Card.Body className='row'>

          {(admin) ?
            <Card.Body className=' border'>
              <Link to='/admin' style={{ height: '2.8rem', paddingTop: '.5rem' }}
                className=" btn btn-dark text-center form-control" >پنل ادمین
              </Link>
            </Card.Body>

            : 

          <Card.Body className=' border '>
            <Card.Text className=''>دوره های خریداری شده</Card.Text>
            <ListGroup style={{ textAlign: 'right', fontSize: '14px' }}>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Card.Body>
}

        </Card.Body>

        <Card.Footer>
          <Link to='/logout' className='form-control btn-dark'>خروج از حساب کاربری</Link>
        </Card.Footer>

      </Card>

    </div>
  )
}

export default withRouter(Dashboard)

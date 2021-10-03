import React, { useEffect, useRef, useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';



const Chat = ({ location }) => {


  // State
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [userI, setUserI] = useState([])
  const [pvMessage, setPvMessage] = useState()
  const [modalTitle, setModalTitle] = useState("")
  const [pvChatMessage, setPvChatMessage] = useState("")
  const [to1, setto1] = useState('')
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);





  // Ref
  const scrollableGrid = useRef();
  const pvChatMessage2 = useRef();
  const qw = useRef();
  const pType = useRef();
  const infoc = useRef();
  const pPv = useRef();


  // SocketClient
  const socket = useRef(SocketIOClient.connect("http://localhost:4000"));





  window.onmousemove = () => { if (infoc.current) { infoc.current.focus() } }







  useEffect(() => {

    socket.current.on("online", (users) => {
      if (users.filter((user) => (user.roomNumber === location.state.roomNumber))) {
        let UserI2 = users.filter((user) => (user.roomNumber === location.state.roomNumber))
        setUserI(UserI2)
      }
      console.log('online')
    });

    return () => {
      socket.current.emit("delRemove", socket.current.id)
    
      socket.current.on("delRemove", (users)=>{
        setUserI(users)
      })
    }
  }, [])






  useEffect(() => {

    socket.current.on("mongoMsg", (msgModel) => {
      setMessages(msgModel);
    })




    socket.current.on("pvChat", (data, iid, users) => {
      if (socket.current.id == data.to) {
        if (infoc.current) {
          infoc.current.focus()
        }

        setShow(true)
        if (pPv.current) pPv.current.style.display = 'block';
        setModalTitle("دریافت از طرف : " + data.name)

        let UserI = users.find((user) => (user.nickname == data.name))
        setto1(UserI.id)
        setPvChatMessage(data.pvMessage)
      }
      if (socket.current.id == iid) setShow(false)
      setPvMessage('')
    });







    socket.current.on("chat message", (message) => {

      setMessages((messages) => messages.concat(message));

      if (scrollableGrid.current)
        scrollableGrid.current.scrollTop = (scrollableGrid.current.scrollHeight);// clientHeight

      if (pType.current && message.sender.name !== location.state.name) {
        pType.current.innerHTML = ""
        pType.current.className = ''
      }
    })



    socket.current.on("deleteOne", (id) => {
      setMessages(messages => messages.filter((message) => message.id !== id));
    })



    socket.current.on("deleteMsg", (id) => {
      setMessages(messages => messages.filter((message) => message.id !== id));
    })


    socket.current.on("typing", (data) => {
      if (pType.current && data.etar !== "") {
        pType.current.innerHTML = data.name + " درحال تایپ "
        pType.current.className = 'alert alert-secondary w-75'
      }
      if (data.etar === "" && pType.current) { pType.current.innerHTML = ""; pType.current.className = '' }
    });


    socket.current.emit("online", { name: location.state.name, nickname: location.state.name, gender: location.state.gender, roomNumber: location.state.roomNumber });


  }, []);





  // Socket Emit

  const handlePvChat = () => {
    socket.current.emit("pvChat", {
      pvMessage,
      name: location.state.name,
      to: to1,
      gender: location.state.gender
    });
  };



  const sendMessage = () => {
    if (!newMessage)
      return;
    socket.current.emit("chat message", {
      msgNm: '', id: Math.random() * 111, roomNumber: location.state.roomNumber, msg: newMessage,
      sender: { name: location.state.name, gender: location.state.gender }, createdAt: new Date()
    });
    setNewMessage("");
    // pType.current.innerHTML = ""
  }



  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  };


  const oneDeleteClick = (id) => {
    socket.current.emit("deleteOne", id);
  };

  const msgDeleteClick = (id) => {
    socket.current.emit("deleteMsg", id);
  };






  const handleKeypress = (e) => {
    socket.current.emit("typing", {
      name: location.state.name, roomNumber: location.state.roomNumber, eKey: e.key, etar: e.target.value, newMessage
    });
  };










  return (
    <div class='overflow-di'>
      <div className=' mx-auto pt-3 border-shadow' style={{ paddingBottom: '5.5rem', height: '100vh', width: '75%', overflowY: 'scroll' }} ref={scrollableGrid} >


        <div className=' mx-auto pt-3 border-shadow2'
          style={{ overflow: 'hidden', paddingBottom: '5.5rem', height: '100vh', width: '73%' }} ></div>

        <div className='fixed-top w-75 mx-auto bg-secondary ' style={{ listStyle: 'none', height: '51px', width: "100%", display: 'inline-flex' }}>
          <div className='fixed-top w-25 mx-auto alert-light' style={{ marginTop: '2px', listStyle: 'none', height: '47px', width: "100%", display: 'inline-flex' }}>


            <Button className='mx-auto form-control mt-1' variant="dark" onClick={() => setShow2(true)}>

              online : {userI.length}

            </Button>
          </div>
        </div>

        <br />
        <p className='w-75 mx-auto'
          style={{ position: 'fixed', right: '0', left: '0', top: '3rem', zIndex: '1020', margin:'5px auto',padding:'1px 0' }}
           ref={pType}></p>
        <br />
        <br />
        <Link style={{position:'relative',zIndex:'5'}} className='mt-5 border border-danger' to='/chat1'>link22</Link>



        {messages.map((message) => (
          <>
            {message.roomNumber == location.state.roomNumber &&
              <div style={{ width: '100%' }} className={message.sender.name === location.state.name ? 'car11 pr-5 row' : 'row car22 pl-5'} key={message.id}>
              <div style={{ maxWidth: '80px', minWidth:'70px' }} className=" col-1 ">
                <img title={message.sender.name === location.state.name ? 'shoma' : message.sender.name}
                  className=" div-iimg" alt={message.sender.name}
                
                  src={message.sender.gender == 0 ? "/image/male_user.png" : "/image/famale_user.png"} />
                  </div>
                <div
                  //  style={message.sender.name === location.state.name ? { width: '280px' } : { width: '680px' }}
                className={`col-8 div-bad-img ${message.sender.name === location.state.name ? ' alert-secondary' : ' alert-info'} `}>
                <div className='m-0 p-1' style={{ alignItems: 'center' }}>
                    <small style={{fontSize:'6px'}} className='text-info badge m-0 p-0'>
                      {message.createdAt.split("T")[1].split(".")[0]}
                    </small>
                    <small className='badge'>
                      {message.sender.name === location.state.name ? 'shoma' : message.sender.name}
                    </small>
                  <Dropdown className='div-del m-0 p-1'>
                      <Dropdown.Toggle className='fa fa-trash p-0 btn-light border-0 alert-secondary' id="dropdown-basic"></Dropdown.Toggle>
                      {message.sender.name === location.state.name ?
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => oneDeleteClick(message.id)}>فقط برای شما</Dropdown.Item>
                          <Dropdown.Item onClick={() => msgDeleteClick(message.id)}> {message.id} برای همه</Dropdown.Item>
                        </Dropdown.Menu>
                        :
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => oneDeleteClick(message.id)}> {message.id} فقط برای شما</Dropdown.Item>
                        </Dropdown.Menu>
                      }
                    </Dropdown>
                  </div>
                  <p style={{ minHeight: '35', height: 'auto', textAlign: 'justify' }}
                    className="alert alert-light m-0 p-1">
                    {message.msg}
                  </p>
                </div>
                <div>
                </div>
              </div>
            }</>))}









        <Modal size="xl" show={show2} onHide={() => setShow2(false)}>
          <Modal.Header closeButton>
            <Modal.Title ><small> ارسال پیام محرمانه به :</small> </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {userI.map((user, index) => (
              <div className=' mt-3'
                style={{ listStyle: 'none', background: 'silver', height: '81px' }}>
                {user.roomNumber === location.state.roomNumber &&
                  <li id={user.id} onClick={() => {
                    setto1(user.id); setModalTitle("ارسال پیام به :" + user.nickname); setShow(true); setPvChatMessage('');
                  }}
                    key={user.id} className='btn btn-dark d-block' style={{ cursor: 'pointer', textAlign: "center", paddingTop: '8px', width: '105px', height: '80px', margin: '2px 3px 0' }}>
                    <img width='100%' height='50px' src={user.gender == 0 ? "/image/male_user.png" : "/image/famale_user.png"} />
                    <fieldset className='badge' style={{ marginTop: '3px' }}> {user.nickname} </fieldset>
                  </li>
                }
              </div>
            ))}
          </Modal.Body>
        </Modal>









        <Modal ref={pvChatMessage2} show={show} >
          <Modal.Header closeButton onHide={() => { setShow(false); setPvChatMessage(''); }}>
            <small className='badge' ref={qw}>
              {modalTitle}
            </small>
          </Modal.Header>
          <Modal.Header>
            <p ref={pPv} style={{ display: 'none' }} className='w-100 p-2 alert-info'>{pvChatMessage} </p>
          </Modal.Header>
          <form onSubmit={(e) => { e.preventDefault(); handlePvChat() }}>
            <Modal.Body>
              <input ref={infoc} type='text' value={pvMessage} onChange={(e) => setPvMessage(e.target.value)}
                className="form-control " placeholder="ارسال پیام" />
            </Modal.Body>
            <Modal.Footer>
              <Button type='submit' variant="primary"> ارسال </Button>
            </Modal.Footer>
          </form>
        </Modal>




        <div style={{ borderRadius: '5px', width: '75%', bottom: '-25px' }} className='alert bg-info pt-2 justify-content-center fixed-bottom  mx-auto '>
          <div className=' alert-info mt-3'>
            <input type="text" value={newMessage} placeholder="ارسال پیام" className='alert alert-light form-control'
              onChange={(e) => { setNewMessage(e.target.value); handleKeypress(e) }} onKeyDown={handleKeyDown} />
            <i style={{ borderRadius: '5px', position: 'absolute', left: '1.5rem', top: '1.3rem' }}
              className='p-2 fa fa-arrow-left fa-2x ' onClick={sendMessage} ></i>
          </div>
        </div>
      </div>




    </div>
  )
}
export default withRouter(Chat)
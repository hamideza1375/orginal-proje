import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';


const Login = (props) => {

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [roomNumber, setRoomNumber] = useState("");





    const submit = (e) => {
        e.preventDefault();
        if (name && gender) {
            props.history.replace({
                pathname: "chat2",
                state: {
                    name,
                    gender,
                    roomNumber,
                }
            });
        } else {
            alert('مقدار خالی هست')
        }
    }




    return (
        <Card className='w-75 mx-auto pt-3 mt-5 text-center alert-dark w-75'
            style={{ borderRadius: '7px', boxShadow: '1px 1px 20px 1px rgba(0,0,0,.7)' }}>
            <div >
                <Button style={{ minWidth: '150px' }} variant='outline-success'
                    className='alert mb-2 badge border border-success '> چت روم یونیک </Button>
            </div>
            <div>
                <div >
                    <input value={name} placeholder='نام' className='form-control w-50 mx-auto mt-4' type='text' id="outlined-basic"
                        onChange={e => setName(e.target.value)} />
                </div>
            </div>



            <div className='row p-5 pt-0 w-75 mx-auto'>
                <div className='col-5 mx-auto pl-2 mx-auto '>
                    <label className='badge'>جنسیت</label>
                    <select value={gender} id="demo-simple-select-outlined" className=' form-control mt-2 mb-2'
                        onChange={e => setGender(e.target.value)}>
                        <option value='-1'>None</option>
                        <option value='0'>آقا</option>
                        <option value='1'>خانم</option>
                    </select>
                </div>

                <div className='col-5 pr-2 mx-auto '>
                    <label className='badge'>اتاق ها</label>
                    <select name="chatrooms" id="chatrooms" className=' form-control mt-2 mb-2' onChange={e => setRoomNumber(e.target.value)}>
                        <optgroup>
                            <option value="room1">چت روم شماره 1</option>
                            <option value="room2">چت روم شماره 2</option>
                            <option value="room3">چت روم شماره 3</option>
                        </optgroup>
                    </select>
                </div>
            </div>



            <div item container justify={"center"}>
                <Button variant="primary" className='form-control w-75 mt-2 mb-5' onClick={submit}> ورود به چت روم </Button>
            </div>
        </Card>
    );
};

export default withRouter(Login);
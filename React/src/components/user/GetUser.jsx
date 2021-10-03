import React from 'react'
import jwt from "jsonwebtoken";



export const GetUser = ({ history, withRouter }) => {
    const token = localStorage.getItem("token");
    const user = jwt.decode(token, { complete: true })
    if (user) { return history.push("/") }
    return (
    <div>
f
    </div>)
}

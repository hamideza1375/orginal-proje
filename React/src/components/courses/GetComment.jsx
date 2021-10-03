import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { getComment } from "../../services/courseService";


const GetComment = ({ message, setMessage, match }) => {

   const [comment, setComment] = useState([])



   useEffect(() => {
      getComment(match.params.id)
         .then(({ data }) => { 
            let dds=''
            const sisi = data.comment.map((l) => ( l))
   // setComment(dds);
   setComment(sisi);
         })
   }, [message])

   

   return (
      <div id='getComment'>
         {comment.map(c => (
            <div key={c._id} className='col-12 div-col-card mt-5 p-0'>
               <div className="card-header div-card-pors row mx-auto">
                  <ul className=" list-group-item ul-pors-li">

                        <img className='img-li-img' style={{ borderRadius: '50%' }} src="/image/avatar.jpg" width='90px' />
                 
                        <li className="mb-1 display-4 list-group-item li-pors li-pors1">{c.fullname}</li>
                        <li className=" list-group-item li-pors li-pors2 ">{c.message}</li>
                  </ul>
               </div>
            </div>
         ))}

      </div>

   )
}


export default withRouter(GetComment);
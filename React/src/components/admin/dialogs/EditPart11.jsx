import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { editPartCourse, getSinglePartCourse } from "../../../services/courseService";



const EditPart11 = ({match }) => {


    const [partTitle, setPartTitle] = useState('');
    const [partPrice, setPartPrice] = useState();
    const [partVideoUrl, setPartVideoUrl] = useState('');
    const [partInfo, setPartInfo] = useState('');


 useEffect(() => {

     getSinglePartCourse(match.params.id)
    .then(({data}) => {
     setPartTitle(data.part.partTitle);
     setPartPrice(data.part.partPrice);
     setPartVideoUrl(data.part.partVideoUrl);
     setPartInfo(data.part.partInfo);
    })

 }, [])



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let data = new FormData();
            data.append("partTitle", partTitle);
            data.append("partPrice", Number.parseInt(partPrice));
            if (event.target.partVideoUrl.files[0]) data.append("partVideoUrl", event.target.partVideoUrl.files[0]);
            data.append("partVideoUrl", partVideoUrl)
            data.append("partInfo", partInfo);

            await editPartCourse(match.params.id, data);
            toast.success("ساخته شد")
        }
        catch (ex) {
            toast.error("ساخته نشد")
            console.log(ex);
        }
    };


 return (
  <>
         <div id='editPart' style={{ padding: '.4rem 2rem' }} className="inner form-layer">
             <form style={{ border: '1px solid silver', borderRadius: '1.4%/1.4%', padding: '3rem', background: 'silver' }}
                 onSubmit={handleSubmit}>
                 <input type="text" name="partTitle" className="form-control" placeholder="عنوان دوره"
      aria-describedby="partTitle" value={partTitle} onChange={(e) => setPartTitle(e.target.value)} />
                 <br />
                 <input type="text" className="form-control" placeholder="قیمت دوره به تومان"
                     name="partPrice" aria-describedby="partPrice" value={partPrice} onChange={(e) => setPartPrice(e.target.value)} />
                 <br />
                 <input type="file" id='partVideoUrl' name="partVideoUrl" className="form-control mb-2" aria-describedby="partVideoUrl" />
                 <br />
                 <textarea name="PartInfo" placeholder="توضیحات دوره" className="form-control"
                     value={partInfo} onChange={(e) => setPartInfo(e.target.value)} />
                 <br />
                 <button type="submit" className="btn btn-success" > ثبت دوره </button>
                 <br />
                 <br />
             </form>
         </div>
  </>
 )
}

export default withRouter(EditPart11)

import React, { useState } from "react";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { partCourse } from "../../../services/courseService";



const NewPart = ({ match, partTitle, setPartTitle, partPrice, setPartPrice, partInfo, setPartInfo}) => {



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data1 = new FormData();
      data1.append("partTitle", partTitle);
      data1.append("partPrice", Number.parseInt(partPrice));
      data1.append("partVideoUrl", event.target.partVideoUrl.files[0]);
      data1.append("partInfo", partInfo);

     const {data, status} = await partCourse(match.params.id, data1);
     if(status === 200){

       toast.success("ساخته شد")
    }
  }
    catch (ex) {
      toast.error("ساخته نشد")
      console.log(ex);
    }
  };



  return (
    <>
      <div id='newPart' style={{ padding: '.4rem 2rem' }} className="inner form-layer">
        <form style={{ border: '1px solid silver', borderRadius: '1.4%/1.4%', padding: '3rem', background: 'silver' }}
          onSubmit={handleSubmit}>
          <input type="text" name="partTitle" className="form-control" placeholder="عنوان دوره"
            aria-describedby="partTitle" value={partTitle} onChange={(e) => setPartTitle(e.target.value)} />
          <br />
          <input type="text" className="form-control" placeholder="قیمت دوره به تومان"
            name="partPrice" aria-describedby="partPrice" value={partPrice} onChange={(e) => setPartPrice(e.target.value)} />
          <br />
          <input type="file" name="partVideoUrl" className="form-control mb-2" aria-describedby="partVideoUrl" />
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
  );
};

export default withRouter(NewPart);

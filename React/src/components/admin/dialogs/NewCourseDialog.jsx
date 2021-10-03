import React, { useState } from "react";
import { createCourse } from "../../../services/courseService";
import { toast } from "react-toastify";



const NewCourseDialog = ({ title, setTitle, price, setPrice, info, setInfo}) => {



  const handleSubmit =async (event) => {
    event.preventDefault();
    try {
      let data1 = new FormData();
      data1.append("title", title);
      data1.append("price", Number.parseInt(price));
      data1.append("imageUrl", event.target.imageUrl.files[0]);
      data1.append("videoUrl", event.target.videoUrl.files[0]);
      data1.append("info", info);

     const {data,status} = await createCourse(data1);
     if (status === 200) { 
      toast.success("you wine");
    }
    }
    catch (ex) { 
      toast.error("ویرایش نشد")
      console.log(ex); }
  };

  return (
    <>
      <div id='newCourse' style={{ padding: '.4rem 2rem' }} className="inner form-layer">
        <form style={{ border: '1px solid silver', borderRadius: '1.4%/1.4%', padding: '3rem', background: 'silver' }}
          onSubmit={handleSubmit}>
          <input type="text" name="title" className="form-control" placeholder="عنوان دوره"
            aria-describedby="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <br />
          <input type="text" className="form-control" placeholder="قیمت دوره به تومان"
            name="price" aria-describedby="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <br />
          <input type="file" name="imageUrl" className="form-control mb-2" aria-describedby="imageUrl" />
          <br />
          <input type="file" name="videoUrl" className="form-control mb-2" aria-describedby="videoUrl" />
          <br />
          <textarea name="info" placeholder="توضیحات دوره" className="form-control"
            value={info} onChange={(e) => setInfo(e.target.value)} />
          <br />
          <button type="submit" className="btn btn-success" > ثبت دوره </button>
          <br />
          <br />
        </form>
      </div>
    </>
  );
};

export default NewCourseDialog;

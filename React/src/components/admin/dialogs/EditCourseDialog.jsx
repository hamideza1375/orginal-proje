import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { editCourse, getCourse } from "../../../services/courseService";




const EditCourseDialog = ({ match, courses, setCourses }) => {

    const [courseId, setCourseId] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [videoUrl, setVideoUrl] = useState();
    const [info, setInfo] = useState();



    useEffect(() => {
        getCourse(match.params.id)
         .then((c)=>{
         setCourseId(c._id);
         setTitle(c.title);
         setPrice(c.price);
         setImageUrl(c.imageUrl);
         setVideoUrl(c.videoUrl);
        setInfo(c.info);
         })
    }, [])
     
     
    



    const handleEdit = async (event) => {
        try {
            event.preventDefault();
            let formData = new FormData();
            formData.append("title", title);
            formData.append("price", price);
            if (event.target.imageUrl.files[0]) formData.append("imageUrl", event.target.imageUrl.files[0]);
            if (event.target.videoUrl.files[0]) formData.append("videoUrl", event.target.videoUrl.files[0]);
            formData.append("info", info);

            const { data, status } = await editCourse(match.params.id, formData)
            {
            if (status === 200) {
            // const filterecC = [...courses]
            // const filteredCourses = filterecC.filter((course) => course._id !== data.course._id );
            // setCourses([data.course,...filteredCourses])
            toast.success("موفقیت ویرایش شد")
        }
        }
    }
        catch (err) {
            toast.error(" ویرایش نشد")
            console.log(err);
        }


    };

    return (
        <>
            <div id='editCourse' style={{ padding: '7rem 14rem' }} className="inner form-layer">
                <form style={{ background: 'silver', padding: '4rem' }} onSubmit={handleEdit}>
                    <input type="text" name="title" className="form-control" placeholder="عنوان دوره"
                        aria-describedby="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <br />
                    <input
                        type="text" name="price" className="form-control" placeholder="قیمت دوره به تومان"
                        aria-describedby="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <br />
                    <input type="file" name="imageUrl" className="form-control mb-2" aria-describedby="imageUrl" />
                    <br />
                    <input type="file" name="videoUrl" className="form-control mb-2" aria-describedby="videoUrl" />
                    <br />
                    <textarea
                        name="info" placeholder="توضیحات دوره" className="form-control"
                        value={info} onChange={(e) => setInfo(e.target.value)} />
                    <br />
                    <button type="submit" className="btn btn-success " > ویرایش دوره </button>
                    <br />
                    <br />

                </form>
            </div>
        </>
    );
};

export default withRouter(EditCourseDialog);

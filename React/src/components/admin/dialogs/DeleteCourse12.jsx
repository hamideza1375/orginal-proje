import React from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteCourse } from "../../../services/courseService";



const DeleteCourse12 = ({ cId, setCourses, courses, show,handleClose, currentCourse }) => {

  const handleDel = async () => {
            try {
              const { data, status } = await deleteCourse(cId)
              if (status === 200) {
                const courses1 = [...courses];
                const filteredCourses = courses1.filter((course) => course._id !== data.course._id)
                setCourses([...filteredCourses])
                toast.success("حذف شد")
              } handleClose()
            }
            catch (err) {
              toast.error(' موفقیت حذف نشد');
              console.log(err)
              handleClose()
            }}



  return (
      <Modal id='delModal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> از حذف {currentCourse} مطمئن هستین </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>انصراف</Button>
        <Button onClick={handleDel} variant="danger" > حذف </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default DeleteCourse12;

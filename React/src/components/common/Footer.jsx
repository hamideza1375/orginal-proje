import React from "react";
import myLogo from "../../containers/wave.svg";

export const Footer = () => {
  return (
    <div id='footer' className='div-foot'>
      <footer >

        <img className='img-el' src="image/11.jpg" alt="" />
        <img className='img-el2' src="image/markaz.jpg" alt="" />
        <h2 className="col-12">برنامه نویسی</h2>
        <h2 className="col-12 hh2">برنامه نویسی</h2>


       <div className=" div-i-footer mt-5">
          <i className="i-footer fa fa-toggle-left fa-2x text-info"></i>
          <i className="i-footer fa fa-instagram fa-2x text-danger"></i>
          <i st className="i-footer fa fa-facebook-square fa-2x text-light"></i>
        </div>



<div className='flex-foot'>
        <div className=" div-col">
          <h3 className="">آموزشگاه برنامه نویسی</h3>
          <h5 className=''>آموزش برنامه نویسی</h5>
          <h5 className=''>آموزش برنامه نویسی</h5>
          <h5 className=''>آموزش برنامه نویسی</h5>
        </div>

        <div className=" div-col">
          <h3 className="">آموزشگاه برنامه نویسی</h3>
          <h5 className=''>آموزش برنامه نویسی</h5>
          <h5 className=''>آموزش برنامه نویسی</h5>
          <h5 className=''>آموزش برنامه نویسی</h5>
        </div>

        <img id='logo-foot' src={myLogo} alt="" />
</div>


      </footer>
     </div>
  );
}

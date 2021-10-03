import React from 'react'
import { Link } from 'react-router-dom';
import JsFileDownloader from 'js-file-downloader';




 const GetPart=({part})=> {
    return <div className="col-lg-8 col-sm-12 div-comment-col ">
        {part.map((part, index) => (
            <div key={part._id} className="div-comment">
                <ul className="ul-comment-single">
                    <Link to={`/editpart11/${part._id}`} title="ویرایش" className='fa fa-edit textdark-sin'></Link>
                    {/*  */}
                    <Link Link title="دانلود"
                        className='fa fa-download textdark-sin'
                        onClick={() => {
                            new JsFileDownloader({ url: `http://localhost:4000/upload/${part.partVideoUrl}` })
                                .catch(function (error) { console.log(error); });
                        }}
                    ></Link>
                    {/*  */}
                    <p className='p-comment badge'> {index + 1} </p>
                    <div
                        className='li1-comment d-block'>
                        <Link onClick={(e) => {
                            document.getElementById('info-c').src = `http://localhost:4000/upload/${part.partVideoUrl}`;
                            window.scroll(0, 205);
                            return false;
                        }}>{part.partTitle}</Link>
                        <br />
                    </div>
                    <li style={{ maxWidth: '100%' }}
                        onMouseOver={(e) => {
                            e.target.innerHTML = part.partInfo;
                        }}
                        onMouseOut={(e) => {
                            e.target.innerHTML = 'توضیحات...';
                        }}
                        className='li2-comment'> توضیحات... </li>
                </ul>
            </div>
        ))}
    </div>;
}


export default GetPart;
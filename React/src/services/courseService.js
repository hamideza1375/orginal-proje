import http from "./httpService";


export const createCourse = async(data) => {
    return http.post('http://localhost:4000/createcourse',data);
};

export const getCourses = async() => {
    return http.get('http://localhost:4000/getcourses');
};

export const getCourse = async (courseId) => {
    const ax = http.get(`http://localhost:4000/getcourseId/${courseId}`);
    const { data } = await ax;
    return data.course
};

export const editCourse = (courseId, data) => {
    return http.put(`http://localhost:4000/editcourse/${courseId}`, data);
};

export const deleteCourse = (courseId) => {
    return http.delete(`http://localhost:4000/deletecourse/${courseId}`);
};

export const partCourse = (courseId, data) => {
    return http.post(`http://localhost:4000/partcourse/${courseId}`, data);
};

export const getPartCourse = async(courseId) => {
    return http.get(`http://localhost:4000/getpartcourse/${courseId}`);
};



export const getSinglePartCourse = async (courseId) => {
    return http.get(`http://localhost:4000/getSinglePartCourse/${courseId}`);
};




export const editPartCourse = async (courseId, data) => {
    return http.put(`http://localhost:4000/editpartcourse/${courseId}`, data);
};


export const commentCourse = (courseId, data) => {
    return http.post(`http://localhost:4000/commentcourse/${courseId}`, data);
};

export const getComment = (courseId) => {
    return http.get(`http://localhost:4000/getcommentcourse/${courseId}`);
};

export const payment = (courseId) => {
    return http.get(`http://localhost:4000/confirmpayment/${courseId}`);
};

export const verifypayment = () => {
    return http.get('http://localhost:4000/verifypayment');
};





export const editlikecourse = (courseId, data) => {
    return http.put(`http://localhost:4000/editlikecourse/${courseId}`, data);
};

export const getTrueLike = (courseId) => {
    return http.get(`http://localhost:4000/gettruelike/${courseId}`);
};



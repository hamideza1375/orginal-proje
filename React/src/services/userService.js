import http from "./httpService";


export const registerUser = user => {
return http.post('http://localhost:4000/register',user);
};

export const loginUser = (user) => {
    return http.post('http://localhost:4000/login', user);
};

export const forgetpassword = email => {
    return http.post('http://localhost:4000/forgetpassword', email);
};

export const resetpassword = id => {
    return http.post('http://localhost:4000/resetpassword', id);
};



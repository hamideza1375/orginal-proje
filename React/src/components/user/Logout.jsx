import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const Logout = ({ history }) => {

    useEffect(() => {
        localStorage.removeItem("token");
        window.location.assign("/")
        // history.push("/");
  
    }, []);

    return null;
};

export default withRouter(Logout);

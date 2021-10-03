import React from "react";
import { withRouter } from "react-router-dom";
import { Header } from "../common/Header";
import { Footer } from "../common/Footer";



const Layout = ({ children, location, setSearch}) => {

    return (
        <div>
            {(location.pathname === '/') ? <Header setSearch={setSearch} />:"" }
            

            <div>{children}</div>


            {(location.pathname === '/') ? <Footer /> : ""}


        </div>
    );
};

export default withRouter(Layout);




import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

const NotFound = ({ history}) => {
    return (
        <Fragment>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>شرمنده همچین صفحه ایی نداریم</h2>

                    <Link onClick={() => (history.go(-1)) }>
                        <span class="arrow" />
                        بازگشت به صفحه قبل
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(NotFound);

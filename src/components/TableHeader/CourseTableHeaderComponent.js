import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

const CourseTableHeaderComponent = () =>

    <React.Fragment>
        <Route path={["/course-manager", "/course-manager/table"]}
               exact={true}
               render={() =>
                   <tr className = "table">
                       <th className="wbdv-header wbdv-title" scope="col">Title
                           <button className="btn">
                               <i className="fas fa-sort-up"></i>
                           </button>
                       </th>
                       <th className="wbdv-header wbdv-owner owned-collapse" scope="col">
                           <label>Course ID</label>
                       </th>

                       <th scope="col">
                           <button className="btn wbdv-button wbdv-header wbdv-sort" data-toggle="tooltip"
                                   title="Sort">
                               <i className="fas fa-sort-alpha-up"></i>
                           </button>
                       </th>
                   </tr>
               }/>
    </React.Fragment>



export default CourseTableHeaderComponent

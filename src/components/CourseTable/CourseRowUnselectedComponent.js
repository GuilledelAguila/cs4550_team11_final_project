import React from "react";
import {Link} from "react-router-dom";

const CourseRowUnselectedComponent  = ({index, course}) =>
    <React.Fragment>
        <td>
            <Link data-tip="Click to select row" className="black"to={`/course-manager/course/${course.id}`}>
                <i className="fas fa-file-alt wbdv-row wbdv-icon"></i>
                <label className="courseTitle">{course.name}</label>
            </Link>
        </td>
        <td className="collapsable wbdv-row wbdv-owner owned-collapse">{course.id}</td>
        <td className="collapsable wbdv-row wbdv-owner owned-collapse">me</td>
        <td className="collapsable wbdv-row wbdv-modified-date lastModified-collapse">11:45 AM</td>
        <td>
        </td>
    </React.Fragment>


export default CourseRowUnselectedComponent
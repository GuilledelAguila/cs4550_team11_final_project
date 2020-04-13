import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class CourseRowUnselectedComponent extends React.Component {

    render() {
        return (
            <React.Fragment>
                <td>
                    <div>
                        <Link data-tip="Click to select row" className="black"to={`/course-manager/course/${this.props.course.id}`}>
                            <i className="fas fa-file-alt wbdv-row wbdv-icon"></i>
                        <label className="courseTitle">{this.props.course.name}</label>
                        </Link>
                    </div>
                </td>
                <td className="collapsable wbdv-row wbdv-owner owned-collapse">{this.props.course.id}</td>
                <td className="collapsable wbdv-row wbdv-owner owned-collapse">me</td>
                <td className="collapsable wbdv-row wbdv-modified-date lastModified-collapse">11:45 AM</td>
                <td>
                </td>
            </React.Fragment>
        )}
}

export default CourseRowUnselectedComponent

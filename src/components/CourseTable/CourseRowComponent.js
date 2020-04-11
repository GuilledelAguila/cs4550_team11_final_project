import React from "react";
import CourseRowUnselectedComponent from "./CourseRowUnselectedComponent";



const CourseRowComponent = ({course, index}) =>
{
    return(
        <tr className="wbdv-row wbdv-course">
                <CourseRowUnselectedComponent
                    index = {index}
                    course = {course}
                />

        </tr>
    )
}

export default CourseRowComponent
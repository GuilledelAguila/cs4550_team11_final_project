import React from "react";
import CourseRowComponent from "./CourseRowComponent";
import {connect} from "react-redux";
import courseService from '../../services/CourseService'
import {findAllCourses} from '../../actions/courseActions'

class CourseTableComponent extends React.Component {

    componentDidMount() {
        this.props.findAllCourses()
    }

    render() {
        return (
            <React.Fragment>
                <tbody>
                {
                    this.props.courses && this.props.courses.length > 0
                        ? this.props.courses.map(function(course, index){
                            return (
                                <CourseRowComponent key={index}
                                    course={course}
                                    index={index}
                                />
                            )
                        })
                        : <tr><td>OOPS, LOOKS LIKE NO COURSES WHERE FOUND</td></tr>
                }
                </tbody>
            </React.Fragment>
        )
    }
}


const stateToPropertyMapper = (state) => {
    return {
        courses: state.courses.courses,
        user: state.user.user
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {

        findAllCourses: () =>
            courseService.findAllCourses()
                .then(actualCourses => {
                    dispatch(findAllCourses(actualCourses))
                })

    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(CourseTableComponent)



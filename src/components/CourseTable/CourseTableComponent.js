import React from "react";
import CourseRowComponent from "./CourseRowComponent";
import {findAllTopics} from "../../actions/topicActions";
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
                    this.props.courses && this.props.courses.map(function(course, index){
                        return (
                            <CourseRowComponent
                                course={course}
                                index={index}
                            />
                        )
                    })
                }
                </tbody>
            </React.Fragment>
        )
    }
}


const stateToPropertyMapper = (state) => {
    return {
        courses: state.courses.courses
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



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
                    this.props.topic && this.props.courses.map(function(course, index){
                        return (
                            <CourseRowComponent
                                course={course}
                                index={index}
                                deleteCourse={this.props.deleteCourse}
                                activeRow={this.props.activeRow}
                                editingRow={this.props.editingRow}
                                selectRow = {this.props.selectRow}
                                editRow = {this.props.editRow}
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
        courses: state.courses
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



import React from "react";
import InstructorComponent from "./InstructorComponent";
import ConversationsComponent from "./ConversationsComponent";
import TopicsComponent from "./TopicsComponent";
import {connect} from "react-redux";
import courseService from '../../services/CourseService'



class CoursePageComponent extends React.Component{

    componentDidMount() {
        this.findCourseById(this.props.courseId)
    }

    findCourseById = (courseId) => {
        courseService.findCourseById(courseId)
            .then(course => this.setState(prevState => ({
                course: course
            })))
    }

    state = {
        course: ''
    }

    render() {
        return(
                <div>
                    <InstructorComponent
                        course = {this.state.course}
                    />
                    <div className="container-fluid text-left">
                        <div className="row">
                            <TopicsComponent
                                courseId = {this.props.courseId}
                                topicId = {this.props.topicId}
                            />
                            <ConversationsComponent
                                courseId = {this.props.courseId}
                                topicId = {this.props.topicId}/>
                        </div>
                    </div>
                </div>
        )
    }

}

const stateToPropertyMapper = (state) => {
    return {
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {

    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(CoursePageComponent)



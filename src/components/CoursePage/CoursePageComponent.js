import React from "react";
import InstructorComponent from "./InstructorComponent";
import ConversationsComponent from "./ConversationsComponent";
import TopicsComponent from "./TopicsComponent";
import {connect} from "react-redux";
import courseService from '../../services/CourseService'
import {findCourseById} from "../../services/CourseService";
import EventsSearchComponent from "../Events/EventsSearchComponent";


class CoursePageComponent extends React.Component{

    componentDidMount() {
        findCourseById(this.props.courseId)
            .then(actualCourse => this.setState({
                courseName: actualCourse.name
            }))

    }

    state ={}

    render() {
        return(
                <div>
                    <InstructorComponent
                        courseId = {this.props.courseId}
                    />
                    <div className="container-fluid text-left">
                        <div className="row">
                            <TopicsComponent
                                courseId = {this.props.courseId}
                                courseName = {this.state.courseName}
                            />

                            {
                                this.props.topicId !== "events"
                                ? <ConversationsComponent
                                        courseId = {this.props.courseId}
                                        topicId = {this.props.topicId}/>

                                : <EventsSearchComponent
                                courseName = {this.state.courseName}
                                courseId = {this.props.courseId}/>
                            }


                        </div>
                    </div>
                    <br/>
                </div>
        )
    }

}

export default CoursePageComponent



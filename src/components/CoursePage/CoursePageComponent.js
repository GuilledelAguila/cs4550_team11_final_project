import React from "react";
import InstructorComponent from "./InstructorComponent";
import ConversationsComponent from "./ConversationsComponent";
import TopicsComponent from "./TopicsComponent";
import {connect} from "react-redux";
import courseService from '../../services/CourseService'



class CoursePageComponent extends React.Component{

    componentDidMount() {
    }

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

export default CoursePageComponent



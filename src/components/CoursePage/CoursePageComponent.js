import React from "react";
import InstructorComponent from "./InstructorComponent";
import ConversationsComponent from "./ConversationsComponent";
import TopicsComponent from "./TopicsComponent";
import {Provider} from "react-redux";


class CoursePageComponent extends React.Component{

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

export default CoursePageComponent
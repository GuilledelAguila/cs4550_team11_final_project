import React from "react";
import InstructorComponent from "./InstructorComponent";
import ConversationsComponent from "./ConversationsComponent";
import TopicsComponent from "./TopicsComponent";
import {connect} from "react-redux";
import courseService from '../../services/CourseService'
import {findCourseById} from "../../services/CourseService";
import EventsSearchComponent from "../Events/EventsSearchComponent";
import {profile} from "../../services/UserService";
import {findEventsForUser} from "../../services/EventService";
import {setUser} from "../../actions/userActions";


class CoursePageComponent extends React.Component{

    componentDidMount() {

        profile()
            .then(profile => profile
                ? (
                    this.props.setUser(profile),
                    findCourseById(this.props.courseId)
                        .then(actualCourse => this.setState({
                            courseName: actualCourse.name
                        }))
                )
                : this.props.history.push("/")
            )
    }

    state ={}

    render() {
        return(
                <div>
                    <InstructorComponent
                        user = {this.props.user}
                        courseId = {this.props.courseId}
                    />
                    <div className="container-fluid text-left">
                        <div className="row">
                            <TopicsComponent
                                user = {this.props.user}
                                courseId = {this.props.courseId}
                                courseName = {this.state.courseName}
                            />

                            {
                                this.props.topicId && this.props.topicId !== "events"
                                        ? <ConversationsComponent
                                            user={this.props.user}
                                            courseId={this.props.courseId}
                                            topicId={this.props.topicId}/>

                                        : <EventsSearchComponent
                                            {...this.props}
                                            user={this.props.user}
                                            courseName={this.state.courseName}
                                            courseId={this.props.courseId}/>

                            }


                        </div>
                    </div>
                    <br/>
                </div>
        )
    }

}

const stateToPropertyMapper = (state) => {
    return {
        user: state.user.user
    }
}
const dispatchToPropertyMapper = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(CoursePageComponent)



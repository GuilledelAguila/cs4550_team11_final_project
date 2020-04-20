import React from "react";
import "./events.style.client.css"
import eventService from "../../services/EventService"
import {connect} from "react-redux";
import discussionService from "../../services/DiscussionService";
import {saveComment} from "../../actions/discussionActions";
import {addEvent, findEvents} from "../../actions/eventActions";
import CourseRowComponent from "../CourseTable/CourseRowComponent";
import {Link} from "react-router-dom";

class PostEventComponent extends React.Component {

    state = {
        title: '',
        location: '',
        date: '',
        description: ''
    }

    componentDidMount() {
        this.props.findEventsForCourse(this.props.courseId);
    }

    render() {
        return (
           <div className="post-event-page">
            <h1 className="white">
                <Link to={`/course-manager/course/${this.props.courseId}`}>
                    <button className="btn btn-primary h1 float-left">Back</button>
                </Link>
                Post Event
            </h1>
               <div className="container-form-event">
                <div className="form-group row">
                    <label className="col-sm-2">
                        Event Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="New intro to the class!"
                            onChange={(e) =>
                                this.setState({
                                    title: e.target.value
                                })
                            }
                        />
                    </div>
                </div>
                   <div className="form-group row">
                       <label className="col-sm-2">
                           Location
                       </label>
                       <div className="col-sm-10">
                           <input
                               className="form-control"
                               placeholder="Hurting Hall 310"
                               onChange={(e) =>
                                   this.setState({
                                       location: e.target.value
                                   })
                               }
                           />
                       </div>
                   </div>
                   <div className="form-group row">
                       <label className="col-sm-2">
                           Date
                       </label>
                       <div className="col-sm-10">
                           <input
                               className="form-control"
                               placeholder="Monday, April 10"
                               onChange={(e) =>
                                   this.setState({
                                       date: e.target.value
                                   })
                               }
                           />
                       </div>
                   </div>
                   <div className="form-group row">
                       <label className="col-sm-2">
                           Desription
                       </label>
                       <div className="col-sm-10">
                           <input
                               className="form-control"
                               placeholder="I will explain you why this course is important"
                               onChange={(e) =>
                                   this.setState({
                                       description: e.target.value
                                   })
                               }
                           />
                       </div>
                   </div>
                   <div className="form-group row">
                       <label className="col-sm-2 col-form-label"> </label>
                       <div className="col-sm-10">
                           <button
                               onClick={() => this.props.postEvent(this.state, this.props.courseId)}
                               className="btn btn-outline-danger btn-block">
                               Post Event
                           </button>
                       </div>
                   </div>
               </div>

               <div className="render-events">
                   <h4>Events you have posted for this course: </h4>
                   {
                       this.props.events && this.props.events.map(event =>
                           <div className="list-group">
                               <li className={"list-group-item"}>{event.title}</li>
                           </div>
                       )
                   }
               </div>
           </div>

        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        events: state.events.events,
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findEventsForCourse: (courseId) => {
            eventService.findEventsForCourse(courseId)
                .then(actualEvents =>  dispatch(findEvents(actualEvents)))
        },

        postEvent: (event, courseId)  => {
            eventService.postEventForCourse(event, courseId)
                .then(event => dispatch(addEvent(event)))
        }
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(PostEventComponent)
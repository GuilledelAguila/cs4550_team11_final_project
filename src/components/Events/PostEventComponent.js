import React from "react";
import "./Events.style.client.css"
import eventService from "../../services/EventService"
import {connect} from "react-redux";
import discussionService from "../../services/DiscussionService";
import {saveComment} from "../../actions/discussionActions";
import {addEvent, findEvents} from "../../actions/eventActions";
import CourseRowComponent from "../CourseTable/CourseRowComponent";

class PostEventComponent extends React.Component {

    state = {
        id: '',
        title: ''
    }

    componentDidMount() {
        this.props.findEventsForCourse(this.props.courseId);
    }

    render() {
        return (
           <div className="post-event-page">
            <h1 className="white">Post Event</h1>
               <div className="container-form-event">
                   <div className="form-group row">
                       <label className="col-sm-2">
                           Event ID
                       </label>
                       <div className="col-sm-10">
                           <input
                               className="form-control"
                               placeholder="Introduce unique event ID"
                               onChange={(e) =>
                                   this.setState({
                                       id: e.target.value
                                   })
                               }
                           />
                       </div>
                   </div>
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
                           <div className="form-group row event">
                               <label>{event.title}</label>

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
                .then(event => addEvent(event))
        }
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(PostEventComponent)
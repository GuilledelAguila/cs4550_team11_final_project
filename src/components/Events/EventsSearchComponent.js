import React from "react";
import {Link} from "react-router-dom";
import eventService, {save} from "../../services/EventService";
import {profile} from "../../services/UserService";
import {findEventIdsForUser, deleteEventForUser} from "../../services/EventService";
import {
    addComment,
    cancelComment,
    findAllDiscussionsForTopic,
    saveComment,
    updateDiscussion
} from "../../actions/discussionActions";
import discussionService from "../../services/DiscussionService";
import {connect} from "react-redux";
import {findEvents} from "../../actions/eventActions";

class EventsSearchComponent extends React.Component{

    state = {
        events: [],
        searchLocation: '',
        userEventIds: [],
        user: {}
    }


    componentDidMount() {

        this.props.findEventsForCourse(this.props.courseId);


        if(this.props.user){
            this.props.courseName && this.searchEvents(this.props.courseName) &&
                this.setState({
                    user: this.props.user
                }).then(status => findEventIdsForUser(this.state.user.id)
                    .then(events => {
                        this.setState({
                            userEventIds: events
                        })
                    }))
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.courseName !== this.props.courseName){
            this.props.courseName && this.searchEvents(this.props.courseName)
        }
    }

    searchEvents = (keywords) => {
        fetch(`/api/event/search?keywords=${keywords}`)
            .then(response => response.json())
            .then(result => this.setState({
                events: result.events && result.events.event
            }))
    }

    save = (event) =>
        save(event)
            .then(eventIds =>
                console.log(eventIds)
                )

    delete = (event) =>
        deleteEventForUser(event)
            .then(eventIds => this.setState({
                userEventIds: eventIds
                })
            )




    render() {
        return(
            <div className="col-9">
                <br/>
                {/*<input*/}
                {/*    className={`form-control`}*/}
                {/*    onChange={e => this.setState({searchLocation: e.target.value})}*/}
                {/*    value={this.state.searchLocation}*/}
                {/*    placeholder="Search by Location"*/}
                {/*/>*/}
                {/*<button className={`btn btn-primary btn-block`} onClick={() => this.searchEvents(this.state.searchLocation)}>*/}
                {/*    Search For Events*/}
                {/*</button>*/}
                <ul className={`list-group`}>
                    <li className={`list-group-item background-brown white`} key="instructorTitle">
                        <h4>Events posted by instructor</h4>
                    </li>
                    {
                        this.props.instructorEvents && this.props.instructorEvents.map((iEvent, index) =>
                        <li className={"list-group-item"}>
                            <Link to={`/course-manager/course/${this.props.courseId}/topic/event/${iEvent.id}`}>
                            <label>{iEvent.title}</label>
                            </Link>

                            {
                                this.state.userEventIds.includes(iEvent.id)
                                    ? <button
                                        className="btn btn-danger float-right"
                                        onClick={() =>{ this.delete({id: iEvent.id , title: iEvent.title})
                                        }}>
                                        Remove
                                    </button>
                                    : <button
                                        className="btn btn-success float-right"
                                        onClick={() =>{ this.save({
                                            id: iEvent.id ,
                                            title: iEvent.title,
                                            address: iEvent.address,
                                            start_time: iEvent.start_time,
                                            owner: 'INSTRUCTOR',
                                            description: iEvent.description,
                                            course: 'CS3500'
                                        })
                                        }}>
                                        Save
                                    </button>
                            }

                        </li>
                        )
                    }
                    {
                        this.props.instructorEvents.length === 0 &&
                            <li className={"list-group-item"}>
                                <h4>No events posted by your instructor yet</h4>
                            </li>

                    }
                    <li className={`list-group-item background-brown white`} key="title">
                        <h4>Events related to {this.props.courseName}</h4>
                    </li>
                    {
                        this.state.events && this.state.events.length !== 0

                            ? this.state.events.map((event, i) =>
                            <li className={`list-group-item`} key={i}>
                                <Link to={`/course-manager/course/${this.props.courseId}/topic/event/${event.id}`}>
                                    {event.title}
                                </Link>
                                {
                                    this.state.userEventIds.includes(event.id)
                                    ? <button
                                        className="btn btn-danger float-right"
                                        onClick={() =>{ this.delete({id: event.id , title: event.title})
                                        }}>
                                        Remove
                                    </button>
                                    : <button
                                        className="btn btn-success float-right"
                                        onClick={() =>{ this.save({id: event.id , title: event.title})
                                        }}>
                                        Save
                                    </button>
                                }
                                <div>
                                    <small>Date: {event.start_time}</small>
                                </div>
                            </li>
                            )
                            : <h3>LOADING...</h3>
                    }

                    {
                        !this.state.events && <h4>
                            Ooops no events found in {this.props.match.params.searchLocation} :(
                        </h4>
                    }
                </ul>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        instructorEvents: state.events.events
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findEventsForCourse: (courseId) => {
            eventService.findEventsForCourse(courseId)
                .then(actualEvents =>  dispatch(findEvents(actualEvents)))
        }
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(EventsSearchComponent)

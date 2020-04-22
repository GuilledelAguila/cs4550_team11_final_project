import React from "react";
import {Link} from "react-router-dom";
import eventService, {save} from "../../services/EventService";
import {searchEvents} from "../../services/ApiService";
import {findEventIdsForUser, deleteEventForUser} from "../../services/EventService";
import {connect} from "react-redux";
import {findEvents} from "../../actions/eventActions";

class EventsSearchComponent extends React.Component{

    state = {
        events: [],
        keywords: '',
        userEventIds: [],
    }


    componentDidMount() {
        this.props.findEventsForCourse(this.props.courseId);
        if(this.props.user.id){
            findEventIdsForUser(this.props.user)
                    .then(events => {
                        this.setState({
                            userEventIds: events
                        })
                    })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.courseName !== this.props.courseName) {
            this.searchEvents(this.props.courseName)
        }
    }

    searchEvents = (keywords) => {
        this.props.history.push(`/course-manager/course/${this.props.courseId}/topic/events/search/${keywords}`);
            searchEvents(keywords)
                .then(result =>
                    this.setState({
                        events: result.events && result.events.event,
                    })
                )
    }

    save = (event) =>
        save(event)
            .then(eventIds => this.setState({
                    userEventIds: eventIds
                }))

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
                <ul className={`list-group`}>
                    <li className={`list-group-item background-brown white`} key="instructorTitle">
                        <h4>Events posted by instructor</h4>
                    </li>
                    {
                        this.props.instructorEvents && this.props.instructorEvents.map((iEvent, index) =>
                        <li className={"list-group-item"} key={iEvent.id}>
                            <Link to={`/course-manager/course/${this.props.courseId}/topic/event/details/${iEvent.id}`}>
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
                        <div className="form-inline">
                            <h4>Other Events</h4>
                        <div className="form-group">
                            <input className="form-control search-input" placeholder="Search keywords"
                                   onChange={e => this.setState({keywords: e.target.value})}
                                   value={this.state.keywords}
                            />
                        </div>
                            <button className="btn btn-success search-btn "
                                    onClick={() => this.searchEvents(this.state.keywords)}>
                                Search Events
                            </button>
                        </div>
                    </li>
                    {
                        this.state.events && this.state.events.length !== 0

                            ? this.state.events.map((event, i) =>
                            <li className={`list-group-item`} key={event.id}>
                                <Link to={`/course-manager/course/${this.props.courseId}/topic/event/details/${event.id}`}>
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
                            Ooops no events found in {this.state.keywords} :(
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

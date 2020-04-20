import React from "react";
import {Link} from "react-router-dom";
import {save} from "../../services/EventService";
import {profile} from "../../services/UserService";
import {findEventIdsForUser, deleteEventForUser} from "../../services/EventService";

export default class EventsSearchComponent extends React.Component{

    componentDidMount() {

        if(this.props.user){
            this.props.courseName && this.searchEvents(this.props.courseName)
            try {
                this.setState({
                    user: this.props.user
                })
            } finally {
                findEventIdsForUser(this.state.user.id)
                    .then(events => {
                        this.setState({
                            userEventIds: events
                        })
                    })
            }
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
            .then(eventIds => this.setState({
                    userEventIds: eventIds
                    })
                )

    delete = (event) =>
        deleteEventForUser(event)
            .then(eventIds => this.setState({
                userEventIds: eventIds
                })
            )


    state = {
        events: [],
        searchLocation: '',
        userEventIds: [],
        user: {}
    }

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
                    <li className={`list-group-item background-brown white`} key="title">
                        <h4>Events related to {this.props.courseName}</h4>
                    </li>
                    {
                        this.state.events && this.state.events.length !== 0

                            ? this.state.events.map((event, i) =>
                            <li className={`list-group-item`} key={i}>
                                <Link to={`/course-manager/course/${this.props.courseId}/event/${event.id}`}>
                                    {event.title}
                                </Link>
                                {this.state.userEventIds.includes(event.id)
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

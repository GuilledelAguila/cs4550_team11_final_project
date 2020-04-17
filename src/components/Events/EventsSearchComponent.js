import React from "react";
import {Link} from "react-router-dom";
import {save} from "../../services/EventService";
import {findEventIdsForUser, profile, deleteEventForUser} from "../../services/UserService";

export default class EventsSearchComponent extends React.Component{

    componentDidMount() {
        let searchLocation = this.props.match.params.searchLocation;
        if(!searchLocation)
            searchLocation='USA'
        fetch(`/api/event/search?location=${searchLocation}`)
            .then(response => response.json())
            .then(result => this.setState({
                events: result.events && result.events.event
            }))
        profile()
            .then(profile => {
                if(profile.status === 500) this.props.history.push("/")
                else this.setState({
                    user: profile
                })
            })
            .then(r => findEventIdsForUser(this.state.user.id)
                .then( events => {this.setState({
                    userEventIds: events
                })
                })
            )


    }

    searchEvents = (searchLocation) => {
        this.props.history.push(`/course-manager/course/${this.props.match.params.courseId}/event/search/${searchLocation}`)
        fetch(`/api/event/search?location=${searchLocation}`)
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
            <div className="container">
                <br/>
                <Link to={`/course-manager`}>
                    <i className="fas  fa-arrow-left"/>
                </Link>
                <h2>
                    Search Events
                </h2>
                <input
                    className={`form-control`}
                    onChange={e => this.setState({searchLocation: e.target.value})}
                    value={this.state.searchLocation}
                    placeholder="Search by Location"
                />
                <button className={`btn btn-primary btn-block`} onClick={() => this.searchEvents(this.state.searchLocation)}>
                    Search For Events
                </button>
                <ul className={`list-group`}>
                    {
                        this.state.events && this.state.events.map((event, i) =>
                            <li className={`list-group-item`} key={i}>
                                <Link to={`/course-manager/course/${this.props.match.params.courseId}/event/${event.id}`}>
                                    {event.title} {event.city_name}
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

                            </li>
                        )
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

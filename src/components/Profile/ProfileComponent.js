import React from "react";
import {profile, findUserById} from "../../services/UserService";
import {setUser} from "../../actions/userActions";
import {connect} from "react-redux";

import {Link} from "react-router-dom";
import {findEventsForUser, deleteEventForUser} from "../../services/EventService";


class ProfileComponent extends React.Component {

    state ={
        events: [],
        eventIds: [],
        user: {}
    };

    componentDidMount() {
        if(this.props.userId){
            findUserById(this.props.userId)
                .then(profile => this.props.setUser(profile))
        } else {
            profile()
                .then(profile => profile
                    ? (this.props.setUser(profile),
                            findEventsForUser()
                                .then(events => this.setState({
                                    events: events,
                                    eventIds: events.map(event => event.id)
                                }))
                    )
                    : this.props.history.push("/")
                )
        }

    }

    delete = (event) =>
        deleteEventForUser(event)
            .then(eventIds => findEventsForUser()
                .then(events => this.setState({
                    events: events,
                    eventIds: events.map(event => event.id)
                }))
            )

    render() {
        return(
            <div>
            <div className="container-fluid">
                <h1>
                    <Link to={"/course-manager"}>
                        <button className="btn btn-primary h1 float-left">Back</button>
                    </Link>
                </h1>
            </div>
                <div className="container">
                    {!this.props.userId
                        ? <ul className="list-group">
                            <li className="list-group-item background-brown white" key="aa">
                                <h4>Your details:</h4>
                            </li>
                            <li className="list-group-item" key={1}>Name: {this.props.user.name}</li>
                            <li className="list-group-item" key={2}>Last name: {this.props.user.lastName}</li>
                            <li className="list-group-item" key={3}>Type: {this.props.user.userType}</li>
                            <li className="list-group-item" key={4}>Email: {this.props.user.email}</li>
                            <li className="list-group-item background-brown white" key="events">
                                <h4>Your Events:</h4>
                            </li>
                            {this.state.events && this.state.events.map(event =>
                                <li className="list-group-item" key={event.id}>
                                    <Link to={`/course-manager/profile/event/details/${event.id}`}>
                                        {event.title}
                                    </Link>
                                    <button
                                        className="btn btn-danger float-right"
                                        onClick={() => {
                                            this.delete({id: event.id, title: event.title})
                                        }}>
                                        Remove
                                    </button>
                                </li>
                            )}
                        </ul>
                        : <ul className="list-group">
                            <li className="list-group-item background-brown white" key="aa">
                                <h4>{this.props.user.name}'s details</h4>
                            </li>
                            <li className="list-group-item" key={1}>Name: {this.props.user.name}</li>
                            <li className="list-group-item" key={3}>Type: {this.props.user.userType}</li>
                            <li className="list-group-item" key={4}>Email: {this.props.user.email}</li>
                        </ul>
                    }
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
(ProfileComponent)

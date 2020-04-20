import React from "react";
import {profile, logout} from "../../services/UserService";
import {setUser} from "../../actions/userActions";
import {connect} from "react-redux";

import {Link} from "react-router-dom";
import {findEventsForUser, deleteEventForUser} from "../../services/EventService";


class ProfileComponent extends React.Component {

    state ={
        events: [],
        eventIds: []
    };

    componentDidMount() {
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
                    HELLO {this.props.user.name}!
                </h1>
            </div>
                <div className="container">
                    <ul className="list-group">
                        <li className="list-group-item background-brown white" key="aa">
                            <h4>Your details:</h4>
                        </li>
                        <li className="list-group-item" key={1} >Name: {this.props.user.name}</li>
                        <li className="list-group-item" key={2}>Last name: {this.props.user.lastName}</li>
                        <li className="list-group-item" key={3}>Type: {this.props.user.userType}</li>
                        <li className="list-group-item" key={4}>Email: {this.props.user.email}</li>
                        <li className="list-group-item background-brown white" key="events">
                            <h4>Your Events:</h4>
                        </li>
                        {this.state.events && this.state.events.map(event =>
                            <li className="list-group-item" key={event.id}>{event.title}
                                <button
                                    className="btn btn-danger float-right"
                                    onClick={() =>{ this.delete({id: event.id , title: event.title})
                                    }}>
                                    Remove
                                </button>

                            </li>
                        )}
                    </ul>
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

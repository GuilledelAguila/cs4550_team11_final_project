import React from "react";
import {profile, logout, deleteEventForUser} from "../../services/UserService";
import {setUser} from "../../actions/userActions";
import {connect} from "react-redux";

import {Link} from "react-router-dom";
import {findEventsForUser} from "../../services/UserService";


class ProfileComponent extends React.Component {

    state ={
        events: [],
        eventIds: []
    };

    componentDidMount() {
        profile()
            .then(profile => this.props.setUser(profile))
        findEventsForUser()
            .then(events => this.setState({
                events: events,
                eventIds: events.map(event => event.id)
            }))


    }

    refresh = () => {
        logout()
            .then(status => this.props.history.push("/login"))
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
            <div className="container">
                <h1>HELLO {this.props.user.name}!</h1>
                <ul className="list-group">
                    <li className="list-group-item active" key="aa">Your details:</li>
                    <li className="list-group-item" key={this.props.user.name} >Name: {this.props.user.name}</li>
                    <li className="list-group-item" key={this.props.user.lastName}>Last name: {this.props.user.lastName}</li>
                    <li className="list-group-item" key={this.props.user.userType}>Type: {this.props.user.userType}</li>
                    <li className="list-group-item" key={this.props.user.email}>Email: {this.props.user.email}</li>
                    <li className="list-group-item active" key="events">Your Events:</li>
                    {this.state.events && this.state.events.map(event =>
                        <li className="list-group-item" key={event.title}>{event.title}
                            <button
                                className="btn btn-danger float-right"
                                onClick={() =>{ this.delete({id: event.id , title: event.title})
                                }}>
                                Remove
                            </button>

                        </li>
                    )}
                </ul>

                <br/>
                <Link to={"/course-manager"}>
                    <button className="btn btn-primary h1 float-right">Exit</button>
                </Link>
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

import React from "react";
import {profile, findUserById, saveNewUserDetails} from "../../services/UserService";
import {setUser} from "../../actions/userActions";
import {connect} from "react-redux";

import {Link} from "react-router-dom";
import {findEventsForUser, deleteEventForUser} from "../../services/EventService";


class ProfileComponent extends React.Component {

    state ={
        events: [],
        eventIds: [],
        user: {},
        editingDetails: false,
    };

    componentDidMount() {
        if(this.props.userId){
            findUserById(this.props.userId)
                .then(profile => this.props.setUser(profile))
        } else {
            profile()
                .then(profile => profile
                    ? (this.props.setUser(profile),
                            this.setState({
                                user: profile
                            }),
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

    editDetails = () => {
        this.setState(prevState => ({
            editingDetails: true,
        }))
    }

    saveNewUserDetails = (user) => {
        saveNewUserDetails(user)
            .then(updatedUser => {
                this.props.setUser(updatedUser)
                    this.setState({
                        user: updatedUser,
                        editingDetails: false,
                    })
            })
    }


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
                                <h4>
                                {this.state.editingDetails === false
                                    ? <button className="btn hidden wbdv-row wbdv-button wbdv-edit"
                                              onClick={this.editDetails}>
                                        <i className="fas fa-pencil-alt wbdv-row wbdv-button wbdv-edit white"/>
                                    </button>
                                    : <button className="btn wbdv-row wbdv-button wbdv-save white"
                                              onClick={()=> this.saveNewUserDetails(this.state.user)}>
                                        <i className="fas fa-check white"/>
                                    </button>
                                } Your details:</h4>
                            </li>
                            <li className="list-group-item form-inline" key={1}>
                                {this.state.editingDetails === false
                                    ? <span>Name: {this.props.user.name}</span>
                                    : <input className="form-control"
                                              onChange={(e) => {
                                                  const newName = String(e.target.value);
                                                  this.setState(prevState => ({
                                                      user: {
                                                          id: prevState.user.id,
                                                          email: prevState.user.email,
                                                          lastName: prevState.user.lastName,
                                                          name: newName}
                                                  }))
                                              }}
                                              value={this.state.user.name}>

                                    </input>
                                }
                            </li>
                            <li className="list-group-item form-inline" key={2}>
                                {this.state.editingDetails === false
                                    ? <span>Name: {this.props.user.lastName}</span>
                                    : <input className="form-control"
                                             onChange={(e) => {
                                                 const lastName = String(e.target.value);
                                                 this.setState(prevState => ({
                                                     user: {
                                                         id: prevState.user.id,
                                                         email: prevState.user.email,
                                                         lastName: lastName,
                                                         name: prevState.user.name}
                                                 }))
                                             }}
                                             value={this.state.user.lastName}>

                                    </input>
                                }

                            </li>
                            <li className="list-group-item" key={3}>Type: {this.props.user.userType}</li>
                            <li className="list-group-item form-inline" key={4}>
                                {this.state.editingDetails === false
                                    ? <span>Name: {this.props.user.email}</span>
                                    : <input className="form-control"
                                             onChange={(e) => {
                                                 const email = String(e.target.value);
                                                 this.setState(prevState => ({
                                                     user: {
                                                         id: prevState.user.id,
                                                         email: email,
                                                         lastName: prevState.user.lastName,
                                                         name: prevState.user.name}
                                                 }))
                                             }}
                                             value={this.state.user.email}>

                                    </input>
                                }
                            </li>
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
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(ProfileComponent)

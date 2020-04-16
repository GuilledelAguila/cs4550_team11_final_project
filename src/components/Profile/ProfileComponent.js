import React from "react";
import {profile, logout} from "../../services/UserService";
import {setUser, getUser} from "../../actions/userActions";
import {connect} from "react-redux";
import {findUsersToValidate, updateValidateFaculty, updateUnvalidateFaculty} from "../../services/UserService";
import {Link} from "react-router-dom";
import {findEventsForUser} from "../../services/UserService";


class ProfileComponent extends React.Component {

    state ={};

    componentDidMount() {
        profile()
            .then(profile => this.props.setUser(profile))
        findEventsForUser()
            .then(events => console.log(events))
    }

    refresh = () => {
        logout()
            .then(status => this.props.history.push("/login"))
    }

    render() {
        return(
            <div className="container">
                <h1>HELLO {this.props.user.name}!</h1>
                <ul className="list-group-flush">
                    <li className="list-group-item active">Your details:</li>
                    <li className="list-group-item">Name: {this.props.user.name}</li>
                    <li className="list-group-item">Last name: {this.props.user.lastName}</li>
                    <li className="list-group-item">Type: {this.props.user.userType}</li>
                    <li className="list-group-item">Email: {this.props.user.email}</li>
                </ul>
                {this.state.events && this.state.events.map(event => event.title)}
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

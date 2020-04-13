import React from "react";
import {profile, logout} from "../../services/UserService";
import {setUser, getUser} from "../../actions/userActions";
import {connect} from "react-redux";
import {findUsersToValidate, updateValidateFaculty, updateUnvalidateFaculty} from "../../services/UserService";
import {Link} from "react-router-dom";


class AwaitValidationComponent extends React.Component {

    state ={};

    componentDidMount() {
        profile()
            .then(profile => this.props.setUser(profile))
    }

    refresh = () => {
        logout()
            .then(status => this.props.history.push("/login"))
    }

    render() {
        return(
            <div className="container text-center">
                <h1>HELLO {this.props.user.name}!</h1>
                <h3>PLEASE WAIT WHILE WE VALIDATE YOUR PROFILE THIS MAY TAKE SEVERAL HOURS</h3>
                <br/>
                <button onClick={this.refresh} className="btn btn-primary">Login</button>
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
(AwaitValidationComponent)

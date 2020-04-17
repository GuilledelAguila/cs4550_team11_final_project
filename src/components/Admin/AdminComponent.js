import React from "react";
import {profile, logout} from "../../services/UserService";
import {setUser, getUser} from "../../actions/userActions";
import {connect} from "react-redux";
import {findUsersToValidate, updateValidateFaculty, updateUnvalidateFaculty} from "../../services/UserService";
import {Link} from "react-router-dom";


 class AdminComponent extends React.Component {

     state ={};

     componentDidMount() {
         findUsersToValidate().then(usersToValidate =>
             this.setState({
                usersToValidate
             }))
         profile()
             .then(profile => this.props.setUser(profile))
     }

     validate = (userId) => {
         updateValidateFaculty(userId).then(status =>
             findUsersToValidate().then(usersToValidate =>
                 this.setState({
                     usersToValidate
                 }))
         )
     }

     unvalidate = (userId) => {
         updateUnvalidateFaculty(userId).then(status =>
             findUsersToValidate().then(usersToValidate =>
                 this.setState({
                     usersToValidate
                 }))
         )
     }


     render() {
        return(
            <div>
                {this.props.user.userType === "ADMIN"
                    ? <div>
                        <h1>{this.props.user.name} is VALIDATING!
                            <Link to={"/course-manager"}>
                                <button className="btn btn-secondary h1 float-right">Exit</button>
                            </Link>
                        </h1>
                        <div className="container">
                        <ul className="list-group">

                            <li className="list-group-item active">
                                <div className="row">
                                    <div className="col-3">
                                        NAME
                                    </div>
                                    <div className="col-3">
                                        LAST NAME
                                    </div>
                                    <div className="col-3">
                                        EMAIL
                                    </div>
                                    <div className="col-3">
                                    </div>
                                </div>
                            </li>
                            {this.state.usersToValidate && this.state.usersToValidate.map(user =>
                                <li className="list-group-item">
                                    <div className="row">
                                    <div className="col-3">
                                        {user.name }
                                    </div>
                                    <div className="col-3">
                                        {user.lastName }
                                    </div>
                                    <div className="col-3">
                                        {user.email }
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btn-danger float-right">Delete</button>
                                        {user.validated === false
                                            ? <button
                                            onClick={() => this.validate(user.id)}
                                            className="btn btn-success float-right">Validate
                                            </button>
                                            : <button
                                                onClick={() => this.unvalidate(user.id)}
                                                className="btn btn-warning float-right">Reject
                                            </button>
                                        }


                                    </div>
                                    </div>
                                </li>
                            )}
                        </ul>

                        </div>
                    </div>
                    :<div>
                        <h1>{this.props.user.name}, YOUR ARE NOT AN ADMINISTRATOR</h1>
                    </div>
                    }
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
(AdminComponent)

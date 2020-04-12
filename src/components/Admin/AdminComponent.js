import React from "react";
import {profile, logout} from "../../services/UserService";
import {setUser, getUser} from "../../actions/userActions";
import {connect} from "react-redux";
import courseService from "../../services/CourseService";
import {findCourseById} from "../../actions/courseActions";

 class AdminComponent extends React.Component {
     componentDidMount() {
         this.props.getUser().then(r => console.log(r))
     }

     render() {
        return(
            <div>
                <h1>WORKS!</h1>
                <h2>YOU ARE: {this.props.user.name} </h2>
                {console.log(this.props.user.name)}
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
        getUser: () => dispatch(getUser())
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(AdminComponent)

import React from "react";
import "./CourseNav.style.client.css"
import courseService from "../../services/CourseService";
import {findAllCourses, findCourseById} from "../../actions/courseActions";
import {connect} from "react-redux";
import {profile, logout} from "../../services/UserService";
import {setUser} from "../../actions/userActions";
import {Link} from "react-router-dom";

class CourseNavComponent extends React.Component {

    state = {
        courseId: '',
        profile: {
            username: ''
        }
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    componentDidMount() {
        profile()
            .then(profile => {
                if(profile.status === 500) this.props.history.push("/")
                else this.props.setUser(profile)
            })

    }


    render() {
        return(
            <React.Fragment>
                <nav className="navbar navbar-expand-lg background-brown">
                    <div className="col-3">
                        <div className="row">
                            <div className="col-2">
                            </div>
                            <div className="collapse navbar-collapse col-10">
                                <label className="wbdv-label wbdv-course-manager">
                                    Course Finder</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <input
                            className="form-control wbdv-field"
                            onChange={(e) => {
                                const searchId = String(e.target.value);
                                this.setState(prevState => ({
                                    courseId: searchId
                                }))
                            }
                            }
                            value={this.state.courseId}
                            placeholder="Search Course ID"
                            id="wbdv-new-course"/>
                    </div>
                    <div className="col-3">
                        <button onClick= {() => this.props.findCourseById(this.state.courseId)}
                                className="btn  text wbdv-button wbdv-add-course">
                            Find Course
                        </button>
                        {this.props.user && <button
                            onClick={this.logout}
                            className="btn btn-warning logout float-right">Logout</button>}

                        {this.props.user.userType === "ADMIN" &&
                        <Link to={`/course-manager/admin`} className="btn btn-success float-right">
                            {this.props.user.name}
                        </Link>}

                        {this.props.user.userType !== "ADMIN" &&
                        <Link to={`/profile`} className="btn btn-success float-right">
                            {this.props.user.name}
                        </Link>}


                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        user: state.user.user,
        courses: state.courses.courses
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findCourseById: (courseId) => dispatch(findCourseById(courseId)),
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(CourseNavComponent)


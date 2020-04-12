import React from "react";
import "./CourseNav.style.client.css"
import courseService from "../../services/CourseService";
import {findAllCourses, findCourseById} from "../../actions/courseActions";
import {connect} from "react-redux";
import {profile, logout} from "../../services/UserService";
import {setUser} from "../../actions/userActions";

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
            .then(profile => this.props.setUser(profile))
    }


    render() {
        return(
            <React.Fragment>
                <nav className="navbar navbar-expand-lg">
                    <div className="col-3">
                        <div className="row">
                            <div className="col-2">
                                <i className="fa fa-bars wbdv-hamburger fa-2x"></i>
                            </div>
                            <div className="collapse navbar-collapse col-10">
                                <label className="wbdv-label wbdv-course-manager">
                                    Course Manager</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
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
                            placeholder="New Course Title"
                            id="wbdv-new-course"/>
                    </div>
                    <div className="col-2">
                        <button onClick= {() => this.props.findCourseById(this.state.courseId)} className="btn  text wbdv-button wbdv-add-course">
                            Find Course
                        </button>
                        {this.props.user.id && <label>{this.props.user.name}</label>}
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        courses: state.courses.courses,
        user: state.user.user
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findCourseById: (courseId) =>
            courseService.findCourseById(courseId)
                .then(course => {
                    if(course){
                        dispatch(findCourseById(course.id))
                    }
                }),

        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(CourseNavComponent)


import React from "react";
import "./CoursePage.style.client.css"
import icon from "./default-icon.jpg"
import courseService from "../../services/CourseService";
import {Link} from "react-router-dom";
import {profile} from "../../services/UserService";


class InstructorComponent extends React.Component{

    componentWillMount() {
        profile()
            .then(profile =>this.setState(prevState => ({
                course: prevState.course,
                editingBriefDescription: false,
                user: profile
            })))
        this.findCourseById(this.props.courseId)
    }

    findCourseById = (courseId) => {
        courseService.findCourseById(courseId)
            .then(actualCourse => this.setState(prevState => ({
                course: actualCourse,
                editingBriefDescription: false,
                user: prevState.user
            })))
    }

    editBriefDescription = () => {
        this.setState(prevState => ({
            course: prevState.course,
            editingBriefDescription: true,
            user: prevState.user
        }))
    }

    saveBriefDescription =() => {
        courseService.updateCourse(this.state.course.id, this.state.course)
            .then(state => this.setState(prevState => ({
                course: this.state.course,
                editingBriefDescription: false,
                user: prevState.user
            })))
    }

    state = {
        course: '',
        editingBriefDescription: false,
        user: ''
    }


    render() {
        return(
            <div className="container-fluid instructor text-left">
                <div className="row space-left">
                    <Link className="white"to={`/course-manager`}>
                    <i className="white fas fa-arrow-left fa-2x"></i>
                </Link>
                    <h1 className="white">{this.state.course.id} {this.state.course.name}</h1>
                </div>
                <div className="row space-bottom space-left">
                    <div className="col-3 ">
                        <h3 className="white">Instructor Picture</h3>
                        <img src={icon}/>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-3">
                                <h3 className="white">Brief description</h3>
                            </div>
                            <div className="col-2">
                                {
                                    this.state.user.userType === 'FACULTY' &&
                                        <div>
                                            {
                                                this.state.editingBriefDescription === false &&
                                                <button className="btn hidden wbdv-row wbdv-button wbdv-edit white"
                                                        onClick={this.editBriefDescription}>
                                                    <i className="fas fa-pencil-alt wbdv-row wbdv-button wbdv-edit"></i>
                                                </button>
                                            }
                                            {
                                                this.state.editingBriefDescription &&
                                                <button className="btn wbdv-row wbdv-button wbdv-save white"
                                                        onClick={()=> this.saveBriefDescription(this.state.course)}>
                                                    <i className="fas fa-check wbdv-button wbdv-save"></i>
                                                </button>

                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        {
                            this.state.editingBriefDescription===false &&
                            <span className="white">{this.state.course.description}</span>
                        }
                        {
                            this.state.editingBriefDescription &&
                            <textarea className="form-control"
                                      onChange={(e) => {
                                          const newDescription= String(e.target.value);
                                          this.setState(prevState => ({
                                              course: {
                                                  id: this.state.course.id,
                                                  name: this.state.course.name,
                                                  description: newDescription
                                              }
                                          }))
                                      }}
                                      value={this.state.course.description}>
                            </textarea>
                        }
                    </div>
                </div>
            </div>

        )
    }

}

export default InstructorComponent

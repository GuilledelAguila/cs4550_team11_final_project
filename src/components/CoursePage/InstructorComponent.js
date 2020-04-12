import React from "react";
import {connect} from "react-redux";
import "./CoursePage.style.client.css"
import icon from "./default-icon.jpg"
import {editBriefDescription, updateBriefDescription} from "../../actions/instructorActions";
import courseService from "../../services/CourseService";

class InstructorComponent extends React.Component{

    state = {
        course: this.props.course
    }

    render() {
        return(
            <div className="container-fluid instructor text-left">
                <div className="row space-left">
                    <h1 className="white">{this.props.course.id} {this.props.course.name}</h1>
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
                                    this.props.editingBriefDescription === false &&
                                    <button className="btn hidden wbdv-row wbdv-button wbdv-edit white"
                                        onClick={this.props.editBriefDescription}>
                                        <i className="fas fa-pencil-alt wbdv-row wbdv-button wbdv-edit"></i>
                                    </button>
                                }
                                {
                                    this.props.editingBriefDescription &&
                                    <button className="btn wbdv-row wbdv-button wbdv-save white"
                                        onClick={()=> this.props.saveBriefDescription(this.state.course)}>
                                        <i className="fas fa-check wbdv-button wbdv-save"></i>
                                    </button>

                                }
                            </div>
                        </div>
                        {
                            this.props.editingBriefDescription===false &&
                            <span className="white">{this.props.course.description}</span>
                        }
                        {
                            this.props.editingBriefDescription &&
                            <textarea className="form-control"
                                      onChange={(e) => {
                                          const newDescription= String(e.target.value);
                                          this.setState(prevState => ({
                                              course: {
                                                  id: this.props.course.id,
                                                  name: this.props.course.name,
                                                  description: newDescription
                                              }
                                          }))
                                      }}
                                      value={this.state.course.name}>
                            </textarea>
                        }
                    </div>
                </div>
            </div>

        )
    }

}

const stateToPropertyMapper = (state) => {
    return {
        editingBriefDescription: state.instructor.editingBriefDescription
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {

        editBriefDescription: () =>
            dispatch(editBriefDescription()),

        saveBriefDescription: (course) => {
            courseService.updateCourse(course.id, course)
                .then(status => dispatch (updateBriefDescription(course.description)))
        }


    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(InstructorComponent)

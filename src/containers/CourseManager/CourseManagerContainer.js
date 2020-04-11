import React from "react";
import CourseTableComponent from "../../components/CourseTable/CourseTableComponent";
import {findAllCourses, findCourseById, updateCourse, deleteCourse, createCourse} from "../../services/CourseService";
import CourseNavComponent from "../../components/Navbar/CourseNavComponent";
import CourseTableHeaderComponent from "../../components/TableHeader/CourseTableHeaderComponent";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import CoursePanelComponent from "../../components/CoursePanelComponent";
import CoursePageComponent from "../../components/CoursePage/CoursePageComponent";
import {combineReducers, createStore} from "redux";
import coursesReducer from "../../reducers/courseReducer";
import {Provider} from "react-redux";


const courseManagerReducer = combineReducers({
    courses: coursesReducer
})

const courseManagerStore = createStore(courseManagerReducer);

class CourseManagerContainer extends React.Component {

    componentDidMount = () =>
        findAllCourses()
            .then(courses => this.setState({
                    courses: courses
                })
            )



    addCourse = () => {
        if(document.getElementById("wbdv-new-course").value !== "") {
            createCourse({
                title: this.state.newCourseTitle
            }).then(actualCourse => this.setState(prevState => {
                    return ({
                        courses: [
                            ...prevState.courses,
                            actualCourse
                        ]
                    })
                })
            )
        }
        document.getElementById("wbdv-new-course").value = ""
    }




    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return(
            <React.Fragment>
                <Provider store={courseManagerStore}>
                <CourseNavComponent
                    addCourse = {this.addCourse}
                    updateForm = {this.updateForm}/>
                
                <table className="table table-hover">
                    <thead>
                    <CourseTableHeaderComponent/>
                    </thead>
                
                    <Route path={["/course-manager", "/course-manager/table"]}
                           exact={true}
                           render={() =>
                               <CourseTableComponent/>
                           }/>
                </table>
                
                
                <Route path={["/course-manager/grid/panel", "/course-manager/table/panel"]}
                       exact={true}
                       render={() =>
                           <CoursePanelComponent
                               courses={this.state.courses}
                           />
                       }/>
                </Provider>
            </React.Fragment>
        )
    }
}

export default CourseManagerContainer

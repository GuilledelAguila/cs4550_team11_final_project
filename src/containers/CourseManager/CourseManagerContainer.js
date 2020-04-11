import React from "react";
import CourseTableComponent from "../../components/CourseTable/CourseTableComponent";
import CourseGridComponent from "../../components/CourseGrid/CourseGridComponent";
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

    state = {
        layout: 'table',
        newCourseTitle: "New Course Title",
        selectedRow: -1,
        editingRow: -1,
        showEditorCourse: {}
    }

    selectRow = (index) =>
        this.setState(prevState => {
            if(this.state.selectedRow === index && this.state.editingRow === -1) {
                this.setState({
                    selectedRow: -1,
                    editingRow: -1
                })
            } else {
                this.setState({
                    selectedRow: index
                })
            }
        })

    editRow = (index, course) =>
        this.setState(prevState => {
            if(this.state.editingRow === index) {
                this.updateCourseRow(index, course)
                this.setState({
                    editingRow: -1
                })
            } else {
                this.setState({
                    editingRow: index
                })
            }
        })

    componentDidMount = () =>
        findAllCourses()
            .then(courses => this.setState({
                    courses: courses
                })
            )


    toggle = () =>
        this.setState(prevState => {
            if(prevState.layout === 'table') {
                return ({
                    layout: 'grid'
                })
            } else {
                return ({
                    layout: 'table'
                })
            }
        })

    deleteCourse = (course) => {
        deleteCourse(course._id)
            .then(status => {
                this.setState(prevState => {
                    return ({
                        courses: prevState
                            .courses
                            .filter(function(crs) {
                                return crs._id !== course._id
                            })
                    })
                })
            })

        this.setState({
            selectedRow: -1
        })
    }


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

    updateCourseRow = (index, course) => {
        if(document.getElementById("newinput").value) {
            course.title = document.getElementById("newinput").value
            updateCourse(course._id, course)
        }
    }



    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return(
            <React.Fragment>
                <Provider store={courseManagerStore}>
                {/*<CourseNavComponent*/}
                {/*    addCourse = {this.addCourse}*/}
                {/*    updateForm = {this.updateForm}/>*/}
                
                {/*<table className="table table-hover">*/}
                {/*    <thead>*/}
                {/*    <CourseTableHeaderComponent*/}
                {/*        toggle = {this.toggle}*/}
                {/*    />*/}
                {/*    </thead>*/}
                
                {/*    <Route path={["/course-manager", "/course-manager/table"]}*/}
                {/*           exact={true}*/}
                {/*           render={() =>*/}
                {/*               <CourseTableComponent*/}
                {/*                   deleteCourse={this.deleteCourse}*/}
                {/*                   activeRow={this.state.selectedRow}*/}
                {/*                   editingRow={this.state.editingRow}*/}
                {/*                   selectRow={this.selectRow}*/}
                {/*                   editRow={this.editRow}/>*/}
                {/*           }/>*/}
                {/*</table>*/}
                
                {/*<Route path="/course-manager/grid"*/}
                {/*       exact={true}*/}
                {/*       render={() =>*/}
                {/*           <CourseGridComponent*/}
                {/*               courses={this.state.courses}*/}
                {/*               deleteCourse={this.deleteCourse}*/}
                {/*               select ={this.selectRow}*/}
                {/*               edit={this.editRow}*/}
                {/*               editing={this.state.editingRow}*/}
                {/*               selected = {this.state.selectedRow}/>*/}
                {/*       }/>*/}
                
                
                {/*<Route path={["/course-manager/grid/panel", "/course-manager/table/panel"]}*/}
                {/*       exact={true}*/}
                {/*       render={() =>*/}
                {/*           <CoursePanelComponent*/}
                {/*               courses={this.state.courses}*/}
                {/*           />*/}
                {/*       }/>*/}
                </Provider>
            </React.Fragment>
        )
    }
}

export default CourseManagerContainer

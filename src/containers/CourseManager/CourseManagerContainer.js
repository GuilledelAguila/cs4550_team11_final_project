import React from "react";
import CourseTableComponent from "../../components/CourseTable/CourseTableComponent";
import {findAllCourses, findCourseById, updateCourse, deleteCourse, createCourse} from "../../services/CourseService";
import CourseNavComponent from "../../components/Navbar/CourseNavComponent";
import CourseTableHeaderComponent from "../../components/TableHeader/CourseTableHeaderComponent";
import {Link, Route} from "react-router-dom";
import CoursePanelComponent from "../../components/CoursePanelComponent";



class CourseManagerContainer extends React.Component {

    render() {
        return(
            <React.Fragment>
                <CourseNavComponent
                    {...this.props}
                />
                
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

            </React.Fragment>
        )
    }
}

export default CourseManagerContainer

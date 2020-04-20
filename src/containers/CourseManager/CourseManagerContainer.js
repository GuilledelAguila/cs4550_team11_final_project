import React from "react";
import CourseTableComponent from "../../components/CourseTable/CourseTableComponent";
import {findAllCourses, findCourseById, updateCourse, deleteCourse, createCourse} from "../../services/CourseService";
import CourseNavComponent from "../../components/Navbar/CourseNavComponent";
import CourseTableHeaderComponent from "../../components/TableHeader/CourseTableHeaderComponent";
import {Link, Route} from "react-router-dom";
import CoursePanelComponent from "../../components/CoursePanelComponent";
import {setUser} from "../../actions/userActions";
import {connect} from "react-redux";
import {profile} from "../../services/UserService";



class CourseManagerContainer extends React.Component {

    componentDidMount() {
        profile()
            .then(profile => profile
                ? this.props.setUser(profile)
                : this.props.history.push("/")
            )

    }
    render() {
        return(
            <React.Fragment>

                {this.props.user &&
                    <div>
                        <CourseNavComponent
                            {...this.props}
                            user = {this.props.user}
                        />

                        <table className="table table-hover ">
                            <thead className="table-header">
                            <CourseTableHeaderComponent/>
                            </thead>
                            <CourseTableComponent/>
                        </table>


                        {/*<Route path={["/course-manager/grid/panel", "/course-manager/table/panel"]}*/}
                        {/*       exact={true}*/}
                        {/*       render={() =>*/}
                        {/*           <CoursePanelComponent*/}
                        {/*               courses={this.state.courses}*/}
                        {/*           />*/}
                        {/*       }/>*/}

                    </div>
                }
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
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(CourseManagerContainer)

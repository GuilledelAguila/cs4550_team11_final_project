import React from "react";
import {BrowserRouter as Router, Link, Route, useHistory} from "react-router-dom";
import './HomePage.style.client.css';
import LogInComponent from "../../components/LogIn/LogInComponent";
import SignUpComponent from "../../components/SignUp/SignUpComponent";
import CourseManagerContainer from "../CourseManager/CourseManagerContainer";
import CoursePageComponent from "../../components/CoursePage/CoursePageComponent";
import HomePageComponent from "../../components/HomePageComponent";
import AdminComponent from "../../components/Admin/AdminComponent";
import {combineReducers, createStore} from "redux";
import coursesReducer from "../../reducers/courseReducer";
import topicsReducer from "../../reducers/topicReducer";
import discussionReducer from "../../reducers/discussionReducer";
import userReducer from "../../reducers/userReducer";
import {Provider} from "react-redux";


const rootReducer = combineReducers({
    courses: coursesReducer,
    topics: topicsReducer,
    discussions: discussionReducer,
    user: userReducer
})

const store = createStore(rootReducer);

class HomePageContainer extends React.Component {

    render() {
        return(
            <Provider store={store}>
            <Router>
                <Route path="/"
                       exact={true}
                       component={HomePageComponent}/>

                <Route
                    path="/login"
                    exact={true}
                    component={LogInComponent}
                />

                <Route path="/signup"
                       exact={true}
                       render={(props) =>
                           <SignUpComponent
                               {...props}
                           />
                       }/>

                <Route path={["/course-manager",
                    "/course-manager/table",
                    "/course-manager/table/panel"]}
                       exact={true}
                       component={CourseManagerContainer}/>

                <Route path="/course-manager/admin"
                       exact={true}
                       render={(props) =>
                           <AdminComponent
                               {...props}
                           />
                       }/>

                <Route path="/course-manager/course/:courseId"
                       exact={true}
                       render={(props) =>
                           <CoursePageComponent
                               {...props}
                               courseId={props.match.params.courseId}
                           />
                       }/>

                <Route path="/course-manager/course/:courseId/topic/:topicId"
                       exact={true}
                       render={(props) =>
                           <CoursePageComponent
                               {...props}
                               courseId={props.match.params.courseId}
                               topicId={props.match.params.topicId}
                           />
                       }/>

            </Router>
            </Provider>
        )
    }


}

export default HomePageContainer

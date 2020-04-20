import React from "react";
import {BrowserRouter as Router, Link, Route, useHistory} from "react-router-dom";
import './HomePage.style.client.css';
import LogInComponent from "../../components/LogIn/LogInComponent";
import SignUpComponent from "../../components/SignUp/SignUpComponent";
import CourseManagerContainer from "../CourseManager/CourseManagerContainer";
import CoursePageComponent from "../../components/CoursePage/CoursePageComponent";
import HomePageComponent from "../../components/HomePageComponent";
import AdminComponent from "../../components/Admin/AdminComponent";
import AwaitValidationComponent from "../../components/Admin/awaitValidationComponent";
import ProfileComponent from "../../components/Profile/ProfileComponent";
import {combineReducers, createStore} from "redux";
import coursesReducer from "../../reducers/courseReducer";
import topicsReducer from "../../reducers/topicReducer";
import discussionReducer from "../../reducers/discussionReducer";
import userReducer from "../../reducers/userReducer";
import {Provider} from "react-redux";
import EventsSearchComponent from "../../components/Events/EventsSearchComponent";
import EventDetailsComponent from "../../components/Events/EventsDetailsComponent";
import PostEventComponent from "../../components/Events/PostEventComponent";
import eventsReducer from "../../reducers/eventsReducer";


const rootReducer = combineReducers({
    courses: coursesReducer,
    topics: topicsReducer,
    discussions: discussionReducer,
    user: userReducer,
    events: eventsReducer
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


                <Route path="/await"
                       exact={true}
                       render={(props) =>
                           <AwaitValidationComponent
                               {...props}
                           />
                       }/>
                <Route path="/profile"
                       exact={true}
                       render={(props) =>
                           <ProfileComponent
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


                <Route
                    path={`/course-manager/course/:courseId/topic/event/:eventId`}
                    exact={true}
                    component={EventDetailsComponent}/>

                <Route
                    path={`/course-manager/course/:courseId/postEvent`}
                    exact={true}
                    render={(props) =>
                        <PostEventComponent
                            {...props}
                            courseId={props.match.params.courseId}
                        />
                    }/>
            </Router>
            </Provider>
        )
    }


}

export default HomePageContainer

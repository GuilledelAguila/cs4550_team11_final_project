import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import './HomePage.style.client.css';
import LogInComponent from "../../components/LogIn/LogInComponent";
import SignUpComponent from "../../components/SignUp/SignUpComponent";
import StudentOrProfessorComponent from "../../components/SignUp/StuendtOrProfessorComponent";
import SignUpProfessorComponent from "../../components/SignUp/SignUpProfessorComponent";
import CourseManagerContainer from "../CourseManager/CourseManagerContainer";
import ConfirmEmailComponent from "../../components/SignUp/ConfirmEmailComponent";
import CoursePageComponent from "../../components/CoursePage/CoursePageComponent";
import HomePageComponent from "../../components/HomePageComponent";

class HomePageContainer extends React.Component {

    render() {
        return(
            <Router>
                <Route path="/"
                       exact={true}
                       render={(props) =>
                            <HomePageComponent
                                {...props}
                            />
                       }/>

                <Route path="/login"
                       exact={true}
                       render={(props) =>
                           <LogInComponent
                               {...props}
                           />
                       }/>
                <Route path="/signup"
                       exact={true}
                       render={(props) =>
                           <StudentOrProfessorComponent
                               {...props}
                           />
                       }/>
                <Route path="/signup/professor"
                       exact={true}
                       render={(props) =>
                           <SignUpProfessorComponent
                               {...props}
                           />
                       }/>
                <Route path="/signup/form"
                       exact={true}
                       render={(props) =>
                            <SignUpComponent
                                {...props}
                            />
                       }
                       />

                <Route path="/signup/confirmemail"
                       exact={true}
                       render={(props) =>
                           <ConfirmEmailComponent
                               {...props}
                           />
                       }/>

                <Route path={["/course-manager",
                    "/course-manager/table",
                    "/course-manager/table/panel"]}
                       exact={true}
                       render={(props) =>
                           <CourseManagerContainer
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
        )
    }


}

export default HomePageContainer

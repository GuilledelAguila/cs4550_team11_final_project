import React from "react";
import "./SignUp.style.client.css"
import {Link} from "react-router-dom";

const StudentOrProfessorComponent = (props) =>
        <React.Fragment>
            <div className="signup-page">
            <div className="container-signup">
                <h2>I am a...</h2>
                <div>
                    <div>
                        <Link to="/signup/professor">
                            <button className="btn btn-block btn-outline-danger btn-signup">
                                Professor
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/signup/form">
                            <button className="btn btn-block btn-outline-danger btn-signup">
                                Student
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>


export default StudentOrProfessorComponent

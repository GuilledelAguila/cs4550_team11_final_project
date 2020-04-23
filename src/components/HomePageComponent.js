import {Link} from "react-router-dom";
import React from "react";
import {setUser} from "../actions/userActions";
import {connect} from "react-redux";
import {logout} from "../services/UserService";
import '../containers/HomePage/HomePage.style.client.css'

class HomePageComponent extends React.Component {

    logout = () =>
        logout()
            .then(status => this.props.setUser())


    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <a className="navbar-brand" href="#">Husky-Info</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Help</a>
                            </li>
                        </ul>
                        <span className="navbar-text">

                        {
                            this.props.user &&
                            <Link to="/">
                                <button
                                    className="btn btn-outline-danger nav-item float-right"
                                    type="button"
                                    onClick={this.logout}>
                                    Log Out
                                </button>
                            </Link>
                        }
                        {
                            !this.props.user &&
                                <React.Fragment>
                                    <Link to="/login">
                                        <button
                                            className="btn btn-outline-danger nav-item float-right" type="button">
                                            Log In
                                        </button>
                                    </Link>
                                    <Link to="/signup">
                                        <button className="btn btn-outline-danger" type="button">
                                            Sign Up
                                        </button>
                                    </Link>
                                </React.Fragment>
                        }
                    </span>
                    </div>
                </nav>
                <div className="hv-100 justify-content-center align-items-center container-home">
                    <h1>Welcome to Husky-Info</h1>
                    {
                        this.props.user &&
                        <h1>{this.props.user.name}</h1>
                    }
                    <div className="container">
                        <h6>
                            Students at Northeastern choose courses based on what their advisors recommend to them.
                        </h6>
                        <h6>
                            So there is a huge gap of misinformation between what advisors know and the real experience of students taking that class.
                        </h6>
                        <h6>
                           Teachers at Northeastern don't have a very dynamic way of communicating with students that are considering taking their class.
                        </h6>
                        <br></br>
                        <h3>
                            Husky Info is the solution
                        </h3>
                        <h3>
                            Go ahead an check it out!
                        </h3>
                    </div>
                </div>

            </div>
        )
    }
}


const stateToPropertyMapper = (state) => {
    return {
        user: state.user.user
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
(HomePageComponent)

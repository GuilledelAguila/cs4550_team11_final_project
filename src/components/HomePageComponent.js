import {Link} from "react-router-dom";
import React from "react";

const HomePageComponent = () =>
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
                           <Link to="/login">
                               <button className="btn btn-outline-danger nav-item float-right" type="button">Log In</button>
                           </Link>
                           <Link to="/signup">
                               <button className="btn btn-outline-danger" type="button">Sign Up
                           </button>
                           </Link>
                           </span>
            </div>
        </nav>
        <div className="hv-100 justify-content-center align-items-center">
            <h1>Welcome to Husky-Info</h1>
        </div>

    </div>

export default HomePageComponent

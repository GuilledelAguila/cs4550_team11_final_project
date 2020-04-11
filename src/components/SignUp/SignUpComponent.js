import React from "react";
import "./SignUp.style.client.css"
import {Link} from "react-router-dom";
import {register} from "../../services/UserService";

export default class SignUpComponent extends React.Component{

    state = {
        name: '',
        lastName: '',
        password:'',
        verifyPassword: '',
        email: '',
    }

    register = (user) => {
        if (this.state.verifyPassword === this.state.password){
            register(user)
                .then(user => console.log(user))
            this.props.history.push("/course-manager")
        } else {
            alert("Passwords don't match")
        }

    }

    render() {
        return(
            <React.Fragment>
                <div className="signup-page">
                    <h1 className="white">Sign Up</h1>
                    <form className="container-login2">
                        <div className="form-group row">
                            <label htmlFor="nameFld" className="col-sm-2 col-form-label">
                                Name </label>
                            <div className="col-sm-10 ">
                                <input
                                    value={this.state.name}
                                    onChange={(e) => this.setState({
                                        name: e.target.value
                                    })}
                                    className="form-control wbdv-field wbdv-name"
                                    id="nameFld"
                                    placeholder="Introduce your name"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="lastNameFld" className="col-sm-2 col-form-label">
                                Last Name </label>
                            <div className="col-sm-10">
                                <input
                                    value={this.state.lastName}
                                    onChange={(e) => this.setState({
                                        lastName: e.target.value
                                    })}

                                    className="form-control wbdv-field wbdv-lastname"
                                    id="lastNameFld"
                                    placeholder="Introduce your last name"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="emailFld" className="col-sm-2 col-form-label">
                                Email </label>
                            <div className="col-sm-10">
                                <input
                                    value={this.state.email}
                                    onChange={(e) => this.setState({
                                        email: e.target.value
                                    })}
                                    className="form-control wbdv-field wbdv-email"
                                    id="lastNameFld"
                                    placeholder="Introduce your husky email"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="passwordFld" className="col-sm-2 col-form-label">
                                Password </label>
                            <div className="col-sm-10">
                                <input
                                    value={this.state.password}
                                    onChange={(e) => this.setState({
                                        password: e.target.value
                                    })}
                                    type="password" className="form-control wbdv-field wbdv-password"
                                    id="passwordFld"
                                    placeholder="Introduce password"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="verifyPasswordFld" className="col-sm-2 col-form-label">
                                Verify</label>
                            <div className="col-sm-10">
                                <input
                                    value={this.state.verifyPassword}
                                    onChange={(e) => this.setState({
                                        verifyPassword: e.target.value
                                    })}
                                    type="password" className="form-control wbdv-field wbdv-password-verify"
                                    id="verifyPasswordFld"
                                    placeholder="Introduce password again"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">

                                    <button
                                        onClick={() => this.register(this.state)}
                                        id="registerBtn"
                                        className="btn btn-outline-danger btn-block">Create Account
                                    </button>

                            </div>
                        </div>
                    </form>


                </div>
            </React.Fragment>
        )
    }
}




import React from "react";
import "./LogIn.style.client.css";
import {login} from "../../services/UserService";


export default class LogInComponent extends React.Component {

    state = {
        name: '',
        password:'',
        login:'FALSE'
    }

    login = (user) =>
        login(user)
            .then(currentUser => {
                if(currentUser.id) this.props.history.push('/course-manager')
                else alert("Incorrect password or name")
            })


    render() {
        return (
            <React.Fragment>
                <div className="login-page">
                    <h1 className="h1-login">Welcome</h1>
                    <div className="container-login">
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">
                                Username </label>
                            <div className="col-sm-10 ">
                                <input
                                    value={this.state.name}
                                    onChange={(e) => this.setState({
                                        name: e.target.value
                                    })}
                                    className="form-control wbdv-field wbdv-username"
                                    id="username"
                                    placeholder="Introduce name"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">
                                Password </label>
                            <div className="col-sm-10">
                                <input
                                    value={this.state.password}
                                    onChange={(e) => this.setState({
                                        password: e.target.value
                                    })}
                                    type="password" className="form-control wbdv-field wbdv-password"
                                    id="password"
                                    placeholder="Introduce password"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">

                                    <button
                                        onClick={() => this.login(this.state)}
                                        className="btn btn-outline-danger btn-block wbdv-login">Log in</button>
                            </div>
                        </div>
                    </div>


                </div>
            </React.Fragment>

        )
    }


}


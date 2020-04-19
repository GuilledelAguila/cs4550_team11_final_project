import React from "react";
import {Link} from "react-router-dom";


export default class EventsDetailsComponent extends React.Component {

    componentDidMount() {
        let eventID = this.props.match.params.eventID;
        fetch(`/api/searchbyid?id=${eventID}`)
            .then(response => response.json())
            .then(result => this.setState({
                event: result,
                images: result.images,
            }))
    }

    state = {
        event: {},
        images: {}

    }

    render() {
        return(
            <div>
                <div className="container-fluid">
                    <h1>
                        <Link to={`/course-manager/course/${this.props.match.params.courseId}/topic/events`}>
                            <button className="btn btn-primary h1 float-left">Back</button>
                        </Link>
                        Event Details:
                    </h1>
                </div>
                <div className="container">

                    <ul className="list-group">
                        <li className="list-group-item background-brown white">
                            <h3>{this.state.event.title}</h3>
                        </li>
                        <li className="list-group-item">Owner: {this.state.event.owner}</li>
                        <li className="list-group-item">Location: {this.state.event.address}</li>
                        <li className="list-group-item">Venue: {this.state.event.venue_name}</li>
                        <a className="list-group-item"
                            href={this.state.event.url}>
                            More Info
                        </a>
                        <li className="list-group-item">Date: {this.state.event.start_time}</li>

                        <li className="list-group-item background-brown white">
                            <h5>Event Description</h5>
                        </li>
                        <li className="list-group-item">
                            {this.state.event.description
                                ?this.state.event.description
                                :"No Description Available"
                            }
                        </li>
                    </ul>
                </div>
                <br/>
            </div>
        )
    }

}

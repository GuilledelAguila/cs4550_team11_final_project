import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {findAllTopics, findTopicsForCourse} from "../../actions/topicActions";
import topicService  from "../../services/TopicService";

class  TopicsComponent extends React.Component {

    componentDidMount() {
        this.props.findTopicsForCourse(this.props.courseId)
    }

    render() {
        return (
            <div className="col-3">
                <div className="overflow-auto">
                    <div className="list-group list-group-flush">
                        <div className="list-group-item">
                            <h4>CONVERSATION TOPICS</h4>
                        </div>
                        <Link to={`/course-manager/course/${this.props.courseId}/topic/events`}
                              className="list-group-item list-group-item-action">
                            Events
                        </Link>
                        {
                            this.props.topics && this.props.topics.topics.map((topic, index) =>
                                <Link to={`/course-manager/course/${this.props.courseId}/topic/${topic.id}`}
                                      className="list-group-item list-group-item-action" key={index}>
                                    {topic.title}
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
        )


    }
}

const stateToPropertyMapper = (state) => {
    return {
        topics: state.topics
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {

        findAllTopics: () =>
            dispatch(findAllTopics()),

        findTopicsForCourse: (courseId) =>
            topicService.findTopicsForCourse(courseId)
                .then(actualTopics => dispatch(findTopicsForCourse(actualTopics)))

    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(TopicsComponent)



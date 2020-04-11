import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {findAllTopics} from "../../actions/topicActions";
class  TopicsComponent extends React.Component {

    componentDidMount() {
        this.props.findAllTopics()
    }

    render() {
        return (
            <div className="col-3">
                <div className="overflow-auto">
                    <div className="list-group list-group-flush">
                        <text className="list-group-item">
                            <h4>CONVERSATION TOPICS</h4>
                        </text>
                        {
                            this.props.topics && this.props.topics.topics.map(topic =>
                                <Link to={`/course-manager/course/${this.props.courseId}/topic/${topic.id}`} className="list-group-item list-group-item-action">
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
            dispatch(findAllTopics())

    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(TopicsComponent)



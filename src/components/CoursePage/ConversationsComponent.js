import React from "react";
import {connect} from "react-redux";
import {
    addComment,
    cancelComment,
    findAllDiscussionsForTopic,
    saveComment,
    updateDiscussion
} from "../../actions/discussionActions";
import discussionService  from "../../services/DiscussionService";

class ConversationsComponent extends React.Component{

    state = {
        body:"",
        title: "",
    }

    componentDidMount() {
        this.props.findDiscussionsForTopic(this.props.topicId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topicId !== this.props.topicId) {
            this.props.findDiscussionsForTopic(this.props.topicId)
        }
    }

    render() {
        return(
            <div className="col-9">
                <div className="list-group">
                    <text className="list-group-item border-0">
                        <h4 className="d-inline">DISCUSSIONS FOR TOPIC</h4>
                        <button type="button" className="btn btn-primary float-right"
                                onClick={() => {
                                    this.props.addingComment()
                                }}
                        >Add Comment</button>
                    </text>
                </div>


                <div className="list-group">
                    {this.props.discussions.adding === 0 &&
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start bg-light">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Comment Title</label>
                                <input type="email" className="form-control"
                                       placeholder="Write your new comment here"
                                       onChange={(e) => {
                                           const newText = String(e.target.value);
                                           this.setState(prevState => ({
                                               title: newText
                                           }))
                                       }
                                       }/>
                            </div>
                            <div className="form-group">
                                <label >Comment Body</label>
                                <textarea className="form-control" placeholder="Write your new comment here"
                                          onChange={(e) => {
                                              const newText = String(e.target.value);
                                              this.setState(prevState => ({
                                                  body: newText
                                              }))
                                          }
                                          }/>
                            </div>
                        </form>
                        <button type="button" className="btn btn-success"
                                onClick={() => {
                                    this.props.saveComment(this.props.topicId, this.state)
                                }}>Save</button>
                        <button type="button" className="btn btn-danger"
                                onClick={this.props.cancelComment}>Cancel</button>
                    </a>
                    }
                    {
                        this.props.discussions.discussions && this.props.discussions.discussions.map(discussion =>
                            <a href="#"
                               className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1"> {discussion.title}</h5>
                                    <small>Today</small>
                                </div>
                                <p className="mb-1">{discussion.body}</p>
                                {/*<small>By {discussion.user}</small>*/}
                            </a>
                        )
                    }

                </div>
            </div>

        )
    }

}

const stateToPropertyMapper = (state) => {
    return {
        discussions: state.discussions,
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {

        updateDiscussions: (topicId, discussion) =>
            dispatch(updateDiscussion(topicId, discussion)),

        addingComment: () => {
            dispatch(addComment())
        },

        saveComment: (topicId, discussion) => {
            discussionService.createDiscussion(topicId, discussion)
            dispatch(saveComment(discussion))
        },

        cancelComment: () => {
            dispatch(cancelComment())
        },

        findDiscussionsForTopic: (topicId) => {
            discussionService.findDiscussionsForTopic(topicId)
                .then(actualDiscussions => dispatch(findAllDiscussionsForTopic(actualDiscussions)))
        }


    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(ConversationsComponent)
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
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
        comment: {
            body: "",
            title: "",
        },
        users: [{}]
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
                    <div className="list-group-item border-0">
                        <h4 className="d-inline">DISCUSSIONS FOR TOPIC</h4>
                        <button type="button" className="btn btn-primary float-right"
                                onClick={() => {
                                    this.props.addingComment()
                                }}
                        >Add Comment</button>
                    </div>
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
                                               comment: {
                                                   body: prevState.comment.body,
                                                   title: newText
                                               }
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
                                                  comment: {
                                                      title: prevState.comment.title,
                                                      body: newText
                                                  }
                                              }))
                                          }
                                          }/>
                            </div>
                        </form>
                        <button type="button" className="btn btn-success"
                                onClick={() => {
                                    this.props.saveComment(this.props.topicId, this.state.comment)
                                }}>Save</button>
                        <button type="button" className="btn btn-danger"
                                onClick={this.props.cancelComment}>Cancel</button>
                    </a>
                    }
                    {
                        this.props.discussions.discussions && this.props.discussions.discussions.map((discussion, index) =>
                            <a href="#"
                               className="list-group-item list-group-item-action flex-column align-items-start" key={index}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1"> {discussion.title}</h5>
                                    <small>On {discussion && discussion.date.replace(/T/g, " ")}</small>
                                </div>
                                <p className="mb-1">{discussion.body}</p>
                                <Link to={`/profile/${discussion && discussion.user ? discussion.user.id : null}`}>
                                    <small>By {discussion && discussion.user ? discussion.user.name : null}</small>
                                </Link>

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
                .then(discussion => dispatch(saveComment(discussion)))
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

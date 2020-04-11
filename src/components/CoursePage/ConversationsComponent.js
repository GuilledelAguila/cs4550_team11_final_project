import React from "react";

import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {addComment, cancelComment, saveComment, updateDiscussion} from "../../actions/discussionActions";

class ConversationsComponent extends React.Component{

    state = {
        id: "",
        title: "",
        topic:"",
        body:"",
        user:"Anonymus"
    }

    render() {
        return(
            <div className="col-9">
                <div className="list-group">
                    <text className="list-group-item border-0">
                        <h4 className="d-inline">DISCUSSIONS FOR TOPIC</h4>
                        <button type="button" className="btn btn-primary float-right"
                                onClick={() => {
                                    this.setState(prevState => ({
                                        topic: this.props.topicId
                                    }))
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
                                    this.props.saveComment(this.state)
                                }}>
                            Save</button>
                        <button type="button" className="btn btn-danger"
                                onClick={this.props.cancelComment}>Cancel</button>
                    </a>
                    }
                    {
                        this.props.discussions && this.props.discussions.discussions.map(discussion =>
                            discussion.topic === this.props.topicId &&
                            <a href="#"
                               className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1"> {discussion.title}</h5>
                                    <small>Today</small>
                                </div>
                                <p className="mb-1">{discussion.body}</p>
                                <small>By {discussion.user}</small>
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
        saveComment: (discussion) => {
            dispatch(saveComment(discussion))
        },
        cancelComment: () => {
            dispatch(cancelComment())
        }



    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(ConversationsComponent)
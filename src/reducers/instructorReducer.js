import {EDIT_BRIEF_DESCRIPTION, SAVE_BRIEF_DESCRIPTION} from "../actions/instructorActions";

const initialState = {
    editingBriefDescription: false,
    briefDescription: "Please introduce a brief description for the course"
}

const instructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_BRIEF_DESCRIPTION:
            return {
                briefDescription: state.briefDescription,
                editingBriefDescription: true
            }
        case SAVE_BRIEF_DESCRIPTION:
            return {
                briefDescription: action.newDescription,
                editingBriefDescription: false
            }

        default:
            return state
        }
}

export default instructorReducer
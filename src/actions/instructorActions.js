export const EDIT_BRIEF_DESCRIPTION = "EDIT_BRIEF_DESCRIPTION";
export const SAVE_BRIEF_DESCRIPTION = "SAVE_BRIEF_DESCRIPTION";

export const editBriefDescription = ()  => ({
    type: EDIT_BRIEF_DESCRIPTION
})

export const updateBriefDescription = (description) => ({
    type: SAVE_BRIEF_DESCRIPTION,
    newDescription: description
})

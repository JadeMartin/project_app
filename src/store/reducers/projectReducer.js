
const initState = {
    projects: [
        {id: '1', title: 'ProjectA', content: 'project a id = 1'},
        {id: '2', title: 'ProjectB', content: 'project b id = 2'},
        {id: '3', title: 'ProjectC', content: 'project c id = 3'}
    ]
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log("Created Project - ", action.project);
            return state;
        
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
        case 'UPDATE_PROJECT':
            return {
                ...state,
                authError: null
            };
        case 'UPDATE_PROJECT_ERROR':
            return {
                ...state,
                authError: action.err.message
            };
        case 'DELETE_PROJECT':
            return {
                ...state,
                authError: null
            }
        case 'DELETE_PROJECT_ERROR':
            return {
                ...state,
                authError: action.err.message
            };
        default:
            return state;
    }
}

export default projectReducer
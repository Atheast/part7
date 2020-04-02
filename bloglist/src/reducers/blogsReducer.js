import blogServices from '../services/blogs';

const reducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data.sort((a,b) => b.likes - a.likes);
        case 'ADD_BLOG':
            return [...state,action.data];
        case 'LIKE_BLOG':
            return state.map(x => x.id === action.data.id ? action.data : x).sort((a,b) => b.likes - a.likes);
        case 'REMOVE_BLOG':
            return state.filter(x => x.id !== action.data);
        case 'COMMENT':
            return state.map(x => x.id === action.data.id ? action.data : x);
        default: 
            return state;
    };
};

export const initB = () => {
    return async dispatch => {
        const data = await blogServices.renderBlogs();
        dispatch({
            type: 'INIT_BLOGS',
            data
        });
    };
};

export const addB = (blog) => {
    return async dispatch => {
        const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
        const token = loggedUser.token;
        const data = await blogServices.addBlog(token,blog);
        dispatch({
            type: 'ADD_BLOG',
            data: {...data, user: {username: loggedUser.username}}
        });
    };
};

export const likeBlog = (blog) => {
    return async dispatch => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        const token = JSON.parse(loggedUser).token;
        const data = await blogServices.addLike(token,blog);
        dispatch({
            type: 'LIKE_BLOG',
            data
        });
    };
};

export const addC = (id,text) => {
    return async dispatch => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        const token = JSON.parse(loggedUser).token;
        const data = await blogServices.addComment(token,id,text);
        dispatch({
            type: 'COMMENT',
            data
        });
    };
};

export const removeB = (id) => {
    return async dispatch => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        const token = JSON.parse(loggedUser).token;
        await blogServices.removeBlog(token,id);
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        });
    };
};

export default reducer;
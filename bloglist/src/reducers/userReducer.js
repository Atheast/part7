import loginServices from '../services/login';

const reducer = (state = null,action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.data;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
}

export const loginU = (data) => {
    return async dispatch => {
        if(data.token) {
            window.localStorage.setItem('loggedUser',JSON.stringify(data));
            dispatch({
                type: 'LOGIN',
                data 
            });
        } else {
            const res = await loginServices.login(data);
            if(res) {
                window.localStorage.setItem('loggedUser',JSON.stringify(res));
                dispatch({
                    type: 'LOGIN',
                    data: res 
                });
            }
        }
    }
}

export const logoutU = () => {
    return dispatch => {
        window.localStorage.removeItem('loggedUser');

        dispatch({
            type: 'LOGOUT'
        });
    }
}

export default reducer;
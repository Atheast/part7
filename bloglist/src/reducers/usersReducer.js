import {getAll} from '../services/users';

const reducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT_USERS':
            return action.data;
        default:
            return state;
    }
}

export const initU = () => {
    return async dispatch => {
        const res = await getAll();

        dispatch({
            type: 'INIT_USERS',
            data: res
        });
    };
};

export default reducer;
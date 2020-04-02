const reducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_NOTI':
            return action.data;
        default:
            return state;
    }
}

export const setN = (data) => ({
    type: 'SET_NOTI',
    data
});

export const resetN = () => ({
    type: 'SET_NOTI',
    data: null
});

export default reducer;
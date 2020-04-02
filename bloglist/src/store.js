import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogsReducer';
import notifReducer from './reducers/notifReducer';
import usersReducer from './reducers/usersReducer';

const combinedReducers = combineReducers({
    user: userReducer,
    blogs: blogsReducer,
    notif: notifReducer,
    users: usersReducer
});

const store = createStore(combinedReducers,applyMiddleware(thunk));

export default store;
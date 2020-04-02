import React, {useEffect} from 'react';
import NewBlog from './NewBlog';
import Blog from './Blog';
import Users from './Users';
import Navigation from './Navigation';
import {useSelector,useDispatch} from 'react-redux';
import {initB} from '../reducers/blogsReducer';
import {initU} from '../reducers/usersReducer';
import {Route,Switch,useRouteMatch,Link} from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initB());
    dispatch(initU());
  },[dispatch]);

  const matchU = useRouteMatch('/users/:id');
  const user = matchU ? users.find(x => x.id === matchU.params.id) : null;

  const matchB = useRouteMatch('/blogs/:id');
  const blog = matchB ? blogs.find(x => x.id === matchB.params.id) : null; 

  return(
    <div>
      <Navigation />
      <div className='container'>
        <NewMessage />
        <Switch>
          <Route path="/blogs/:id">
            <Blog blog={blog} />
          </Route>
          <Route path="/users/:id">
            <User user={user} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <div className="blogs">
              <h1>Blogs</h1>
              <hr />
              {blogs.map(x => 
                <div key={x.id}>
                  <Link to={`/blogs/${x.id}`}>{x.title} - {x.author}</Link>
                </div>
                )}
              <hr />
              <NewBlog />
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const NewMessage = () => {
  const message = useSelector(state => state.notif);
  if(message) {
    return (
      <h2 className="new">{message}</h2>
    );
  } else {
    return '';
  }
};

const User  = ({user}) => {
  if(!user) {
    return '';
  }
  return (
    <div className='user'>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      {user.blogs.length > 0 ? 
        <ul>
          {user.blogs.map(x => <li key={x.id}>{x.title}</li> )}
        </ul>
        : 'No blogs added'}
    </div>
  )
}

export default Blogs;
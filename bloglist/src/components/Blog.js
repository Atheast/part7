import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {likeBlog,removeB,addC} from '../reducers/blogsReducer';
import {useHistory} from 'react-router-dom';


const Blog = ({blog}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [comment, setComment] = useState('');

  const addLike = async(blog) => {
    const updated = {...blog, likes: blog.likes+1};
    dispatch(likeBlog(updated));
  };

  const removeBlog = async(blog) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
    if(loggedUser.username === blog.user.username) {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(removeB(blog.id));
        history.push('/');
      }
    }
  };

  const addComment = () => {
    dispatch(addC(blog.id,comment));
    setComment('');
  }

  if(!blog) {
    return '';
  }
  return(
    <div className="blog">
      <h2>{blog.title} - {blog.author}</h2>
      <a target='_blank' href={blog.url}>{blog.url}</a>
      <p className="like">
        Likes: {blog.likes}
        <button className="l" onClick={() => addLike(blog)}>Like</button>
      </p>
      <div className='comment'>
        <div>
          {blog.comments.length > 0 ? 
            <ul>
              <h3>Comments</h3>
              {blog.comments.map((x,i) => <li key={i}>{x}</li>)}
            </ul>
            : <h3>No comments found</h3>}
          </div>
          <input value={comment} onChange={({target}) => setComment(target.value)}/>
          <button onClick={addComment}>Comment</button>
      </div>
      <button id="remove" className="cancel" onClick={() => removeBlog(blog)}>Delete</button>
    </div>
  );
};

export default Blog;
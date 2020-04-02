import React, {useState} from 'react';
import Toggable from './Toggable';
import {useDispatch} from 'react-redux';
import {addB} from '../reducers/blogsReducer';
import {setN,resetN} from '../reducers/notifReducer';

const NewBlog = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogRef = React.createRef();

  const addBlog = async(e) => {
    e.preventDefault();
    const blog = {
      title,
      author,
      url
    };

    blogRef.current.toggleVisibility();
    setTitle('');
    setUrl('');
    setAuthor('');
    dispatch(setN(`New blog added - ${blog.title} by ${blog.author}`));
    setTimeout(() => dispatch(resetN()),5000);
    dispatch(addB(blog));
  };

  return(
    <div className="newBlog">
      <Toggable buttonLabel="Add Blog" ref={blogRef}>
        <h2>Add Blog</h2>
        <form onSubmit={(e) => addBlog(e)}>
          <label>Title: </label>
          <input id="title" value={title} onChange={({target}) => setTitle(target.value)} />
          <label>Author: </label>
          <input id="author" value={author} onChange={({target}) => setAuthor(target.value)} />
          <label>Url: </label>
          <input id="url" value={url} onChange={({target}) => setUrl(target.value)} />
          <button id="add">Add blog</button>
        </form>
      </Toggable>
    </div>
  );
};

export default NewBlog;
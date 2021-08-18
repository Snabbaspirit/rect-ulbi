import React, {useState} from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {

  const [post, setPost] = useState({title: '', body: ''});


  const createNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    }
    create(newPost);
    setPost({title: '', body: ''})
  };
    return (
        <form>
        <MyInput
          value={post.title}
          onChange={e => {setPost({...post, title: e.target.value})}}
          type="text"
          placeholder="post title"
        />
        <MyInput
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})}

          type="text"
          placeholder="post body"
        />
        <MyButton onClick={createNewPost}>Create post</MyButton>
      </form>
    );
}
 
export default PostForm;
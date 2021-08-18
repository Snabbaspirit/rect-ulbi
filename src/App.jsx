import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript", body: "description" },
    { id: 2, title: "Javascript 2", body: "description" },
    { id: 3, title: "Javascript 3", body: "description" },
  ]);

  const createPost = (newPost) => {
     setPosts([...posts, newPost]);
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <PostList posts={posts} title={"1st list"} />
    </div>
  );
}

export default App;

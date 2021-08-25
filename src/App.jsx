import React, { useEffect, useState } from "react";
import PostService from "./API/PostService";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import Loader from "./components/UI/Loader/Loader";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import useFetching from "./hooks/useFetching";

import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  })

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((el) => el.id !== post.id));
  };

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{ marginTop: 20 }} onClick={() => setModal(true)}>
        Create Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "20px" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Error ${postError}</h1>}
      {isPostsLoading ? (
        <div style={{display: "flex", justifyContent: "center"}}>
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={"1st list"}
        />
      )}
    </div>
  );
}

export default App;

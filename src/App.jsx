import React, { useState, useMemo } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";

import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript", body: "description" },
    { id: 1, title: "1333", body: "description" },
    { id: 1, title: "923", body: "1344" },
    { id: 1, title: "Asdf", body: "4gfdg" },
    { id: 1, title: "54yu", body: "wer" },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const sortedPosts = useMemo(() => {
    console.log("getSelectedPosts invoked");
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSelectedPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      const titleUp = post.title.toUpperCase();
      const queryUp = filter.query.toUpperCase();
      return titleUp.includes(queryUp);
    });
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  };

  const removePost = (post) => {
    setPosts(posts.filter((el) => el.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{marginTop: 20}} onClick={() => setModal(true)}> Create User</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "20px" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        remove={removePost}
        posts={sortedAndSelectedPosts}
        title={"1st list"}
      />
    </div>
  );
}

export default App;

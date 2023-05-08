import * as React from "react";
import { useEffect, useState } from "react";
import PostLoadingComponent from "../Components/postLoading";
import Posts from "../Components/jobPosts";
import axiosInstance from "../utils/axios";

//

export default function StickyFooter() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    axiosInstance.get().then((res) => {
      const allPosts = res.data;
      setAppState({ loading: false, posts: allPosts });
      console.log(res.data);
    });
  }, [setAppState]);
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>All Job Posts</h1>
      <div>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />

      </div>
      
    </div>
  );
}

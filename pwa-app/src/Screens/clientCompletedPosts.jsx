import * as React from "react";
import { useEffect, useState } from "react";
import PostLoadingComponent from "../Components/Loaders/postLoading";
import Posts from "../Components/Job Posts/jobPosts";
import axiosInstance from "../utils/axios";

//

export default function StickyFooter() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    axiosInstance.get("jobs/verified/").then((res) => {
      const allPosts = res.data;
      setAppState({ loading: false, posts: allPosts });
      console.log(res.data);
    });
  }, [setAppState]);
  return (
    <div className="App">
      <h1>Jobs completed from me</h1>
      <div>
        <PostLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
    </div>
  );
}

import * as React from "react";
import { useEffect, useState,useContext } from "react";
import PostLoadingComponent from "../Components/postLoading";
import Posts from "../Components/jobPosts";
import axiosInstance from "../utils/axios";
import { TransactionContext } from "../context/TransactionContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//

export default function StickyFooter() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  const {
    connectWallet,
    currentAccount,

  } = useContext(TransactionContext);
  let template;

  if (!currentAccount) {
    template = (
      <Button variant="contained" onClick={connectWallet}>
        Connect Wallet
      </Button>
    );
  } else {
    template = <Typography>Wallet is connected</Typography>;
  }

  useEffect(() => {
    axiosInstance.get().then((res) => {
      const allPosts = res.data;
      setAppState({ loading: false, posts: allPosts });
      console.log(res.data);
    });
  }, [setAppState]);
  return (
    <div className="App">
      {template}
      
      <h1 style={{ textAlign: "center" }}>All Job Posts</h1>
      <div>
        <PostLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
    </div>
  );
}

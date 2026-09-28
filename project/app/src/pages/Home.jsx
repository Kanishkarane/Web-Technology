import { useEffect, useState } from "react";
import PostSummary from "../components/PostSummary.jsx";
import { API } from "../api.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => setError("Could not load posts."));
  }, []);

  return (
    <>
      <h2>All Posts</h2>
      {error && <p className="error">{error}</p>}
      {!error && posts.length === 0 && <p>No posts yet. Create one!</p>}
      {posts.map((p) => <PostSummary key={p._id} post={p} />)}
    </>
  );
}

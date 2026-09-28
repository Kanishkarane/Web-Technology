import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api.js";

export default function Archive() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => setError("Could not load posts."));
  }, []);

  async function onDelete(id) {
    if (!window.confirm("Delete this post?")) return;
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (res.ok) setPosts(posts.filter((p) => p._id !== id));
  }

  return (
    <>
      <h2>Archive</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead><tr><th>Title</th><th>Author</th><th>Date</th><th></th></tr></thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p._id}>
              <td><Link to={`/post/${p._id}`}>{p.title}</Link></td>
              <td>{p.author}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              <td><button className="danger" onClick={() => onDelete(p._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

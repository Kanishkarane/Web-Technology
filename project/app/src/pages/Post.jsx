import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api.js";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [form, setForm] = useState(null); // non-null while editing
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found.");
        return res.json();
      })
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [id]);

  async function onSave(e) {
    e.preventDefault();
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setPost({ ...post, ...form });
      setForm(null);
    } else {
      setError("Failed to update post.");
    }
  }

  async function onDelete() {
    if (!window.confirm("Delete this post?")) return;
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (res.ok) navigate("/");
    else setError("Failed to delete post.");
  }

  if (error) return <p className="error">{error}</p>;
  if (!post) return <p>Loading...</p>;

  if (form) {
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    return (
      <>
        <h2>Edit Post</h2>
        <form onSubmit={onSave} className="card">
          <input name="title" value={form.title} onChange={onChange} required />
          <input name="author" value={form.author} onChange={onChange} required />
          <textarea name="body" rows="8" value={form.body} onChange={onChange} required />
          <div className="actions">
            <button type="submit">Save</button>
            <button type="button" className="secondary" onClick={() => setForm(null)}>Cancel</button>
          </div>
        </form>
      </>
    );
  }

  return (
    <div className="card">
      <h2>{post.title}</h2>
      <p className="meta">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
      <p style={{ whiteSpace: "pre-wrap" }}>{post.body}</p>
      <div className="actions">
        <button onClick={() => setForm({ title: post.title, author: post.author, body: post.body })}>Edit</button>
        <button className="danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api.js";

export default function Create() {
  const [form, setForm] = useState({ title: "", author: "", body: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      const created = await res.json();
      navigate(`/post/${created._id}`);
    } catch (err) {
      setError(err.message || "Failed to create post.");
    }
  }

  return (
    <>
      <h2>New Post</h2>
      <form onSubmit={onSubmit} className="card">
        <input name="title" placeholder="Title" value={form.title} onChange={onChange} required />
        <input name="author" placeholder="Author" value={form.author} onChange={onChange} required />
        <textarea name="body" rows="8" placeholder="Write your post..." value={form.body} onChange={onChange} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Post</button>
      </form>
    </>
  );
}

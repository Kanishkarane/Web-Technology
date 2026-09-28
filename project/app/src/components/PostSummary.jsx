import { Link } from "react-router-dom";

export default function PostSummary({ post }) {
  const preview = post.body.length > 140 ? post.body.slice(0, 140) + "..." : post.body;
  return (
    <div className="card">
      <h3><Link to={`/post/${post._id}`}>{post.title}</Link></h3>
      <p className="meta">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
      <p>{preview}</p>
    </div>
  );
}

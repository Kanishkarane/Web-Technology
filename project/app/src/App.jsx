import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Post from "./pages/Post.jsx";
import Archive from "./pages/Archive.jsx";

export default function App() {
  return (
    <>
      <nav>
        <span className="brand">Blog Manager</span>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/create">New Post</NavLink>
        <NavLink to="/archive">Archive</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </main>
    </>
  );
}

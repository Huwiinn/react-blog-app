import "./App.css";
import { Route, Routes, Navigate, Link } from "react-router-dom";

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Post List</Link>
        </li>
        <li>
          <Link to="/posts:id">Post Detail</Link>
        </li>
        <li>
          <Link to="/posts/new">Post New</Link>
        </li>
        <li>
          <Link to="/posts/edit/:id">Post Edit</Link>
        </li>
        <li>
          <Link to="/posts/profile">My Profile</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<h1>Main Home Page</h1>} />
        <Route path="/posts" element={<h1>Post Page</h1>} />
        <Route path="/posts:id" element={<h1>Post Detail Page</h1>} />
        <Route path="/posts/new" element={<h1>Post New Page</h1>} />
        <Route path="/posts/edit/:id" element={<h1>Post Edit Page</h1>} />
        <Route path="/posts/profile" element={<h1>Profile Page</h1>} />
        {/* 지정되어있지 않은 Route로 진입할 때, 강제로 Home으로 Navigate 시킴 */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;

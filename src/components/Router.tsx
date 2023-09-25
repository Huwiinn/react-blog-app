// 모든 Route 경로를 모아둔 파일입니다.
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import PostList from "./pages/posts";
import PostDetail from "./pages/posts/detail";
import PostNew from "./pages/posts/new";
import PostEdit from "./pages/posts/edit";
import Profile from "./pages/profile";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Header from "./Header";
import Footer from "./Footer";

export default function Router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/new" element={<PostNew />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
        <Route path="/profile" element={<Profile />} />
        {/* 지정되어있지 않은 Route로 진입할 때, 강제로 Home으로 Navigate 시킴 */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

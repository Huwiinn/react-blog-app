import { ThemeContext } from "context/ThemeContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { isDark, toggleDarkMode } = useContext(ThemeContext);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Hwui's Blog
      </Link>
      <div>
        <button type="button" onClick={toggleDarkMode}>
          {isDark ? "Light" : "Dark"}
        </button>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </div>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import { useContext, useEffect } from "react";
import ThemeContext from "context/ThemeContext";

const Footer = () => {
  const { theme, toggleDarkMode } = useContext(ThemeContext);

  console.log("theme : ", theme);

  return (
    <footer>
      <div className="footer_navigate_wrap">
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </div>
      <div className="theme_btn_wrap">
        <button className="theme_btn" type="button" onClick={toggleDarkMode}>
          {theme === "light" ? <BsSun /> : <BsMoon />}
        </button>
      </div>
    </footer>
  );
};

export default Footer;

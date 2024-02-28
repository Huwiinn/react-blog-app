import AuthContext from "context/AuthContext";
import { ThemeContext } from "context/ThemeContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

export interface PostProps {
  id?: string;
  content: string;
  createdAt: string;
  email: string;
  summary: string;
  title: string;
}

type TabType = "all" | "my" | "recent";

const PostList = ({ hasNavigation = true }: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));

    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };

      // setPosts((prevPosts) => [...prevPosts, dataObj]); 해당 에러가 왜 발생하는지 알아볼 것. 아래는 에러를 해결한 코드임.
      console.log("dataObj : ", dataObj);
      setPosts((prevPosts) => [...prevPosts, dataObj as PostProps]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            onClick={() => setActiveTab("all")}
            role="presentation"
            className={activeTab === "all" ? "post__navigation--active" : ""}>
            전체
          </div>
          <div
            onClick={() => setActiveTab("my")}
            role="presentation"
            className={activeTab === "my" ? "post__navigation--active" : ""}>
            나의 글
          </div>
        </div>
      )}
      <article className="post__list">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={post.id} className="post__box">
              <Link to={`/posts/${post.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post.email}</div>
                  <div className="post__date">{post.createdAt}</div>
                </div>
                <div className="post__title">{post.title}</div>
              </Link>
              <div className="post__text">{post.summary}</div>
              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div className="post__delete">삭제</div>
                  <div className="post__edit">
                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </article>
    </>
  );
};

export default PostList;

import AuthContext from "context/AuthContext";
import { ThemeContext } from "context/ThemeContext";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
  updatedAt?: string;
  uid?: string;
}

type TabType = "all" | "my" | "recent";

const PostList = ({ hasNavigation = true }: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));
    setPosts([]); // posts 배열을 초기화하고 아래 코드에서 새로운 데이터배열로 업데이트함.
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

  const handleDelete = async (PostId: string) => {
    const confirm = window.confirm("정말 게시글을 삭제하시겠습니까?");
    if (confirm && PostId) {
      await deleteDoc(doc(db, "posts", PostId));
      toast.success("게시글 삭제 완료!!", { position: "top-right" });
      getPosts(); // 변경된 게시글을 다시 로드
    }
  };

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
                  <div
                    className="post__delete"
                    role="presentation"
                    onClick={() => handleDelete(post?.id as string)}>
                    삭제
                  </div>
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

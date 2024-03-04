import AuthContext from "context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Native",
];

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
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
  category?: CategoryType;
}

type TabType = "all" | "my";

const PostList = ({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    setPosts([]); // posts 배열을 초기화하고 아래 코드에서 새로운 데이터배열로 업데이트함.

    let postsRef = collection(db, "posts");
    let postsQuery;

    // console.log("user.uid : ", user?.uid);

    if (activeTab === "my" && user) {
      // 나의 글만 필터링
      console.log("나의글만 불러옴");
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "asc")
      );
    } else if (activeTab === "all") {
      // 모든 글 보여주기
      console.log("모든 글 불러옴");
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    } else {
      // 카테고리 글 보여주기
      console.log("카테고리별 글 불러옴");
      postsQuery = query(
        postsRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "asc")
      );
    }

    const datas = await getDocs(postsQuery);

    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      // setPosts((prevPosts) => [...prevPosts, dataObj]); 해당 에러가 왜 발생하는지 알아볼 것. 아래는 에러를 해결한 코드임.
      setPosts((prevPosts) => [...prevPosts, dataObj as PostProps]);
    });
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);

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
          {CATEGORIES.map((category) => (
            <div
              key={category}
              onClick={() => setActiveTab(category)}
              role="presentation"
              className={
                activeTab === category ? "post__navigation--active" : ""
              }>
              {category}
            </div>
          ))}
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

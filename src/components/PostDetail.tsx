import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loader from "./Loader";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import Comments from "./Comments";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);

  const { user } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  console.log("params : ", params);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      // console.log("docSnap : ", docSnap.data());

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (params?.id) {
      getPost(params.id);
    }
  }, [params?.id]);

  const handleDelete = async (PostId: string) => {
    const confirm = window.confirm("정말 게시글을 삭제하시겠습니까?");
    if (confirm && PostId) {
      await deleteDoc(doc(db, "posts", PostId));
      toast.success("게시글 삭제 완료!!", { position: "top-right" });
      navigate("/");
    }
  };

  return (
    <>
      <div className="post__detail">
        {post ? (
          <>
            <div className="post__box">
              <div className="post__title">{post.title}</div>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">{post.email}</div>
                <div className="post__date">{post.createdAt}</div>
              </div>
              <div className="post__utils-box">
                <div className="post__category">
                  카테고리 : {post?.category ? post?.category : "자유주제"}
                </div>

                {user?.email === post?.email ? (
                  <>
                    <div
                      className="post__delete"
                      role="presentation"
                      onClick={() => handleDelete(post.id as string)}>
                      삭제
                    </div>
                    <div className="post__edit" role="presentation">
                      <Link to={`/posts/edit/${params.id}`}>수정</Link>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="post__text post__text--pre-wrap">
                {post.content}
              </div>
            </div>

            <Comments post={post} getPost={getPost} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default PostDetail;

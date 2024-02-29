import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loader from "./Loader";
import AuthContext from "context/AuthContext";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);

  const { user } = useContext(AuthContext);
  const params = useParams();

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

  console.log("post : ", post);

  const handleDelete = () => {
    alert("Delete!!");
  };

  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__title">{post.title}</div>
            <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__author-name">{post.email}</div>
              <div className="post__date">{post.createdAt}</div>
            </div>
            {user?.email === post?.email ? (
              <div className="post__utils-box">
                <div
                  className="post__delete"
                  role="presentation"
                  onClick={handleDelete}>
                  삭제
                </div>
                <div className="post__edit" role="presentation">
                  <Link to={`/posts/edit/${params.id}`}>수정</Link>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="post__text post__text--pre-wrap">
              {post.content}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default PostDetail;

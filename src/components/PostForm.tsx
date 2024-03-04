import React, { useContext, useEffect, useState } from "react";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CATEGORIES, CategoryType, PostProps } from "./PostList";

const PostForm = (props: any) => {
  const [post, setPost] = useState<PostProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [postCategory, setPostCategory] = useState<CategoryType | string>(
    "Frontend"
  );
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const params = useParams();

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

  // 게시글 수정시, 해당 게시글의 데이터를 불러오기
  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
      setPostCategory(post?.category as string);
    }
  }, [post]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // post 데이터가 있으면 수정으로 간주
      if (post && post.id) {
        const postUpdateRef = doc(db, "posts", post?.id);

        await updateDoc(postUpdateRef, {
          title,
          summary,
          content,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }), // 현재 날짜와 시간을 표기
          uid: user?.uid,
          category: postCategory,
        });

        toast.success("게시글 수정 완료!", { position: "top-right" });

        navigate(`/posts/${post.id}`);
      } else {
        // firestore로 데이터 생성
        await addDoc(collection(db, "posts"), {
          title,
          summary,
          content,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }), // 현재 날짜와 시간을 표기
          email: user?.email,
          uid: user?.uid,
          category: postCategory,
        });

        toast.success("게시글 작성 완료!", { position: "top-right" });

        console.log("postCategory : ", postCategory);

        navigate("/");

        setTitle("");
        setSummary("");
        setContent("");
      }
    } catch (e) {
      console.log("e : ", e);
      toast.error("게시글 작성 실패 ㅠㅠ", { position: "top-right" });
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "category") {
      setPostCategory(value as CategoryType);
    }

    if (name === "summary") {
      setSummary(value);
    }

    if (name === "content") {
      setContent(value);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form_block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={onChange}
          value={title}
        />
      </div>
      <div className="form_block">
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          required
          onChange={onChange}
          defaultValue={postCategory}>
          {CATEGORIES.map((category, idx) => (
            <option key={`category_key_${idx}`} value={category}>
              {category}
            </option>
          ))}
          {/* <option value="frontend">FrontEnd</option>
          <option value="backend">Backend</option>
          <option value="web">Web</option>
          <option value="native">Native</option> */}
        </select>
      </div>
      <div className="form_block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          onChange={onChange}
          value={summary}
        />
      </div>
      <div className="form_block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          onChange={onChange}
          value={content}
        />
      </div>
      <div className="form_block">
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className="form_btn--submit"
        />
      </div>
    </form>
  );
};

export default PostForm;

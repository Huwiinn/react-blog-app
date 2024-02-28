import React, { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostForm = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // firestoe로 데이터 생성
      const postDoc = await addDoc(collection(db, "posts"), {
        title,
        summary,
        content,
        createdAt: new Date()?.toLocaleDateString(), // 현재 날짜와 시간을 표기
        email: user?.email,
      });

      toast.success("게시글 작성 완료!", { position: "top-right" });

      navigate("/");

      setTitle("");
      setSummary("");
      setContent("");
    } catch (e) {
      console.log("e : ", e);
      toast.error("게시글 작성 실패 ㅠㅠ", { position: "top-right" });
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "summary") {
      setSummary(value);
    }

    if (name === "content") {
      setContent(value);
    }
  };

  console.log(title, summary, content);
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
        <input type="submit" value="제출" className="form_btn--submit" />
      </div>
    </form>
  );
};

export default PostForm;

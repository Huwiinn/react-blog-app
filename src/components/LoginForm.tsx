import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { app } from "firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("로그인 성공!", { position: "top-right" });

      setEmail("");
      setPassword("");
    } catch (error: any) {
      toast.error(error?.message, { position: "top-right" });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      // console.log("!value : ", !value);
      setEmail(value);

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!value?.match(emailRegex)) {
        // value?.match(emailRegex)가 일치하지 않으면(!)
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상이여야 합니다.");
      } else {
        setError("");
      }
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="form form-lg">
      <h1 className="form__title">로그인</h1>
      <div className="form_block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="아이디를 입력하세요."
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form_block">
        <label htmlFor="summary">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="비밀번호룰 입력하세요."
          onChange={(e) => onChange(e)}
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form_block">
        <b>계정이 없으신가요?</b>
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form_block">
        <input
          type="submit"
          value="로그인"
          className="form_btn--submit login__btn"
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
};

export default LoginForm;

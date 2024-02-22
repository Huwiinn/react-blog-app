import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <form action="/post" method="POST" className="form form-lg">
      <h1 className="form__title">로그인</h1>
      <div className="form_block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="아이디를 입력하세요."
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
        />
      </div>
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
        />
      </div>
    </form>
  );
};

export default LoginForm;
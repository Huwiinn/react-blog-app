import React from "react";
import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <form action="/post" method="POST" className="form form-lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form_block">
        <label htmlFor="email">이메일</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div className="form_block">
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" required />
      </div>
      <div className="form_block">
        <label htmlFor="password__check">비밀번호 확인</label>
        <input
          type="password"
          name="password__check"
          id="password__check"
          required
        />
      </div>
      <div className="form_block">
        <b>이미 계정이 있으신가요?</b>
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form_block">
        <input
          type="submit"
          value="회원가입"
          className="form_btn--submit login__btn"
        />
      </div>
    </form>
  );
};

export default SignupForm;

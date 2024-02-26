import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const navigate = useNavigate();

  // form 전송시에는 FormEvent
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("회원가입 완료!", { position: "top-right" });

      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch (error: any) {
      toast.error(error?.message, { position: "top-right" });
    }
  };

  // ✅내코드
  // input값 검증을 위한 type을 지정 : React.ChangeEvent<HTMLInputElement>를 적용해주어야 한다.
  // const onCheckValidationEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const onCheckValidationPassword = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setPassword(e.target.value);
  // };

  // const onCheckValidationPasswordConfirm = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setPasswordConfirm(e.target.value);
  // };

  // ⭐️강의 코드
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }, // 오호 이렇게 객체 분해 할당으로 e의 target에 접근하여 input의 name 속성과 value에 접근가능
    } = e;
    // ⬆️ 응용하여 하나의 함수에서 input validation을 수행가능.

    if (name === "email") {
      setEmail(value);

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!value?.match(emailRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상이어야 합니다.");
      } else if (passwordConfirm?.length > 0 && value !== password) {
        setError(
          "비밀번호가 비밀번호 확인깂이 다릅니다. 다시 한 번 확인해주세요."
        );
      } else {
        setError("");
      }
    }

    if (name === "password__check") {
      setPasswordConfirm(value);

      if (password !== value) {
        setError(
          "비밀번호가 비밀번호 확인깂이 다릅니다. 다시 한 번 확인해주세요."
        );
      } else {
        setError("");
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="form form-lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form_block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="form_block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="form_block">
        <label htmlFor="password__check">비밀번호 확인</label>
        <input
          type="password"
          name="password__check"
          id="password__check"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
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
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
};

export default SignupForm;

import "./App.css";
import { useState, useEffect } from "react";
import Router from "./components/Router";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/Loader";

function App() {
  const auth = getAuth(app);

  // auth를 체크하기 전에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  // !! 연산자로 쉽게 boolean값으로 추론할 수 있도록 해준다.
  const [isAuth, setIsAuth] = useState<boolean>(!!auth?.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setInit(true);
    });
  }, [auth]);

  // console.log(auth.currentUser);

  return (
    <>
      <ToastContainer />
      {init ? <Router auth={isAuth} /> : <Loader />}
    </>
  );
}

export default App;

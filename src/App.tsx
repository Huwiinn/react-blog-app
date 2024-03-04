import "./App.css";
import { useState, useEffect, useContext } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./components/Router";
import Loader from "components/Loader";
import ThemeContext from "context/ThemeContext";

function App() {
  const context = useContext(ThemeContext);

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

  return (
    <div className={context.theme === "light" ? "white" : "dark"}>
      <ToastContainer />
      {init ? <Router auth={isAuth} /> : <Loader />}
    </div>
  );
}

export default App;

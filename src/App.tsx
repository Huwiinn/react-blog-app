import "./App.css";
import { useState } from "react";
import Router from "./components/Router";
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = getAuth(app);
  // !! 연산자로 쉽게 boolean값으로 추론할 수 있도록 해준다.
  const [isAuth, setIsAuth] = useState<boolean>(!!auth?.currentUser);

  return (
    <>
      <ToastContainer />
      <Router auth={isAuth} />;
    </>
  );
}

export default App;

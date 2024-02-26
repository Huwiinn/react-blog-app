import { Link } from "react-router-dom";
import PostList from "components/PostList";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

const Profile = () => {
  const auth = getAuth(app);

  const onSignOut = async () => {
    const auth = getAuth(app);

    try {
      await signOut(auth);
      toast.success("로그아웃 되었습니다.", { position: "top-right" });
    } catch (e) {
      toast.error("로그아웃에 실패했습니다.", { position: "top-right" });
    }
  };

  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__info">
          <div className="profile__image" />
          <div>
            <div className="profile__email">{auth?.currentUser?.email}</div>
            <div className="profile__name">
              {auth?.currentUser?.displayName || "유저1"}
            </div>
          </div>
        </div>
        <div>
          <Link to="/" className="profile__logout" onClick={onSignOut}>
            로그아웃
          </Link>
        </div>
      </div>
      <PostList hasNavigation={false} />
    </div>
  );
};

export default Profile;

import { Link } from "react-router-dom";
import PostList from "components/PostList";

const Profile = () => {
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__info">
          <div className="profile__image" />
          <div>
            <div className="profile__email">test@test.com</div>
            <div className="profile__name">유저이름</div>
          </div>
        </div>
        <div>
          <Link to="/" className="profile__logout">
            로그아웃
          </Link>
        </div>
      </div>
      <PostList hasNavigation={false} />
    </div>
  );
};

export default Profile;

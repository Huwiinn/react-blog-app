import PostList from "components/PostList";
import React from "react";
import Profile from "../../Profile";

const ProfilePage = () => {
  return (
    <>
      <Profile />;
      <PostList hasNavigation={false} defaultTab="my" />
    </>
  );
};

export default ProfilePage;

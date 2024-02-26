import Carousel from "components/Carousel";
import PostList from "components/PostList";

const Home = () => {
  return (
    <>
      <Carousel />
      <PostList hasNavigation={true} />;
    </>
  );
};

export default Home;

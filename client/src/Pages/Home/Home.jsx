// import { Link } from "react-router-dom";
// import News from "./News/News";
import Banner from "./Banner/Banner";
import NewsBd from "../NewsBd/NewsBd";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      {/* <News></News> */}
      <NewsBd></NewsBd>
    </div>
  );
};

export default Home;

// import { Link } from "react-router-dom";
// import News from "./News/News";
import Banner from "./Banner/Banner";
import NewsBd from "../NewsBd/NewsBd";
import { setDocumentTitle } from "../../Components/UseDocumentTitle/UseDocumentTitle";

const Home = () => {
  setDocumentTitle("অক্ষর");
  return (
    <div>
      <Banner></Banner>
      {/* <News></News> */}
      <NewsBd></NewsBd>
    </div>
  );
};

export default Home;

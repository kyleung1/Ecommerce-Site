// import { Navigation, Pagination, Scrollbar, A11y , SwiperCore} from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import HomeSlide from "../components/HomeSlide";

const Home = () => {
  const title = "Poke Mart";

  return (
    <div className="home">
      <h2>New Arrivals</h2>
      <HomeSlide />
      <div className="homeboxTitle">
        <h2>Trainer Essentials!</h2>
        <h2>Gifts for your Professor!</h2>
      </div>
      <div className="homeboxes">
        <div className="homebox1">box 1</div>
        <div className="homebox2">box 2</div>
      </div>
    </div>
  );
};

export default Home;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeSlide = () => {
  return (
    <div className="slide-container">
      <Swiper
        className="home-slide"
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        speed={500}
        centeredSlides={true}
      >
        <SwiperSlide className="swiper-slide">
          <a href="/products/Poke Ball">
            <img src={require("../images/Poke Ball.webp")}></img>
          </a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <a href="/products/Great Ball">
            <img src={require("../images/Great Ball.webp")}></img>
          </a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <a href="/products/Ultra Ball">
            <img src={require("../images/Ultra Ball.webp")}></img>
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlide;

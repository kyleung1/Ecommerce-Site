// import { Navigation, Pagination, Scrollbar, A11y , SwiperCore} from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import HomeSlide from "../components/HomeSlide";
import { useItemContext } from "../hooks/useItemContext";
import { useEffect } from "react";

const Home = () => {
  const title = "Poke Mart";
  const { itemsState, itemsDispatch } = useItemContext();
  useEffect(() => {
    if (itemsState.items.length == 0) {
      const fetchItems = async () => {
        const response = await fetch(
          process.env.REACT_APP_PKMART_BACKEND + "api/item"
        );
        const json = await response.json();

        if (response.ok) {
          // setItems(json)
          itemsDispatch({ type: "SET_ITEMS", payload: json });
        }
      };

      fetchItems();
    }
  }, []);

  console.log(itemsState);
  return (
    <div className="home">
      <h2>New Arrivals</h2>
      <HomeSlide />
      <div className="homeboxTitle">
        <h2>Trainer Essentials!</h2>
        <h2>Gifts for your Professor!</h2>
      </div>
      <div className="homeboxes">
        <div className="homebox1">
          <a href="/products/Super Potion">
            <img
              src={require("../images/Super Potion.webp")}
              className="itemHover"
            ></img>
          </a>
          <a href="/products/Potion">
            <img
              src={require("../images/Potion.webp")}
              className="itemHover"
            ></img>
          </a>
        </div>
        <div className="homebox2">
          <div className="gridItem">
            <a href="/products/Poke Ball">
              <img
                src={require("../images/Poke Ball.webp")}
                className="itemHover"
              ></img>
            </a>
          </div>
          <div className="gridItem">
            <a href="/products/Great Ball">
              <img
                src={require("../images/Great Ball.webp")}
                className="itemHover"
              ></img>
            </a>
          </div>
          <div className="gridItem">
            <a href="/products/Ultra Ball">
              <img
                src={require("../images/Ultra Ball.webp")}
                className="itemHover"
              ></img>
            </a>
          </div>
          <div className="gridItem">
            <img
              src={require("../images/t-pose.png")}
              className="itemHover"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

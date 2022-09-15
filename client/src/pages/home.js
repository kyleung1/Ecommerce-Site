import { Navigation, Pagination, Scrollbar, A11y , SwiperCore} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import HomeSlide from '../components/HomeSlide.js'

const Home = () => {
    const title = "Poke Mart";

    return (
        <div className = "home">
            <h2>New Arrivals</h2>
            <HomeSlide/>
        </div>
    );
}

export default Home;
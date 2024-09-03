import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LandingCarousel from "../components/Carousel";
import {
  getPromotions,
  promotionSelector,
} from "../features/promotions/promotionSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const landingCarouselOptions = {
  loop: true,
  center: true,
  items: 1,
  autoplay: true,
  dots: false,
  autoplayTimeout: 3500,
  smartSpeed: 5000,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
};

const Home = () => {
  const { loading, promotions, error } = useSelector(promotionSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);

  return (
    <div>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {promotions && promotions.length !== 0 && (
        <LandingCarousel data={promotions} options={landingCarouselOptions} />
      )}
    </div>
  );
};

export default Home;

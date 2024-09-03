import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import {
  getPromotions,
  promotionSelector,
} from "../features/promotions/promotionSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

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
        <Carousel promotions={promotions} />
      )}
    </div>
  );
};

export default Home;

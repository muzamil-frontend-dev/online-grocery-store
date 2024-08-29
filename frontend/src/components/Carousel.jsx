import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const promotions = [
  {
    name: "Rekob Ramya",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
    address: "USA",
    img: "/images/landing-carousel/1.jpg",
  },
  {
    name: "Brandon Savage",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
    address: "USA",
    img: "/images/landing-carousel/2.jpg",
  },
  {
    name: "Steve Burns",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
    address: "USA",
    img: "/images/landing-carousel/3.jpg",
  },
  {
    name: "Kevin Canlas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
    address: "USA",
    img: "/images/landing-carousel/4.jpg",
  },
];

const Carousel = () => {
  //Owl Carousel Settings
  const options = {
    loop: true,
    center: true,
    items: 1,
    margin: 0,
    autoplay: true,
    dots: false,
    autoplayTimeout: 4500,
    smartSpeed: 1000,
    nav: false,
  };
  return (
    <OwlCarousel
      className="owl-carousel owl-theme landing-carousel"
      {...options}
    >
      {promotions.length === 0 ? (
        <div class="item"></div>
      ) : (
        // <div class="item">
        //   Need to Show default layout until promotions data is fully loaded.
        // </div>
        promotions.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.img} alt="" />
            </div>
          );
        })
      )}
    </OwlCarousel>
  );
};

export default Carousel;

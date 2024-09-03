import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// const promotions = [
//   {
//     name: "Rekob Ramya",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
//     address: "USA",
//     img: "/images/landing-carousel/1.jpg",
//   },
//   {
//     name: "Brandon Savage",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
//     address: "USA",
//     img: "/images/landing-carousel/2.jpg",
//   },
//   {
//     name: "Steve Burns",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
//     address: "USA",
//     img: "/images/landing-carousel/3.jpg",
//   },
//   {
//     name: "Kevin Canlas",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
//     address: "USA",
//     img: "/images/landing-carousel/4.jpg",
//   },
// ];

const Carousel = ({ data, options }) => {
  //Owl Carousel Settings
  // const options = {
  //   loop: true,
  //   center: true,
  //   items: 1,
  //   margin: 0,
  //   autoplay: true,
  //   dots: false,
  //   autoplayTimeout: 3500,
  //   smartSpeed: 5000,
  //   nav: false,
  //   animateIn: options.animateIn || false,
  //   animateOut: options.effect || false,
  // };
  return (
    <OwlCarousel
      className="owl-carousel owl-theme landing-carousel"
      {...options}
    >
      {data.map((item, index) => (
        <div key={index}>
          <img src={item.imageURL} alt="" />
        </div>
      ))}
    </OwlCarousel>
  );
};

export default Carousel;

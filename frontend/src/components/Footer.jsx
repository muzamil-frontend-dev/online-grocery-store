import React from "react";

const Footer = () => {
  return (
    <footer className="text-center bg-primary p-3 text-light">
      All Right Reserved &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;

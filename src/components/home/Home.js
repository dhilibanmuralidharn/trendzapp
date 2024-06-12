import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";

import "./Home.css";
const Home = () => {
  const navigate = useNavigate();

  const handleToshop = () => {
    navigate("/products");
  };

  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="img-container">
          <img
            src="./asset/funny-illustration.jpg"
            alt="home page"
            className="home-img-ele"
          />
        </div>
        <div>
          <h1 className="home-heading">Clothes That Get You Noticed</h1>
          <p className="home-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <button className="shop-button" onClick={handleToshop}>
            <span>Shop Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";

const Offer = ({ img, title, price, onClick }) => {
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);

  return (
    <div className="offer-card" onClick={onClick}>
      <div className="offer-card-image">
        <img className="offer-image" src={img} alt="" />
      </div>
      <div className="offer-card-text">
        <p className="offer-card-title">{title}</p>
        <p className="offer-card-price">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default Offer;

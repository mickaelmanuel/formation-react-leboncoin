import React from "react";
import { Api } from "../Api";

class OfferPage extends React.Component {
  state = {
    title: "",
    price: 0,
    description: "",
    creatorUsername: ""
  };

  async componentDidMount() {
    const result = await Api.getOffer(this.props.id);

    this.setState({
      title: result.title,
      price: result.price,
      description: result.description,
      creatorUsername: result.creator.account.username
    });
  }

  render() {
    const formattedPrice = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(this.state.price);

    return (
      <div className="content">
        <div className="offer-page">
          <div>
            <div className="offer-page-img-text">
              <div className="offer-page-img" />
              <div className="offer-page-text">
                <h3>{this.state.title}</h3>
                <p className="offer-page-price">{formattedPrice}</p>
              </div>
            </div>
            <h3>Description</h3>
            <p>{this.state.description}</p>
          </div>
          <div className="offer-page-creator">
            <div></div>
            <div>{this.state.creatorUsername}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default OfferPage;

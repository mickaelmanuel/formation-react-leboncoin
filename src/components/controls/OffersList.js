import React from "react";
import List from "./List";
import Offer from "./Offer";
import Pagination from "./Pagination";
import { Api } from "../../Api";

const PAGE_RANGE_DISPLAYED = 15;
const OFFERS_PER_PAGE = 6;

class OffersList extends React.Component {
  state = {
    isLoading: false,
    error: false,
    offers: [],
    offersCount: 0,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    Api.getOffers(this.state.currentPage, OFFERS_PER_PAGE, this.props.query)
      .then(data => {
        this.setState({
          offers: data,
          isLoading: false,
          offersCount: data.count
        });
      })
      .catch(e => this.setState({ isLoading: false, error: true }));
  }

  render() {
    if (this.state.isLoading) {
      return <div className="loading">Loading ... </div>;
    }
    if (this.state.error) {
      return <div className="error">An error occured ... </div>;
    }
    if (this.state.offers.length === 0) {
      return <div className="no-results">No results</div>;
    }

    return (
      <div className="offers">
        {/* <span>Annonces : {this.state.data.count}</span>
    <span>Page : {this.state.currentPage + "/" + totalPages}</span> */}
        <List>
          {this.state.offers.map(offer => {
            return (
              <li key={offer._id}>
                <Offer
                  title={offer.title}
                  price={offer.price}
                  onClick={() => {
                    this.props.history.push(`/offer/${offer._id}`);
                  }}
                />
              </li>
            );
          })}
        </List>
        <Pagination
          totalItemsCount={this.state.offersCount}
          onChange={async e => {}}
          activePage={this.state.currentPage}
          itemsCountPerPage={OFFERS_PER_PAGE}
          pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
        />
      </div>
    );
  }
}

export default OffersList;

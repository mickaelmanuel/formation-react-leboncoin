import React from "react";
import { List } from "./List";
import Offer from "./Offer";
import Pagination from "./Pagination";
import { Api } from "../../Api";
import { useQuery } from "../../App";
import { getFilterKeyValue } from "../../utils";

const PAGE_RANGE_DISPLAYED = 15;
const OFFERS_PER_PAGE = 6;

class OffersList extends React.Component {
  state = {
    isLoading: false,
    error: false,
    offers: [],
    offersCount: 0,
    currentPage: 1,
    query: null
  };

  getFilteredObject(query) {
    let tmpQuery = useQuery(query);

    var filter = {
      sort: tmpQuery.has("sort") ? tmpQuery.get("sort") : "",
      priceMin: tmpQuery.has("priceMin")
        ? parseInt(tmpQuery.get("priceMin"), 10)
        : NaN,
      priceMax: tmpQuery.has("priceMax")
        ? parseInt(tmpQuery.get("priceMax"))
        : NaN,
      title: tmpQuery.has("title") ? tmpQuery.get("title") : ""
    };
    return filter;
  }

  loadDatas(query) {
    this.setState({ isLoading: true });

    let filterObjFromQuery = this.getFilteredObject(query);
    let tabFilter = getFilterKeyValue(filterObjFromQuery);

    Api.getOffers(this.state.currentPage, OFFERS_PER_PAGE, tabFilter)
      .then(data => {
        this.setState({
          offers: data.offers,
          isLoading: false,
          offersCount: data.count
        });
      })
      .catch(e => this.setState({ isLoading: false, error: true }));
  }

  componentDidMount() {
    this.loadDatas(this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ query: this.props.query });
      return this.loadDatas(this.props.query);
    }
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
          onChange={async e => {
            this.setState({ currentPage: e });
            this.loadDatas(this.props.query);
          }}
          activePage={this.state.currentPage}
          itemsCountPerPage={OFFERS_PER_PAGE}
          pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
        />
      </div>
    );
  }
}

export default OffersList;

import React from "react";
import { List } from "../components/controls/List";
import { Api, generateFilterParameters } from "../Api";
import Pagination from "../components/controls/Pagination";
import Offer from "../components/controls/Offer";
import { Input } from "../components/controls/Input";
import { Button } from "../components/controls/Button";
import { useQuery } from "../App";
import { Filter } from "../components/controls/Filter";

const PAGE_RANGE_DISPLAYED = 15;

function getFilterKeyValue(filter) {
  let tmpFilter = [];
  if (filter.sort !== "") {
    tmpFilter.push({ key: "sort", value: filter.sort });
  }
  if (filter.priceMin !== null) {
    tmpFilter.push({ key: "priceMin", value: filter.priceMin });
  }
  if (filter.priceMax !== null) {
    tmpFilter.push({ key: "priceMax", value: filter.priceMax });
  }
  if (filter.title !== "") {
    tmpFilter.push({ key: "title", value: filter.title });
  }
  return tmpFilter;
}

export class Home extends React.Component {
  constructor(props) {
    super(props);
    let filter = this.getFilteredObject(props.query);

    this.state = {
      data: null,
      isLoading: false,
      currentPage: props.currentPage !== undefined ? props.currentPage : 1,
      offersPerPage: 6,
      filter: filter
    };
  }

  getFilteredObject(query) {
    let tmpQuery = useQuery(query);

    var filter = {
      sort: tmpQuery.has("sort") ? tmpQuery.get("sort") : "",
      priceMin: tmpQuery.has("priceMin")
        ? parseInt(tmpQuery.get("priceMin"), 10)
        : null,
      priceMax: tmpQuery.has("priceMax")
        ? parseInt(tmpQuery.get("priceMax"))
        : null,
      title: tmpQuery.has("title") ? tmpQuery.get("title") : ""
    };
    return filter;
  }

  async componentDidMount() {
    await this.loadOffers(
      this.state.currentPage,
      this.state.offersPerPage,
      this.state.filter
    );
  }

  async loadOffers(currentPage, offersPerPage, filter) {
    this.setState({ isLoading: true });
    const skip = currentPage * offersPerPage - offersPerPage;

    let tmpFilter = getFilterKeyValue(filter);

    const datas = await Api.getOffers(skip, offersPerPage, tmpFilter);

    this.setState({ data: datas, isLoading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      //Perform some operation here
      console.log(prevProps);
      console.log(this.props);

      await this.loadOffers(
        this.state.currentPage,
        this.state.offersPerPage,
        this.getFilteredObject(this.props.query)
      );
    }
  }

  render() {
    if (this.state.data === null) {
      return <p>No data</p>;
    }
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }

    // const totalPages = Math.ceil(
    //   this.state.data.count / this.state.offersPerPage
    // );

    return (
      <div>
        <p>{this.state.filter.title}</p>
        <Filter
          title={this.state.filter.title}
          priceMin={this.state.filter.priceMin}
          priceMax={this.state.filter.priceMax}
          sort={this.state.filter.sort}
          onSearch={e => {
            let params = "";
            let tab = getFilterKeyValue(e);
            params = generateFilterParameters(tab, params);

            this.props.history.push({
              pathname: "/",
              search: params
            });
          }}
        />

        <div className="content">
          <div className="offers">
            {/* <span>Annonces : {this.state.data.count}</span>
        <span>Page : {this.state.currentPage + "/" + totalPages}</span> */}
            <List>
              {this.state.data.offers.map(offer => {
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
              totalItemsCount={this.state.data.count}
              onChange={async e => {
                await this.loadOffers(e);
                this.setState({ currentPage: e });
              }}
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.offersPerPage}
              pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
            />
          </div>
        </div>
      </div>
    );
  }
}

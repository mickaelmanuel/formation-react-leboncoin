import React from "react";
import { useQuery } from "../App";
import { Filter } from "../components/controls/Filter";
import OffersList from "../components/controls/OffersList";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    let filter = this.getFilteredObject(props.query);

    this.state = {
      filter: filter
    };
  }

  getFilteredObject(query) {
    let tmpQuery = useQuery(query);

    var filter = {
      sort: tmpQuery.has("sort") ? tmpQuery.get("sort") : "",
      priceMin: tmpQuery.has("priceMin")
        ? parseInt(tmpQuery.get("priceMin"), 10)
        : "",
      priceMax: tmpQuery.has("priceMax")
        ? parseInt(tmpQuery.get("priceMax"))
        : "",
      title: tmpQuery.has("title") ? tmpQuery.get("title") : ""
    };

    console.log(filter);
    return filter;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ filter: this.getFilteredObject(this.props.query) });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Filter
          title={this.state.filter.title}
          priceMin={this.state.filter.priceMin}
          priceMax={this.state.filter.priceMax}
          sort={this.state.filter.sort}
          history={this.props.history}
        />

        <div className="content">
          <OffersList query={this.props.query} history={this.props.history} />
        </div>
      </React.Fragment>
    );
  }
}

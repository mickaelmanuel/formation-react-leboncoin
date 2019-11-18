import React from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { getFilterKeyValue, generateFilterParameters } from "../../utils";

export class Filter extends React.Component {
  state = {
    sort: this.props.sort,
    priceMin: this.props.priceMin,
    priceMax: this.props.priceMax,
    title: this.props.title
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.sort !== this.props.sort ||
      prevProps.priceMin !== this.props.priceMin ||
      prevProps.priceMax !== this.props.priceMax ||
      prevProps.title !== this.props.title
    ) {
      this.setState({
        sort: this.props.sort,
        priceMin: this.props.priceMin,
        priceMax: this.props.priceMax,
        title: this.props.title
      });
    }
  }

  render() {
    return (
      <div className="filter">
        <Input
          name="title"
          placeholder="Que recherchez-vous ?"
          value={this.state.title}
          onTextChange={e => {
            this.setState({ title: e.target.value });
          }}
        />

        <div className="filter-price">
          <Input
            type="number"
            placeholder="Prix min"
            name="priceMin"
            min={0}
            value={this.state.priceMin}
            onTextChange={e => {
              this.setState({ priceMin: parseInt(e.target.value, 10) });
            }}
          />
          <Input
            name="priceMax"
            type="number"
            placeholder="Prix max"
            min={0}
            value={this.state.priceMax}
            onTextChange={e => {
              this.setState({ priceMax: parseInt(e.target.value, 10) });
            }}
          />
        </div>
        <Button
          onClick={() => {
            let params = "";
            let tab = getFilterKeyValue(this.state);
            params = generateFilterParameters(tab, params);

            this.props.history.push({
              pathname: "/",
              search: params
            });
          }}
        >
          Rechercher
        </Button>

        <select
          value={this.state.sort}
          onChange={e => {
            this.setState({ sort: e.target.value });
          }}
        >
          <option value="">Selectionner un tri</option>
          <option value="price-desc">Tri : Prix décroissants</option>
          <option value="price-asc">Tri : Prix croissants</option>
          <option value="date-desc">Tri : Plus récentes</option>
          <option value="date-asc">Tri : Plus anciennes</option>
        </select>
      </div>
    );
  }
}

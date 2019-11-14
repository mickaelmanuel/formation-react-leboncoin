import React from "react";
import { Input } from "./Input";
import { Button } from "./Button";

export class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: this.props.sort,
      priceMin: this.props.priceMin,
      priceMax: this.props.priceMax,
      title: this.props.title
    };
  }

  render() {
    return (
      <div className="filter">
        <Input
          name="title"
          placeholder="Que recherchez-vous ?"
          text={this.state.title}
          onTextChange={e => {
            this.setState({ title: e.target.value });
          }}
        />

        <div className="filter-price">
          <Input
            type="number"
            placeholder="Prix min"
            name="priceMin"
            onTextChange={e => {
              this.setState({ priceMin: parseInt(e.target.value, 10) });
            }}
          />
          <Input
            name="priceMax"
            type="number"
            placeholder="Prix max"
            onTextChange={e => {
              this.setState({ priceMax: parseInt(e.target.value, 10) });
            }}
          />
        </div>
        <Button
          onClick={() => {
            this.props.onSearch(this.state);
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

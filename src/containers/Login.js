import React from "react";
import { generateFilterParameters } from "../Api";
import { useQuery } from "../App";
import { Filter } from "../components/controls/Filter";
import OffersList from "../components/controls/OffersList";
import { getFilterKeyValue } from "../utils";
import { Input } from "../components/controls/Input";
import { Button } from "../components/controls/Button";
import { Api, Axios } from "../Api";

export class Login extends React.Component {
  state = {
    isLoading: false,
    error: { value: false, text: "" },
    email: "",
    password: ""
  };

  validateDatas() {
    if (this.state.email === "") return false;
    if (this.state.password === "") return false;
    return true;
  }

  render() {
    return (
      <div className="content">
        <Input
          name="email"
          type="text"
          placeholder="email"
          value={this.state.email}
          onTextChange={e => {
            this.setState({ email: e.target.value });
          }}
        />

        <Input
          name="password"
          placeholder="password"
          type="password"
          value={this.state.password}
          onTextChange={e => {
            this.setState({ password: e.target.value });
          }}
        />

        <Button
          onClick={async () => {
            if (!this.validateDatas()) {
              this.setState({
                error: { value: true, text: "Données invalides" }
              });
              return;
            }

            this.setState({ isLoading: true });

            await Axios.post("/user/log_in", {
              email: this.state.email,
              password: this.state.password
            })
              .then(result => {
                this.setState({ isLoading: false });
                this.props.setUser(
                  result.data._id,
                  result.data.token,
                  result.data.account.username
                );
                this.props.history.push("/");
              })
              .catch(error => {
                this.setState({
                  isLoading: false,
                  error: { value: true, text: error.response.data.error }
                });
              });
          }}
        >
          Se connecter
        </Button>
        {this.state.error.value ? <p>{this.state.error.text}</p> : null}
        {this.state.loading ? <p>Loading...</p> : null}
      </div>
    );
  }
}

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Home } from "./containers/Home";
import { Publish } from "./containers/Publish";
import { SignUp } from "./containers/SignUp";
import { Login } from "./containers/Login";
import { IconLeBonCoin } from "./components/Icons/Icons";
import OfferPage from "./containers/OfferPage";
import Cookies from "js-cookie";

export function useQuery(queryText) {
  return new URLSearchParams(queryText);
}

export default class App extends React.Component {
  state = {
    user: {
      id: Cookies.get("id") || "",
      token: Cookies.get("token") || "",
      username: Cookies.get("username") || ""
    }
  };

  isvalidUser = () => {
    const value =
      this.state.user.id !== "" &&
      this.state.user.token !== "" &&
      this.state.user.username !== "";
    console.log("isvalidUser", value, this.state.user);
    return value;
  };

  setUser = (id, token, username) => {
    Cookies.set("id", id);
    Cookies.set("token", token);
    Cookies.set("username", username);
    this.setState({ user: { id: id, token: token, username: username } });
  };

  unsetUser = () => {
    Cookies.remove("id");
    Cookies.remove("token");
    Cookies.remove("username");
    this.setState({ user: { id: "", token: "", username: "" } });
  };

  render() {
    return (
      <Router>
        <div>
          <header>
            <div className="header-center">
              <div className="logo">
                <Link to="/">
                  <IconLeBonCoin />
                </Link>
              </div>
              <div className="nav">
                {!this.isvalidUser() ? (
                  <React.Fragment>
                    <Link to="/signup">Créer un compte</Link>
                    <Link to="/login">Se connecter</Link>
                  </React.Fragment>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => {
                      this.unsetUser();
                    }}
                  >
                    Se deconnecter
                  </Link>
                )}
              </div>
            </div>
          </header>

          <div>
            <Switch>
              <Route
                path="/offer/:id"
                render={routeParams => (
                  <OfferPage
                    history={routeParams.history}
                    id={routeParams.match.params.id}
                  />
                )}
              />

              <Route
                path="/signup"
                render={routeParams =>
                  this.isvalidUser() ? (
                    <Redirect to="/" />
                  ) : (
                    <SignUp
                      history={routeParams.history}
                      setUser={this.setUser}
                    />
                  )
                }
              />

              <Route
                path="/login"
                render={routeParams =>
                  this.isvalidUser() ? (
                    <Redirect to="/" />
                  ) : (
                    <Login
                      history={routeParams.history}
                      setUser={this.setUser}
                    />
                  )
                }
              />

              <Route
                path="/publish"
                render={routeParams =>
                  !this.isvalidUser() ? (
                    <Redirect to="/login" />
                  ) : (
                    <Publish
                      user={this.state.user}
                      history={routeParams.history}
                    />
                  )
                }
              />

              <Route
                path="/:page"
                render={routeParams => (
                  <Home
                    history={routeParams.history}
                    currentPage={routeParams.match.params.page}
                    query={routeParams.location.search}
                  />
                )}
              />

              <Route
                path="/"
                render={routeParams => (
                  <Home
                    history={routeParams.history}
                    query={routeParams.location.search}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect
} from "react-router-dom";
import { Home } from "./containers/Home";
import { IconLeBonCoin } from "./components/Icons/Icons";
import OfferPage from "./containers/OfferPage";

export function useQuery(queryText) {
  return new URLSearchParams(queryText);
}

export default class App extends React.Component {
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

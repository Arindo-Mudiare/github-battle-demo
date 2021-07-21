import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "./contexts/Theme";
import Nav from "./component/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./component/Loading";

// Dynamic Imports
const Popular = React.lazy(() => import("./component/Popular"));
const Battle = React.lazy(() => import("./component/Battle"));
const Results = React.lazy(() => import("./component/Results"));
class App extends React.Component {
  state = {
    theme: "light",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light",
      }));
    },
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" component={Popular} />
                  <Route exact path="/battle" component={Battle} />
                  <Route path="/battle/results" component={Results} />
                  <Route render={() => <h1>404 Page not found!!!</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

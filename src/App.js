import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Answer from "./pages/Answer/Answer";
import Total from "./pages/Total/Total";
import Score from "./pages/Score/Score";

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path="/answer" component={Answer} />
        <Route path="/score" component={Score} />
        <Route path="/total" component={Total} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;

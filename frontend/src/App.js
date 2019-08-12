import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Days from "./components/pages/Days";
import DaysAdd from "./components/pages/DaysAdd"
import Index from "./components/pages/Index";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/days" component={Days} />
        <Route exact path="/days/add" component={DaysAdd} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

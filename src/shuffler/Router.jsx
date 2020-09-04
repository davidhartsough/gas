import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./Layout";
import Shuffle from "./Shuffle";
import Artists from "./Artists";

export default () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/">
          <Shuffle />
        </Route>
        <Route path="/artists/:genre/:page">
          <Artists />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  </BrowserRouter>
);

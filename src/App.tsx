import React from 'react';
import { MainPage } from './pages/main';
import { Route, Switch, } from "react-router-dom";
import CreatePage from './pages/create';
import { IJot } from './models/jot';
import LoginPage from './pages/login';
import JotPage from './pages/jotPage';


export interface ILocationState {
  jot?: IJot;
}

export default function App() {
  return <Switch>
    <Route path="/j/:jid">
      <JotPage />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/create" >
      <CreatePage />
    </Route>
    <Route path="/">
      <MainPage />
    </Route>
  </Switch>


}

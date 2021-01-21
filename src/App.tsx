import React, { Children, useState } from 'react';
import './App.css';
import { MainPage } from './pages/main';
import { Route, Switch, } from "react-router-dom";
import CreatePage from './pages/create';
import { Jot } from './models/jot';
import LoginPage from './pages/login';
import JotPage from './pages/jotPage';


export interface ILocationState {
  jot?: Jot;
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

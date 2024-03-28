// Ваш файл index.js или App.js (где настраивается роутинг)
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import CreateBoardPage from './CreateBoardPage';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/create-board" component={CreateBoardPage} />
      {/* Другие маршруты, если они есть */}
    </Switch>
  </Router>,
  document.getElementById('root')
);

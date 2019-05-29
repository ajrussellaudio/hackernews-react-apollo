import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Header from './Header';

const App = () => (
  <Router>
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route path="/create" component={CreateLink} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;

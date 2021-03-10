import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Form from './components/Form';
import NestedForm from './components/NestedForm';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/new">
            <NestedForm />
          </Route>
          <Route path="/">
            <Form />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

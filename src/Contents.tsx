import * as React from 'react';
import { Route } from 'react-router-dom';

class Contents extends React.Component {
  public render() {

    const test = () => <h1>Test</h1>;

    return (
      <Route path="/articles" component={test} />
    )
  }
}

export default Contents;

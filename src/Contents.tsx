import * as React from 'react';
import { Route } from 'react-router-dom';

class Contents extends React.Component {
  public render() {

    return (
      <Route path="/articles">
        {(props: { match: boolean }) =>
          props.match && <h1>Test</h1>
        }
      </Route>
    )
  }
}

export default Contents;

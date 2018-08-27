import * as React from 'react';
import { Route } from 'react-router-dom';
import { config, Spring } from 'react-spring';

class Contents extends React.Component {
  public render() {

    return (
      <Route path="/articles">
        {(props: { match: boolean }) =>
          <Spring
            config={config.gentle}
            from={{ opacity: props.match ? 0 : 1 }}
            to={{ opacity: props.match ? 1 : 0 }}>
            {styles => 
              <h1 style={styles}>Test</h1>
            }
          </Spring>
        }
      </Route>
    )
  }
}

export default Contents;

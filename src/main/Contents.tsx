import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';

interface Props {
  t: (s: string) => string
}

class Contents extends React.Component<Props, object> {
  public render() {


    return (
      <Route path="/" exact={true}>
      {() =>
        <div className="contents">
          <Link to="/">TOP</Link>
        </div>
      }
      </Route>
    )
  }
}

export default translate()(Contents);

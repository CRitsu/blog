import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';

interface Props {
  t: (s: string) => string
}

class Banner extends React.Component<Props, object> {
  public render() {


    return (
      <Route path="/" exact={true}>
      {() =>
        <div className="banner">
          <Link to="/">Banner</Link>
        </div>
      }
      </Route>
    )
  }
}

export default translate()(Banner);
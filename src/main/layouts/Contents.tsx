import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';

interface Props {
  t: (s: string) => string
}

class Contents extends React.Component<Props, object> {
  public render() {

    const con = () => (
        <div className="contents">
          <Link to="/">TOP</Link>
        </div>

    )

    return (
      <Route path="/hide" exact={true} component={con} />
    )
  }
}

export default translate()(Contents);

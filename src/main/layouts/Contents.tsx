import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Props {
  t: (s: string) => string
}

class Contents extends React.Component<Props, object> {
  public render() {

    return (
        <div className="contents">
          <Link to="/">TOP</Link>
        </div>
    )
  }
}

export default translate()(Contents);

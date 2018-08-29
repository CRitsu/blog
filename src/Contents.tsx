import * as React from 'react';
import { Link, Route } from 'react-router-dom';

interface Props {
  width: number
}

class Contents extends React.Component<Props, object> {
  public render() {

    const contentWidth = this.props.width;

    let offset: number;

    if (window.innerWidth < 1298) {
      offset = window.innerWidth;
    } else {
      offset = window.innerWidth - contentWidth;
    }

    return (
      <Route path="/" exact={true}>
      {(props: {match: boolean}) =>
        <div className="contents" 
          style={{
            left: props.match ? offset : 0,
            width: props.match ? contentWidth : window.innerWidth
          }}>
          <Link to="/">TOP</Link>
        </div>
      }
      </Route>
    )
  }
}

export default Contents;

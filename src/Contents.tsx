import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { TitleWithoutLink } from './components';

interface Props {
  width: number,
  t: (s: string) => string
}

class Contents extends React.Component<Props, object> {
  public render() {

    const contentWidth = this.props.width;
    const t = this.props.t;

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
          <TitleWithoutLink>{t("Richard's Blog")}</TitleWithoutLink>
        </div>
      }
      </Route>
    )
  }
}

export default translate()(Contents);

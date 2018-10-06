import * as React from 'react';
import { translate } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { ContentsType, Translate } from '../../types';

interface Props extends ContentsType, Translate {
  article: string,
}

class Contents extends React.Component<Props, object> {
  public render() {

    const article = (props: RouteComponentProps<any>) => (
      <div>{props.match.params.articleId}</div>
    )

    return (
      <div className="contents">
        <Route path="/articles/:articleId" component={article} />
      </div>
    )
  }
}

export default translate()(Contents);

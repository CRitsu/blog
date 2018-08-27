import * as React from 'react';
import { Route } from 'react-router-dom';
import { Square, TitleWithLink as Title } from './components';
import { Articles } from './type';
import { formatDate } from './utils';


interface Props {
  lists: Articles[]
}

class Lists extends React.Component<Props, object> {
  public render() {

    const { lists } = this.props;

    // edit list
    const EditedList = (props: {match: boolean}) => (
      <div className={'list-contents ' + (props.match ? '' : 'hide')}>
        {
          lists.map(
            item => (
              <div key={item._id} className="item">
                <Square>{formatDate(item.timestamp)}</Square>
                <div className="item-title">{item.title}</div>
              </div>
            )
          )
        }
      </div>
    )

    return (
      <Route path="/" exact={true}>
        {(props: { match: boolean }) =>
          <div className="lists">
            <Title link="/">Richard's Blog</Title>
            <EditedList match={props.match} />
          </div>
        }
      </Route>
    )
  }
}


export default Lists;

import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { Square } from './components';
import { Articles } from './type';
import { formatDate } from './utils';


interface Props {
  lists: Articles[],
  width: number,
  t: (p: string) => string
}

class Lists extends React.Component<Props, object> {
  public render() {

    const { lists, width, t } = this.props;

    const listWidth = width > 600 ? 600 : width;

    // edit list
    const EditedList = (props: { match: boolean }) => (
      <div className={'list-contents ' + (props.match ? '' : 'hide')}>
        {
          lists.map(
            item => (
              <div key={item._id} className="item">
                <Square className="date">{formatDate(item.timestamp)}</Square>
                <div className="item-title">
                  <Link to={'/articles/' + item._id}>{item.title}</Link>
                </div>
                <Square className="tags" symbol="Tags">
                  {
                    item.tags.map(
                      tag => <div key={tag}><Link className="tag" to="">{tag}</Link></div>
                    )
                  }
                </Square>
              </div>
            )
          )
        }
      </div>
    )

    return (
      <Route path="/" exact={true}>
        {
          (props: { match: boolean }) =>
            <div className="lists-container"
                style={{
                  left: props.match ? 0 : width * -1,
                  width
                }}>
              <div className="lists" style={{width: listWidth}}>
                <div className="header">
                  <input className="search" placeholder={t('Search')} />
                </div>
                <EditedList match={props.match} />
              </div>
            </div>
        }
      </Route>
    )
  }
}


export default translate()(Lists);

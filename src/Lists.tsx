import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { Square } from './components';
import { icons } from './constants';
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

    const listsWidth = width;

    const editedListWidth = width > 600 ? 570 : width -30;

    // edit list
    const EditedList = (props: { match: boolean }) => (
      <div className={'list-contents ' + (props.match ? '' : 'hide')}
        style={{width: editedListWidth}}>
        {
          lists.map(
            item => (
              <div key={item._id} className="item">
                <Square>{formatDate(item.timestamp)}</Square>
                <div className="item-title">
                  <Link to={'/articles/' + item._id}>{item.title}</Link>
                </div>
                <div className="tags">
                  <Square symbol={icons.tags}>{item.tags.map(tag => <Link to="" key={tag}>{tag}</Link>)}</Square>
                </div>
              </div>
            )
          )
        }
      </div>
    )

    return (
      <Route path="/" exact={true}>
        {(props: { match: boolean }) =>
          <div className="lists" 
            style={{
              left: props.match ? 0 : listsWidth * -1,
              width: listsWidth
            }}>
            <div>{t('NEWEST')}<input /></div>
            <EditedList match={props.match} />
          </div>
        }
      </Route>
    )
  }
}


export default translate()(Lists);

import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { LATEST } from '../../constants';
import { Articles } from '../../types';


interface Props {
  lists: Articles[],
  t: (p: string) => string
}

interface State {
  activeTab: number
}

class Lists extends React.Component<Props, State> {

  public state = {
    // 1: latest; 2: categories
    activeTab: LATEST
  }

  public render() {

    const { lists } = this.props;


    // edit list
    const EditedList = (props: { match: boolean }) => (
      <div className={'list-contents ' + (props.match ? '' : 'hide')}>
        {
          lists.map(
            item => (
              <div key={item._id} className="item">
                <div className="item-title">
                  <Link to={'/articles/' + item._id}>{item.title}</Link>
                </div>
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
            <div className="lists">
              <EditedList match={props.match} />
            </div>
        }
      </Route>
    )
  }
}


export default translate()(Lists);

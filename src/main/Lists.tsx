import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { LATEST } from '../constants';
import { Articles } from '../types';


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

    const { lists, t } = this.props;


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
            <div className="lists-container">
                <div className="lists">
                  <div className="header">
                    <div className="sign">Time flies so fast.</div>
                    <div className="sub-bar">
                      <div className="categories">
                      <div className="search">
                        <input className="input" placeholder={t('Search')} />
                      </div>
                    </div>
                  </div>
                  <EditedList match={props.match} />
                </div>
              </div>
            </div>
        }
      </Route>
    )
  }
}


export default translate()(Lists);

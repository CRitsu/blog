import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LATEST } from '../../constants';
import { Articles, Translate } from '../../types';


interface Props extends Translate {
  lists: Articles[]
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
    const EditedList = () => (
      <div className={'list-contents'}>
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
      <div className="lists">
        <EditedList />
      </div>
    )
  }
}


export default translate()(Lists);

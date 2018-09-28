import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LATEST } from '../../constants';
import { Articles, Translate } from '../../types';
import ControlBar from '../accessories/ControlBar';


interface Props extends Translate {
  lists: Articles[]
}

interface ActiveTab {
  activeTab: number
}


/**
 * Create articles list.
 * @param props array of articles
 */
function EditedList(props: { lists: Articles[] }) {
  const lists = props.lists;

  return (
    <div className={'list-contents'}>
      {lists.map(item => (
        <div key={item._id} className="item">
          <div className="item-title">
            <Link to={'/articles/' + item._id}>{item.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}



class Lists extends React.Component<Props, ActiveTab> {

  public state = {
    activeTab: LATEST
  }

  public render() {

    const { lists, t } = this.props;
    const activeTab = this.state.activeTab;

    return (
      <div className="lists">
        <ControlBar t={t} activeTab={activeTab} />
        <EditedList lists={lists} />
      </div>
    )
  }
}


export default translate()(Lists);

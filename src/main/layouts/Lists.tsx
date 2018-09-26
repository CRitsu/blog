import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CATEGORIES, LATEST, TAGS } from '../../constants';
import { Articles, Translate } from '../../types';


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
function EditedList(props: {lists: Articles[]}) {
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

/**
 * Control bar for switch tabs and search.
 * @param props activeTab and t translate function
 */
function ControlBar(props: ActiveTab & Translate) {

  const { activeTab, t } = props;
  // edit active tab's class name
  const applyActive = (name: number) => {
    if (name === activeTab) {
      return 'tabs active';
    } else {
      return 'tabs';
    }
  }

  return (
    <div className="control-bar">
      <div className="tabs">
        <div className={applyActive(LATEST)}>{t('latest')}</div>
        <div className={applyActive(CATEGORIES)}>{t('categories')}</div>
        <div className={applyActive(TAGS)}>{t('tags')}</div>
      </div>
    </div>
  )
}


class Lists extends React.Component<Props, ActiveTab> {

  public state = {
    // 1: latest; 2: categories
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

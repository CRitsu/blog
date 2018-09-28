import * as React from 'react';
import { CATEGORIES, LATEST, TAGS } from '../../constants';
import { Translate } from '../../types';


interface Props extends Translate {
  activeTab: number
}


/**
 * Control bar for switch tabs and search.
 * @param props activeTab and t translate function
 */
class ControlBar extends React.Component<Props> {

  public render() {
    const { activeTab, t } = this.props;
    // edit active tab's class name
    const applyActive = (name: number) => {
      if (name === activeTab) {
        return 'tab active';
      } else {
        return 'tab';
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
}

export default ControlBar;

import * as React from 'react';
import { translate } from 'react-i18next';
import { Block } from '../../components';
import { blogName, github, weibo } from '../../config';
import { MEMO_COLOR, PHOTO_COLOR, TALK_COLOR, TECH_COLOR } from '../../constants/colors';
import { Translate } from '../../types';
import NaughtyArrow from '../accessories/NaughtyArrow';


interface State {
  home: string;
}


class Banner extends React.Component<Translate, State> {

  public render() {

    // import t function for translate
    const { t } = this.props;

    return (
      <div className="banner">

        <div className="main-banner">

          <div className="logo">{blogName}</div>

          <div className="motto">
            <div className="motto-1st-line">{t('mottoThe1stLine')}</div>
            <div className="motto-2nd-line yellow-dark2">{t('mottoThe2ndLine')}</div>
            <div className="motto-3rd-line">{t('mottoThe3rdLine')}</div>
          </div>

          <div className="social">
            <a className="icon github" href={github} target="blank" />
            <a className="icon weibo" href={weibo} target="blank" />
          </div>

          <div className="categories">
            <div className="item">
              <Block className={TECH_COLOR} />
              <div className="category">{t('tech')}</div>
            </div>
            <div className="item">
              <Block className={MEMO_COLOR} />
              <div className="category">{t('memo')}</div>
            </div>
            <div className="item">
              <Block className={PHOTO_COLOR} />
              <div className="category">{t('photo')}</div>
            </div>
            <div className="item">
              <Block className={TALK_COLOR} />
              <div className="category">{t('talk')}</div>
            </div>
          </div>

          <NaughtyArrow />

        </div>
      </div>
    )
  }
}

export default translate()(Banner);

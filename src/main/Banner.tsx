import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { Block } from '../components';
import { Translate } from '../types';


class Banner extends React.Component<Translate, object> {
  public render() {

    // import t function for translate
    const { t } = this.props;

    const bgLightBlue = 'bg-light-blue';

    const ban = () => (
      <div className="banner">

        <div className="nav">

          <div className="index">
            <Block className={bgLightBlue} />
          </div>

          <div className="home">
            <Link to="/">...</Link>
          </div>

          <div className="blocks">
            <Block className={bgLightBlue} />
            <Block className={bgLightBlue} />
            <Block className={bgLightBlue} />
          </div>

        </div>

        <div className="main-banner">

          <div className="logo">{t('RICHARD Z')}</div>

          <div className="motto">
            <div className="motto-1st-line">{t('mottoThe1stLine')}</div>
            <div className="motto-2nd-line">{t('mottoThe2ndLine')}</div>
            <div className="motto-3rd-line">{t('mottoThe3rdLine')}</div>
          </div>

          <div className="social">
            <div className="github">github</div>
            <div className="weibo">weibo</div>
          </div>

          <div className="categories">categories</div>

        </div>

        <div className="arrow" />

      </div>
    );

    return (
      <Route path="/" exact={true} component={ban} />
    );
  }
}

export default translate()(Banner);

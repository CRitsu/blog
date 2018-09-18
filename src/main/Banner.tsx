import * as React from 'react';
import { translate } from 'react-i18next';
import { Route } from 'react-router-dom';

interface Props {
  t: (s: string) => string
}

class Banner extends React.Component<Props, object> {
  public render() {

    const { t } = this.props;

    const ban = () => (
        <div className="banner">
          <div className="nav">
            <div className="index">index</div>
            <div className="home">home</div>
            <div className="buttons">buttons</div>
          </div>
          <div className="main-banner">
            <div className="logo">{t('RICHARD Z')}</div>
            <div className="motto">
              <span className="motto-1st-line">{t('mottoThe1stLine')}</span>
              <span className="motto-2nd-line">{t('mottoThe2ndLine')}</span>
              <span className="motto-3rd-line">{t('mottoThe3rdLine')}</span>
            </div>
            <div className="social">
              <span className="github">github</span>
              <span className="weibo">weibo</span>
            </div>
            <div className="categories">categories</div>
            <div className="arrow">arrow</div>
          </div>
        </div>
    );

    return (
      <Route path="/" exact={true} component={ban} />
    );
  }
}

export default translate()(Banner);
import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { Block } from '../components';
import { Translate } from '../types';


class Banner extends React.Component<Translate, object> {
  public render() {

    // import t function for translate
    const { t } = this.props;

    const blocksBackgroundColor = 'bg-blue-light2';

    const ban = () => (
      <div className="banner">

        <div className="nav">

          <div className="index">
            <Block className={blocksBackgroundColor} />
          </div>

          <div className="home">
            <Link to="/">Richard zfanli</Link>
          </div>

          <div className="blocks">
            <Block className={blocksBackgroundColor} />
            <Block className={blocksBackgroundColor} />
            <Block className={blocksBackgroundColor} />
          </div>

        </div>

        <div className="main-banner">

          <div className="logo">{t('RICHARD Z')}</div>

          <div className="motto">
            <div className="motto-1st-line">{t('mottoThe1stLine')}</div>
            <div className="motto-2nd-line yellow-dark2">{t('mottoThe2ndLine')}</div>
            <div className="motto-3rd-line">{t('mottoThe3rdLine')}</div>
          </div>

          <div className="social">
            <a className="icon github" href="https://github.com/zfanli" target="blank" />
            <a className="icon weibo" href="https://weibo.com/210100026" target="blank" />
          </div>

          <div className="categories">
          <div className="item">
              <Block className="bg-blue-dark3" />
              <div className="category">{t('tech')}</div>
            </div>
            <div className="item">
              <Block className="bg-yellow-light2" />
              <div className="category">{t('memo')}</div>
            </div>
            <div className="item">
              <Block className="bg-red-dark1" />
              <div className="category">{t('life')}</div>
            </div>
            <div className="item">
              <Block className="bg-red-light1" />
              <div className="category">{t('talk')}</div>
            </div>
          </div>

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

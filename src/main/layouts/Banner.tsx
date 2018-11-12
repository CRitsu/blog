import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { blogName, github, weibo } from '../../config';
import { MEMO_COLOR, PHOTO_COLOR, TALK_COLOR, TECH_COLOR } from '../../constants/colors';
import { CommonType, ReduxDispatch, Translate } from '../../types';
import Block from '../accessories/Block';
import NaughtyArrow from '../accessories/NaughtyArrow';


interface State {
  home: string;
}

interface Props extends Translate, ReduxDispatch, CommonType { }


class Banner extends React.Component<Props, State> {

  public colorBox = ['#024E68', '#FFC740', '#BF4630', '#FF8973'];

  public render() {

    // import t function for translate
    const { listTopPoint, t, dispatch } = this.props;

    const scroll = () => window.scrollTo(0, listTopPoint);

    const index = Math.round(Math.random() * 4);
    const colorBox = this.colorBox;

    return (
      <div className="banner">

        <div className="main-banner">

          <div className="logo" style={{
            backgroundImage: `linear-gradient(141deg, ${colorBox[index % 4]} 0%, ${colorBox[(index + 1) % 4]} 51%, ${colorBox[(index + 2) % 4]} 75%)`
          }}><p>{blogName}</p></div>

          <div className="social">
            <a className="icon github" href={github} target="blank" />
            <a className="icon weibo" href={weibo} target="blank" />
          </div>

          <div className="categories">
            <div className="item">
              <Link to="/list/tech" onClick={scroll}><Block className={TECH_COLOR} /></Link>
              <div className="category">{t('tech')}</div>
            </div>
            <div className="item">
              <Link to="/list/memo" onClick={scroll}><Block className={MEMO_COLOR} /></Link>
              <div className="category">{t('memo')}</div>
            </div>
            <div className="item">
              <Link to="/list/photo" onClick={scroll}><Block className={PHOTO_COLOR} /></Link>
              <div className="category">{t('photo')}</div>
            </div>
            <div className="item">
              <Link to="/list/talk" onClick={scroll}><Block className={TALK_COLOR} /></Link>
              <div className="category">{t('talk')}</div>
            </div>
          </div>

          <NaughtyArrow dispatch={dispatch} />

        </div>
      </div>
    )
  }
}

export default translate()(Banner);

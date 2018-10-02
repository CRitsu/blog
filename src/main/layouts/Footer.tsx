import * as React from 'react';
import { translate } from 'react-i18next';
import { github, mail, mailBody, mailSubject, weibo } from '../../config';
import { Translate } from '../../types';


class Footer extends React.Component<Translate> {

  public render() {

    const { t } = this.props;
    const year = new Date().getFullYear();

    return (
      <div className="footer">
        <div className="ele">{`©copyright ${year}, richard zfanli`}</div>
        <a className="ele" href="https://github.com/zfanli/blog-ui">project on GitHub</a>
        <div className="ele contact">
          {t('contact me')}
          <a className="way" href={`mailto:${mail}?subject=${mailSubject}&body=${mailBody}`}>MAIL</a>
          <a className="way" href={github} target="blank">github</a>
          <a className="way" href={weibo} target="blank">weibo</a>
        </div>
      </div>
    )
  }
}

export default translate()(Footer);

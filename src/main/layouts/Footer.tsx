import * as React from 'react';
import { translate } from 'react-i18next';
import { aboutMe, github, mail, mailBody, mailSubject, name, weibo } from '../../config';
import { Translate } from '../../types';


class Footer extends React.Component<Translate> {

  public render() {

    const { t } = this.props;
    const year = new Date().getFullYear();

    return (
      <div className="footer">
        <div className="ele">
          {name}<br />
          {aboutMe}
        </div>
        <div className="ele contact">
          {t('contact me')}<br />
          <a className="way link" href={`mailto:${mail}?subject=${mailSubject}&body=${mailBody}`}>{t('mail')}</a>
          <a className="way link" href={github} target="blank">github</a>
          <a className="way link" href={weibo} target="blank">{t('weibo')}</a>
        </div>
        <a className="ele link" href="https://github.com/zfanli/blog-ui">{t('project on GitHub')}</a>
        <div className="ele">{`©copyright ${year}, ${name}.`}</div>
      </div>
    )
  }
}

export default translate()(Footer);

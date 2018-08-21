import * as React from 'react';
import { I18n } from 'react-i18next';
import { Link } from 'react-router-dom';


interface Props {
  // it this title need a link navigator
  link?: string,
  // receive JSX Element or string as children
  children?: JSX.Element | string
}

function Title(props: Props) {

  const { link, children } = props;
  let body;

  if (typeof children === 'string') {
    body = <I18n>{t => t(children)}</I18n>;
  } else if (typeof children === 'object') {
    body = children;
  } else {
    body = 'No value provided';
  }

  if (typeof link === 'string') {
    body = <Link to={link}>{body}</Link>;
  }

  return <h1>{body}</h1>

}

export default Title;

import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';


interface WithoutLinkProps {
  children: JSX.Element | string,
  t: (p: string | string[]) => string,
}

interface WithLinkProps extends WithoutLinkProps {
  link: string,
}

/**
 * Title with a router, i18n supported
 * @param props props
 */
function TitleWithLinkComponent(props: WithLinkProps) {

  const { link, children, t } = props;

  return (
    <h1>
      <Link to={link}>
        {
          typeof children === 'string'
            ? t(children) : children
        }
      </Link>
    </h1>
  )
}


/**
 * Title with i18n supported
 * @param props props
 */
function TitleWithoutLinkComponent(props: WithoutLinkProps) {

  const { children, t } = props;

  return (
    <h1>
      {
        typeof children === 'string'
          ? t(children) : children
      }
    </h1>
  )
}


export const TitleWithLink = translate()(TitleWithLinkComponent);

export const TitleWithoutLink = translate()(TitleWithoutLinkComponent);

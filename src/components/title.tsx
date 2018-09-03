import * as React from 'react';
import { Link } from 'react-router-dom';


interface WithoutLinkProps {
  children: JSX.Element | string
}

interface WithLinkProps extends WithoutLinkProps {
  link: string,
}

/**
 * Title with a router, i18n supported
 * @param props props
 */
export function TitleWithLink(props: WithLinkProps) {

  const { link, children } = props;

  return (
    <h1 className="title">
      <Link to={link}>
        {children}
      </Link>
    </h1>
  )
}


/**
 * Title with i18n supported
 * @param props props
 */
export function TitleWithoutLink(props: WithoutLinkProps) {

  const { children } = props;

  return (
    <h1 className="title">
      {children}
    </h1>
  )
}

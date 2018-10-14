import * as React from 'react';

interface Props {
  children?: string | JSX.Element | Array<string | JSX.Element>,
  className?: string,
  title?: string,
}

function Block(props: Props) {

  const { children, className, title } = props;

  const cl = className ? ['block', className].join(' ') : 'block';

  return (
    <div className={cl} title={title} >{children}</div>
  )
}

export default Block;

import * as React from 'react';

interface Props {
  children?: string | JSX.Element | Array<string | JSX.Element>,
  className?: string
}

function Block(props: Props) {

  const { children, className } = props;

  const cl = className ? ['block', className].join(' ') : 'block';

  return (
    <div className={cl}>{children}</div>
  )
}

export default Block;

import * as React from 'react';

interface Props {
  children?: string,
  className?: string
}

function Block(props: Props) {

  const { children, className } = props;

  const cl = ['block', className].join(' ');

  return (
    <div className={cl}>{children}</div>
  )
}

export default Block;

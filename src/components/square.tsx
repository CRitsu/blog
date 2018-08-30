import * as React from 'react';
import { formatNumberShorter } from '../utils'

interface Props {
  className?: string,
  symbol?: string,
  children: string | number | JSX.Element | JSX.Element[]
}

function Square(props: Props) {

  const {className, symbol, children} = props;

  return (
    <div className={ `square ${className}`}>
      {
        typeof symbol !== 'undefined'
          ? <div className="symbol">{symbol}</div>
          : ''
      }
      <div className="values">
        {
          typeof children === 'number'
            ? formatNumberShorter(children)
            : children
        }
      </div>
    </div>
  )
}

export default Square;

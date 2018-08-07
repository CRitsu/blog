import * as React from 'react';


interface Props {
  title: string | JSX.Element
}

function Title(props: Props) {
  return (
    <h1 className="title">{props.title}</h1>
  )
}

export default Title;

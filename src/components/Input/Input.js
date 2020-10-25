import React from 'react';
import classNames from 'classnames';
import './Input.scss';

export default function Input(props) {
  const { className, ...rest } = props;
  return <input className={classNames('Input', className)} {...rest} />;
}

import React from 'react';
import classNames from 'classnames';
import './Button.scss';

export default function Button(props) {
  const { text, children, className, loading = false, ...rest } = props;
  return (
    <button className={classNames('Button', className)} {...rest}>
      {text}
      {children}
      {loading && (
        <ion-icon name="sync-outline" class="Button--spin"></ion-icon>
      )}
    </button>
  );
}
